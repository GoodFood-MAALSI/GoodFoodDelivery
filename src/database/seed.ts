import 'dotenv/config';
import { runSeeders } from 'typeorm-extension';
import AppDataSource from './data-source';
import { UserSeeder } from './seeders/users.seeder';
import { TransportModesSeeder } from './seeders/transport-modes.seeder';
import { DeliveryStatusSeeder } from './seeders/delivery-status.seeder';
import { DeliveriesSeeder } from './seeders/deliveries.seeder';

async function seed() {
  try {
    await AppDataSource.initialize();
    await runSeeders(AppDataSource, {
      seeds: [UserSeeder, TransportModesSeeder, DeliveryStatusSeeder, DeliveriesSeeder],
    });
    await AppDataSource.destroy();
  } catch (err) {
    process.exit(1);
  }
}

seed();
