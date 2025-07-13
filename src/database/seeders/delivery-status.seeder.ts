import { DeliveryStatus } from 'src/domain/delivery-status/entities/delivery-status.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class DeliveryStatusSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(DeliveryStatus);

    const status = [
      { id: 1, name: 'En cours de livraison' },
      { id: 2, name: 'Livré' },
      { id: 3, name: 'Annulée' },
    ];

    for (const statusData of status) {
      const deliveryStatus = new DeliveryStatus();
      deliveryStatus.id = statusData.id;
      deliveryStatus.name = statusData.name;

      await repo.save(deliveryStatus, { data: { id: statusData.id } });
    }

    console.log('All delivery status inserted or updated successfully!');
  }
}
