import { User, UserRole, UserStatus } from '../../domain/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(User);

    const users = [
      {
        id: 1,
        email: 'antoine.griezmann@goodfood-maalsi.com',
        password: 'Antoine123!',
        status: UserStatus.Active,
        first_name: 'Antoine',
        last_name: 'Griezmann',
        role: UserRole.Deliverer,
        street_number: '12',
        street: 'Rue Faidherbe',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6371,
        long: 3.0633,
      },
      {
        id: 2,
        email: 'paul.pogba@goodfood-maalsi.com',
        password: 'Paul123!',
        status: UserStatus.Active,
        first_name: 'Paul',
        last_name: 'Pogba',
        role: UserRole.Deliverer,
        street_number: null,
        street: null,
        city: null,
        postal_code: null,
        country: null,
        lat: 0,
        long: 0,
      },
      {
        id: 3,
        email: 'kylian.mbappe@goodfood-maalsi.com',
        password: 'Kylian123!',
        status: UserStatus.Active,
        first_name: 'Kylian',
        last_name: 'Mbappé',
        role: UserRole.Deliverer,
        street_number: '8',
        street: 'Rue de la Clef',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6357,
        long: 3.0601,
      },
      {
        id: 4,
        email: 'ngolo.kante@goodfood-maalsi.com',
        password: 'Ngolo123!',
        status: UserStatus.Active,
        first_name: 'N\'Golo',
        last_name: 'Kanté',
        role: UserRole.Deliverer,
        street_number: '22',
        street: 'Boulevard Vauban',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6114,
        long: 3.0489,
      },
      {
        id: 5,
        email: 'olivier.giroud@goodfood-maalsi.com',
        password: 'Olivier123!',
        status: UserStatus.Active,
        first_name: 'Olivier',
        last_name: 'Giroud',
        role: UserRole.Deliverer,
        street_number: '17',
        street: 'Rue Nationale',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6365,
        long: 3.0578,
      },
      {
        id: 6,
        email: 'hugo.lloris@goodfood-maalsi.com',
        password: 'Hugo123!',
        status: UserStatus.Active,
        first_name: 'Hugo',
        last_name: 'Lloris',
        role: UserRole.Deliverer,
        street_number: '33',
        street: 'Rue du Molinel',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6338,
        long: 3.0654,
      },
      {
        id: 7,
        email: 'raphael.varane@goodfood-maalsi.com',
        password: 'Raphael123!',
        status: UserStatus.Active,
        first_name: 'Raphaël',
        last_name: 'Varane',
        role: UserRole.Deliverer,
        street_number: '5',
        street: 'Place Rihour',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6351,
        long: 3.0627,
      },
      {
        id: 8,
        email: 'ousmane.dembele@goodfood-maalsi.com',
        password: 'Ousmane123!',
        status: UserStatus.Active,
        first_name: 'Ousmane',
        last_name: 'Dembélé',
        role: UserRole.Deliverer,
        street_number: '28',
        street: 'Rue Esquermoise',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6382,
        long: 3.0589,
      },
      {
        id: 9,
        email: 'benjamin.pavard@goodfood-maalsi.com',
        password: 'Benjamin123!',
        status: UserStatus.Active,
        first_name: 'Benjamin',
        last_name: 'Pavard',
        role: UserRole.Deliverer,
        street_number: '10',
        street: 'Rue de Gand',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6413,
        long: 3.0675,
      },
      {
        id: 10,
        email: 'theo.hernandez@goodfood-maalsi.com',
        password: 'Theo123!',
        status: UserStatus.Active,
        first_name: 'Theo',
        last_name: 'Hernandez',
        role: UserRole.Deliverer,
        street_number: '19',
        street: 'Rue Solférino',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6254,
        long: 3.0612,
      },
    ];

    for (const userData of users) {
      const user = new User();
      user.id = userData.id;
      user.email = userData.email;
      user.password = userData.password;
      user.status = userData.status;
      user.first_name = userData.first_name;
      user.last_name = userData.last_name;
      user.role = userData.role;

      await repo.save(user, { data: { id: userData.id } });
    }

    console.log('All users inserted or updated successfully!');
  }
}