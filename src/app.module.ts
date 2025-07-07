import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './domain/users/users.module';
import { DeliveriesModule } from './domain/deliveries/deliveries.module';
import { DeliveryStatusModule } from './domain/delivery-status/delivery-status.module';
import { TransportModesModule } from './domain/transport-modes/transport-modes.module';
import { UserAddressesModule } from './domain/user-addresses/user-addresses.module';
import { ConfigModule } from '@nestjs/config';
import { TrackingModule } from './domain/tracking/tracking.module';
import { AuthModule } from './domain/auth/auth.module';
import { SessionModule } from './domain/session/session.module';
import { MailerModule } from './domain/mailer/mailer.module';
import { MailsModule } from './domain/mails/mails.module';
import { ForgotPasswordModule } from './domain/forgot-password/forgot-password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    SessionModule,
    MailerModule,
    MailsModule,
    ForgotPasswordModule,
    UsersModule,
    DeliveriesModule,
    DeliveryStatusModule,
    TransportModesModule,
    UserAddressesModule,
    TrackingModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {dbName: process.env.MONGODB_DATABASE,}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
