import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Order } from './interfaces/order.interface';

@Injectable()
export class InterserviceService {
  constructor(private readonly httpService: HttpService) {}

  private readonly orderServiceUrl = process.env.ORDER_SERVICE_URL;
  private readonly orderJwtSecret = process.env.ORDER_SECRET;
  private readonly jwtExpiresIn = '1h';

  private generateJwtTokenForOrder(): string {
    return jwt.sign(
      { role: 'interservice', service: 'order' },
      this.orderJwtSecret,
      {
        expiresIn: this.jwtExpiresIn,
      },
    );
  }

  async fetchOrder(orderId: number): Promise<Order | null> {
    try {
      const route = `orders/interservice/${orderId}`;
      const token = this.generateJwtTokenForOrder();
      console.log(`Fetching order ${orderId} with token: ${token}`);
      const response = await firstValueFrom(
        this.httpService.get(`${this.orderServiceUrl}/${route}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      console.log(`Order ${orderId} fetched successfully:`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du order ${orderId}:`,
        error.response?.status,
        error.response?.data,
        error.message,
      );
      return null;
    }
  }

    async fetchLivreurRevenue(livreurId: number): Promise<number> {
    try {
      if (!this.orderServiceUrl) {
        throw new Error('DELIVERY_SERVICE_URL environment variable is not set.');
      }
      const route = `deliveries/${livreurId}/revenue`; // Route vers le service de livraison
      const token = this.generateJwtTokenForOrder(); // Génère un token pour le service de livraison
      console.log(`[InterserviceService] Fetching revenue for livreur ${livreurId} from ${this.orderServiceUrl}/${route}`);
      const response = await firstValueFrom(
        this.httpService.get(`${this.orderServiceUrl}/${route}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      console.log(`[InterserviceService] Revenue for livreur ${livreurId} fetched successfully:`, response.data);
      // Le service de livraison renvoie un objet { livreurId: number; totalRevenue: number }
      return response.data.totalRevenue;
    } catch (error) {
      console.error(
        `[InterserviceService] Erreur lors de la récupération des revenus du livreur ${livreurId}:`,
        error.response?.status,
        error.response?.data,
        error.message,
      );
      // Relancez une exception pour que le contrôleur puisse la gérer
      throw new HttpException(
        `Échec de la récupération des revenus du livreur: ${error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}