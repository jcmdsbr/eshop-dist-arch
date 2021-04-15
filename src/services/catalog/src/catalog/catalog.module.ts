import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
