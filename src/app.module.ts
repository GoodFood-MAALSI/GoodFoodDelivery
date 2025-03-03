import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './domain/users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { DeliveriesModule } from './domain/deliveries/deliveries.module';
import { DeliveryStatusModule } from './domain/delivery-status/delivery-status.module';
import { TransportModesModule } from './domain/transport-modes/transport-modes.module';
import { UserAddressesModule } from './domain/user-addresses/user-addresses.module';


@Module({
  imports: [DatabaseModule,UsersModule,DeliveriesModule,DeliveryStatusModule,TransportModesModule,UserAddressesModule],
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
