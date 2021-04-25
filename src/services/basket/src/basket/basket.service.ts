import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import CustomerBasket from './models/customer-basket.model';

@Injectable()
export class BasketService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async deleteBasketByIdAsync(id: string): Promise<void> {
    await this.cacheManager.del(id);
  }
  async updateBasketAsync(value: CustomerBasket): Promise<CustomerBasket> {
    await this.cacheManager.set(value.buyerId, value);
    return value;
  }
  async getBasketByIdAsync(id: string): Promise<CustomerBasket> {
    return await this.cacheManager.get<CustomerBasket>(id);
  }
}
