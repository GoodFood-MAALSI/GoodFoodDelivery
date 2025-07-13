import { UserAddress } from 'src/domain/user-addresses/entities/user-address.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class UserAddressSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UserAddress);

    const addresses = [
      // Utilisateur 1
      {
        id: 1,
        name: 'Travail',
        street_number: '25',
        street: 'Rue de Paris',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6345,
        long: 3.0642,
        userId: 1,
      },
      {
        id: 2,
        name: 'Bureau',
        street_number: '10',
        street: 'Rue des Ponts de Comines',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6395,
        long: 3.0681,
        userId: 1,
      },
      // Utilisateur 2
      {
        id: 3,
        name: 'Travail',
        street_number: '30',
        street: 'Rue du Palais Rihour',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6350,
        long: 3.0620,
        userId: 2,
      },
      {
        id: 4,
        name: 'Secondaire',
        street_number: '15',
        street: 'Rue de la Barre',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6387,
        long: 3.0598,
        userId: 2,
      },
      // Utilisateur 3
      {
        id: 5,
        name: 'Travail',
        street_number: '14',
        street: 'Rue des Arts',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6398,
        long: 3.0648,
        userId: 3,
      },
      {
        id: 6,
        name: 'Bureau',
        street_number: '5',
        street: 'Rue de la Monnaie',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6401,
        long: 3.0612,
        userId: 3,
      },
      // Utilisateur 4
      {
        id: 7,
        name: 'Travail',
        street_number: '9',
        street: 'Rue Pierre Mauroy',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6362,
        long: 3.0671,
        userId: 4,
      },
      {
        id: 8,
        name: 'Secondaire',
        street_number: '20',
        street: 'Rue de Weppes',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6275,
        long: 3.0502,
        userId: 4,
      },
      // Utilisateur 5
      {
        id: 9,
        name: 'Travail',
        street_number: '50',
        street: 'Rue de la Grande Chaussée',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6389,
        long: 3.0605,
        userId: 5,
      },
      {
        id: 10,
        name: 'Bureau',
        street_number: '12',
        street: 'Rue de l\'Hôpital Militaire',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6332,
        long: 3.0587,
        userId: 5,
      },
      // Utilisateur 6
      {
        id: 11,
        name: 'Travail',
        street_number: '7',
        street: 'Rue de la Bourse',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6378,
        long: 3.0619,
        userId: 6,
      },
      {
        id: 12,
        name: 'Secondaire',
        street_number: '35',
        street: 'Rue de Tournai',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6325,
        long: 3.0694,
        userId: 6,
      },
      // Utilisateur 7
      {
        id: 13,
        name: 'Travail',
        street_number: '18',
        street: 'Rue de Roubaix',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6392,
        long: 3.0701,
        userId: 7,
      },
      {
        id: 14,
        name: 'Bureau',
        street_number: '22',
        street: 'Rue de la Halle',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6380,
        long: 3.0628,
        userId: 7,
      },
      // Utilisateur 8
      {
        id: 15,
        name: 'Travail',
        street_number: '3',
        street: 'Place du Théâtre',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6374,
        long: 3.0637,
        userId: 8,
      },
      {
        id: 16,
        name: 'Secondaire',
        street_number: '28',
        street: 'Rue de la Vignette',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6298,
        long: 3.0523,
        userId: 8,
      },
      // Utilisateur 9
      {
        id: 17,
        name: 'Travail',
        street_number: '42',
        street: 'Rue Jean Moulin',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6268,
        long: 3.0547,
        userId: 9,
      },
      {
        id: 18,
        name: 'Bureau',
        street_number: '16',
        street: 'Rue Doudin',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6403,
        long: 3.0657,
        userId: 9,
      },
      // Utilisateur 10
      {
        id: 19,
        name: 'Travail',
        street_number: '21',
        street: 'Rue Léon Trulin',
        city: 'Lille',
        postal_code: '59000',
        country: 'France',
        lat: 50.6348,
        long: 3.0663,
        userId: 10,
      },
      {
        id: 20,
        name: 'Secondaire',
        street_number: '8',
        street: 'Rue de la Pléiade',
        city: 'Lille',
        postal_code: '59800',
        country: 'France',
        lat: 50.6259,
        long: 3.0608,
        userId: 10,
      },
    ];

    for (const addressData of addresses) {
      const address = new UserAddress();
      address.id = addressData.id;
      address.name = addressData.name;
      address.street_number = addressData.street_number;
      address.street = addressData.street;
      address.city = addressData.city;
      address.postal_code = addressData.postal_code;
      address.country = addressData.country;
      address.lat = addressData.lat;
      address.long = addressData.long;
      address.userId = addressData.userId;

      await repo.save(address, { data: { id: addressData.id } });
    }

    console.log('All user addresses inserted or updated successfully!');
  }
}