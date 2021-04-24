import { Module, CacheModule } from '@nestjs/common';
import { BasketService } from './basket.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BasketController } from './basket.controller';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [  CacheModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      store: redisStore,
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      ttl: configService.get('CACHE_TTL'),
    }),
  }),],
  providers: [BasketService],
  controllers: [BasketController]
})
export class BasketModule {}
