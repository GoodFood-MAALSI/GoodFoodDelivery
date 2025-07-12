import 'dotenv/config';
import { runSeeders } from 'typeorm-extension';
import AppDataSource from './data-source';
import { UserSeeder } from './seeders/users.seeder';

async function seed() {
  try {
    await AppDataSource.initialize();
    await runSeeders(AppDataSource, {
      seeds: [
        UserSeeder,
      ],
    });
    await AppDataSource.destroy();
  } catch (err) {
    process.exit(1);
  }
}

seed();