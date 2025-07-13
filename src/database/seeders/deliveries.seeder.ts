import { Delivery } from 'src/domain/deliveries/entities/delivery.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class DeliveriesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Delivery);

    const deliveries = [
      {
        id: 1,
        order_id: 2,
        user_id: 1,
        transport_mode_id: 2, // À vélo
        delivery_status_id: 1, // En cours de livraison
        start_time: new Date('2025-06-01T10:00:00Z'),
        end_time: new Date('2025-06-01T10:30:00Z'),
        verification_code: '12345',
      },
      {
        id: 2,
        order_id: 3,
        user_id: 4,
        transport_mode_id: 3, // À scooter/moto
        delivery_status_id: 1, // En cours de livraison
        start_time: new Date('2025-06-01T11:00:00Z'),
        end_time: new Date('2025-06-01T11:40:00Z'),
        verification_code: '67890',
      },
      {
        id: 3,
        order_id: 4,
        user_id: 7,
        transport_mode_id: 4, // En voiture
        delivery_status_id: 2, // Livré
        start_time: new Date('2025-06-01T12:00:00Z'),
        end_time: new Date('2025-06-01T12:45:00Z'),
        verification_code: '54321',
      },
      {
        id: 4,
        order_id: 7,
        user_id: 5,
        transport_mode_id: 2, // À vélo
        delivery_status_id: 1, // En cours de livraison
        start_time: new Date('2025-06-01T13:00:00Z'),
        end_time: new Date('2025-06-01T13:35:00Z'),
        verification_code: '98765',
      },
      {
        id: 5,
        order_id: 8,
        user_id: 2,
        transport_mode_id: 1, // À pied
        delivery_status_id: 1, // En cours de livraison
        start_time: new Date('2025-06-01T14:00:00Z'),
        end_time: new Date('2025-06-01T14:25:00Z'),
        verification_code: '13579',
      },
      {
        id: 6,
        order_id: 9,
        user_id: 8,
        transport_mode_id: 3, // À scooter/moto
        delivery_status_id: 2, // Livré
        start_time: new Date('2025-06-01T15:00:00Z'),
        end_time: new Date('2025-06-01T15:50:00Z'),
        verification_code: '24680',
      },
      {
        id: 7,
        order_id: 12,
        user_id: 6,
        transport_mode_id: 4, // En voiture
        delivery_status_id: 1, // En cours de livraison
        start_time: new Date('2025-06-01T16:00:00Z'),
        end_time: new Date('2025-06-01T16:40:00Z'),
        verification_code: '11223',
      },
      {
        id: 8,
        order_id: 13,
        user_id: 3,
        transport_mode_id: 2, // À vélo
        delivery_status_id: 1, // En cours de livraison
        start_time: new Date('2025-06-01T17:00:00Z'),
        end_time: new Date('2025-06-01T17:30:00Z'),
        verification_code: '33445',
      },
      {
        id: 9,
        order_id: 14,
        user_id: 9,
        transport_mode_id: 3, // À scooter/moto
        delivery_status_id: 2, // Livré
        start_time: new Date('2025-06-01T18:00:00Z'),
        end_time: new Date('2025-06-01T18:45:00Z'),
        verification_code: '55667',
      },
    ];

    for (const deliveryData of deliveries) {
      const delivery = new Delivery();

      delivery.id = deliveryData.id;
      delivery.order_id = deliveryData.order_id;
      delivery.user_id = deliveryData.user_id;
      delivery.transport_mode_id = deliveryData.transport_mode_id;
      delivery.delivery_status_id = deliveryData.delivery_status_id;
      delivery.start_time = deliveryData.start_time;
      delivery.end_time = deliveryData.end_time;
      delivery.verification_code = deliveryData.verification_code;

      await repo.save(delivery, { data: { id: deliveryData.id } });
    }

    console.log('All deliveries inserted successfully!');
  }
}
