import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

// Interface pour une commande (simplifiée)
interface Order {
  id: string;
  price: number;
  // ... autres champs pertinents ...
}

@Injectable()
export class OrdersService {
  private readonly orderApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.orderApiUrl = this.configService.get<string>('ORDER_SERVICE_URL');
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Order>(`${this.orderApiUrl}/orders/${orderId}`),
      );
      return data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error.message);
      return null;
    }
  }

  // Si le service 'order' propose cet endpoint
  async getOrdersByLivreurId(livreurId: string): Promise<Order[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Order[]>(`${this.orderApiUrl}/orders?livreurId=${livreurId}`),
      );
      return data;
    } catch (error) {
      console.error(`Error fetching orders for livreur ${livreurId}:`, error.message);
      return [];
    }
  }
}