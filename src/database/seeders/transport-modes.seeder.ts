import { TransportMode } from 'src/domain/transport-modes/entities/transport-mode.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class TransportModesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(TransportMode);

    const transportModes = [
      { id: 1, name: 'À pied' },
      { id: 2, name: 'À vélo' },
      { id: 3, name: 'À scooter / moto' },
      { id: 4, name: 'En voiture' },
      { id: 5, name: 'Autre' },
    ];

    for (const transportModeData of transportModes) {
      const transportMode = new TransportMode();
      transportMode.id = transportModeData.id;
      transportMode.name = transportModeData.name;

      await repo.save(transportMode, { data: { id: transportModeData.id } });
    }

    console.log('All transport modes inserted or updated successfully!');
  }
}
