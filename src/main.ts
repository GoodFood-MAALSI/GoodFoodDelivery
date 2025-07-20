import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { UserSeeder } from './database/seeders/users.seeder';
import { DataSource } from 'typeorm';
import { useContainer } from 'class-validator';
import { runSeeders } from 'typeorm-extension';
import { join } from 'path';
import * as fs from 'fs/promises';
import { ResponseInterceptor } from './domain/utils/interceptors/response.interceptor';
import { AllExceptionsFilter } from './domain/utils/filters/http-exception.filter';
import { TransportModesSeeder } from './database/seeders/transport-modes.seeder';
import { DeliveryStatusSeeder } from './database/seeders/delivery-status.seeder';
import { DeliveriesSeeder } from './database/seeders/deliveries.seeder';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      forbidNonWhitelisted: true,
    }),
  );

  // Format des réponses/exceptions
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription("Documentation de l'API Livreur NestJS avec Swagger")
    .setVersion('1.0')
    .addServer(process.env.BACKEND_DOMAIN, 'Local dev')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Exécuter les seeders en environnement de développement si nécessaire
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.RUN_SEEDERS === 'true'
  ) {
    const seedFilePath = join(__dirname, '.seeded');
    let hasBeenSeeded = false;

    // Vérifier si le fichier .seeded existe
    try {
      await fs.access(seedFilePath);
      hasBeenSeeded = true;
      console.log('Seeders already executed, skipping...');
    } catch {
      // Le fichier n'existe pas, les seeders n'ont pas encore été exécutés
      hasBeenSeeded = false;
    }

    if (!hasBeenSeeded) {
      console.log('Running database seeders for client API...');
      const dataSource = app.get(DataSource);
      try {
        await runSeeders(dataSource, {
          seeds: [UserSeeder, TransportModesSeeder, DeliveryStatusSeeder, DeliveriesSeeder],
        });
        console.log('Seeders executed successfully for client API.');

        // Créer le fichier .seeded pour marquer l'exécution
        await fs.writeFile(
          seedFilePath,
          'Seeded on ' + new Date().toISOString(),
        );
      } catch (error) {
        console.error('Error running seeders for client API:', error);
        throw error;
      }
    }
  }

  await app.listen(process.env.APP_PORT);
}
bootstrap();
