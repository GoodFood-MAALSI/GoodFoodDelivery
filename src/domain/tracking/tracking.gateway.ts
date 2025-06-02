import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TrackingService } from './tracking.service';
import { UsersService } from '../users/users.service';

interface LivreurState {
    latitude: number;
    longitude: number;
    targetLatitude: number;
    targetLongitude: number;
    speed_kmh: number;
}

@WebSocketGateway({ cors: true })
export class TrackingGateway {
    @WebSocketServer()
    server: Server;

    private livreurStates: Record<string, LivreurState> = {};

    constructor(
        private readonly trackingService: TrackingService,
        private readonly usersService: UsersService
    ) {
        this.startSimulation();
    }

    async startSimulation() {
        const livreurs = await this.usersService.findAll();
        for (const livreur of livreurs) {
            this.livreurStates[livreur.id.toString()] = {
                latitude: 50.6365,
                longitude: 3.0635,
                targetLatitude: 50.6400,
                targetLongitude: 3.0700,
                speed_kmh: this.randomSpeed(),
            };
        }

        setInterval(async () => {
            for (const livreur of livreurs) {
                const livreurId = livreur.id;
                const newPosition = this.moveTowardsTarget(livreurId);

                await this.trackingService.createTracking(
                    livreur.name,
                    livreurId,
                    newPosition.latitude,
                    newPosition.longitude,
                    newPosition.speed_kmh
                );

                this.server.emit('positionUpdate', {
                    livreur_name: livreur.name,
                    livreur_id: livreurId,
                    latitude: newPosition.latitude,
                    longitude: newPosition.longitude,
                    speed_kmh: newPosition.speed_kmh,
                });

                console.log(`📍 Mise à jour du livreur ${livreur.name} (${livreurId})`);
            }
        }, 1000);
    }
    moveTowardsTarget(livreurId: number) {
        const livreur = this.livreurStates[livreurId];

        if (!livreur) return { latitude: 50.6365, longitude: 3.0635, speed_kmh: 20 };

        const { latitude, longitude, targetLatitude, targetLongitude, speed_kmh } = livreur;
        const speed_mps = speed_kmh / 3.6;
        const step = 0.0001 * speed_mps;

        const newLat =
            latitude + Math.sign(targetLatitude - latitude) * Math.min(step, Math.abs(targetLatitude - latitude));
        const newLng =
            longitude + Math.sign(targetLongitude - longitude) * Math.min(step, Math.abs(targetLongitude - longitude));
        if (Math.abs(targetLatitude - newLat) < 0.0001 && Math.abs(targetLongitude - newLng) < 0.0001) {
            this.setNewTarget(livreurId);
        }
        this.livreurStates[livreurId] = {
            ...livreur,
            latitude: newLat,
            longitude: newLng,
        };

        return { latitude: newLat, longitude: newLng, speed_kmh };
    }
    setNewTarget(livreurId: number) {
        const baseLat = 50.6365;
        const baseLng = 3.0635;
        this.livreurStates[livreurId].targetLatitude = baseLat + (Math.random() - 0.5) * 0.02;
        this.livreurStates[livreurId].targetLongitude = baseLng + (Math.random() - 0.5) * 0.02;
        this.livreurStates[livreurId].speed_kmh = this.randomSpeed();
        console.log(`🎯 Nouveau point cible défini pour ${livreurId}`);
    }
    randomSpeed() {
        return Math.random() * (30 - 10) + 10;
    }
}
