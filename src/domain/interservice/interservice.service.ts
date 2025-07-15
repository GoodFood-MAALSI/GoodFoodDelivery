import { Injectable } from '@nestjs/common';
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
}