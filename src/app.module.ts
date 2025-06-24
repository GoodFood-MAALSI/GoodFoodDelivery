import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './domain/users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { DeliveriesModule } from './domain/deliveries/deliveries.module';
import { DeliveryStatusModule } from './domain/delivery-status/delivery-status.module';
import { TransportModesModule } from './domain/transport-modes/transport-modes.module';
import { UserAddressesModule } from './domain/user-addresses/user-addresses.module';
import { ConfigModule } from '@nestjs/config';
import { TrackingModule } from './domain/tracking/tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    DeliveriesModule,
    DeliveryStatusModule,
    TransportModesModule,
    UserAddressesModule,
    TrackingModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {dbName: process.env.MONGODB_DATABASE,}),
  ],
  controllers: [AppController],
  providers: [
    AppService, // Keep your existing AppService
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
