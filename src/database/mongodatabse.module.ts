import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const host = config.get<string>('MONGODB_HOST');
        const port = parseInt(config.get<string>('MONGODB_PORT', '27017'), 10);
        const username = config.get<string>('MONGODB_USERNAME');
        const password = config.get<string>('MONGODB_PASSWORD');
        const database = config.get<string>('MONGODB_DATABASE');
        const authSource = config.get<string>('MONGODB_AUTH_SOURCE', 'admin'); 

        let uri = `mongodb://`;

        if (username && password) {
          uri += `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`;
        }

        uri += `${host}:${port}/${database}`;

        if (authSource) {
          uri += `?authSource=${authSource}`;
        }

        console.log(`[MongooseModule] Attempting to connect to MongoDB at: ${uri}`); 

        return {
          uri: uri,
        };
      },
    }),
  ],
  exports: [MongooseModule], 
})
export class MongooseDatabaseModule {}