import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TrackingService } from './tracking.service';
import { UsersService } from '../users/users.service';
import { Logger, OnModuleInit } from '@nestjs/common';
import { UpdateTrackingLocationDto } from './dto/update-tracking.dto';

export class TrackingGateway implements OnModuleInit {
  @WebSocketServer() server: Server; // Instance du serveur Socket.IO

  private readonly logger = new Logger(TrackingGateway.name);

  onModuleInit() {
    this.logger.log('Location Gateway initialisée');
    // Vous pouvez attacher des événements ici, ex:
    this.server.on('connection', (socket) => {
      this.logger.log(`Client connecté: ${socket.id}`);
      // Vous pourriez authentifier l'utilisateur ici
    });
  }

  @SubscribeMessage('updateLocation') // Écoute l'événement 'updateLocation' du client
  handleLocationUpdate(
    @MessageBody() data: UpdateTrackingLocationDto,
    @ConnectedSocket() client: Socket, // Accès à l'objet socket du client
  ): { status: string; data: UpdateTrackingLocationDto } {

    // Ici, vous traitriez la localisation en temps réel :
    // 1. Sauvegarder dans une base de données (MongoDB, Redis, PostgreSQL)
    // 2. Mettre à jour une carte en temps réel pour d'autres utilisateurs
    // 3. Effectuer des calculs (distance, ETA)
    // 4. Émettre l'information à d'autres clients (par exemple, à un administrateur qui suit les livreurs)

    // Exemple: Enregistrement dans une base de données (implémentation du service à prévoir)
    // this.locationService.saveLocation(data);

    // Exemple: Émettre la nouvelle localisation à tous les autres clients ou à un groupe spécifique
    // this.server.emit('newLocationUpdate', data); // Émet à tous les clients connectés
    // Ou pour un groupe/salle spécifique:
    // client.broadcast.emit('newLocationUpdate', data); // Émet à tous sauf l'expéditeur

    // Confirmer la réception au client
    client.emit('locationConfirmed', { received: true, timestamp: new Date().toISOString() });

    return { status: 'success', data }; // Réponse ACK (acknowledgement) au client
  }

  // Vous pouvez ajouter d'autres événements si nécessaire
  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client déconnecté: ${client.id}`);
    // Gérer la déconnexion, par exemple supprimer la dernière position connue ou marquer comme hors ligne
  }
}