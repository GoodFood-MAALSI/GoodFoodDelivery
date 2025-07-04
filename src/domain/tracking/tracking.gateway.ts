// import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { TrackingService } from './tracking.service';
// import { UsersService } from '../users/users.service';
// import { Logger, OnModuleInit } from '@nestjs/common';
// import { UpdateTrackingLocationDto } from './dto/update-tracking.dto';

// export class TrackingGateway implements OnModuleInit {
//   @WebSocketServer() server: Server; // Instance du serveur Socket.IO

//   private readonly logger = new Logger(TrackingGateway.name);

//   onModuleInit() {
//     this.logger.log('Location Gateway initialisée');
//     // Vous pouvez attacher des événements ici, ex:
//     this.server.on('connection', (socket) => {
//       this.logger.log(`Client connecté: ${socket.id}`);
//       // Vous pourriez authentifier l'utilisateur ici
//     });
//   }

//   @SubscribeMessage('updateLocation') // Écoute l'événement 'updateLocation' du client
//   handleLocationUpdate(
//     @MessageBody() data: UpdateTrackingLocationDto,
//     @ConnectedSocket() client: Socket, // Accès à l'objet socket du client
//   ): { status: string; data: UpdateTrackingLocationDto } {
//     client.emit('locationConfirmed', { received: true, timestamp: new Date().toISOString() });

//     return { status: 'success', data }; // Réponse ACK (acknowledgement) au client
//   }

//   // Vous pouvez ajouter d'autres événements si nécessaire
//   @SubscribeMessage('disconnect')
//   handleDisconnect(@ConnectedSocket() client: Socket) {
//     this.logger.log(`Client déconnecté: ${client.id}`);
//     // Gérer la déconnexion, par exemple supprimer la dernière position connue ou marquer comme hors ligne
//   }
// }