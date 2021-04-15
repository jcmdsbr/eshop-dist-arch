import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';

import CatalogItem from './models/catalog-item.model';
import { CatalogItemSchema } from './models/catalog-item.model';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CatalogItem.name,
        schema: CatalogItemSchema,
      },
    ]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('CACHE_TTL'),
      }),
    }),
  ],
  providers: [
    CatalogService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  controllers: [CatalogController],
})
export class CatalogModule {}
