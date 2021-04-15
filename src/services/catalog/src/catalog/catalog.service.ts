import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CatalogItem from './models/catalog-item.model';
import { CatalogItemType } from './fixed/catalog-type.enum';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(CatalogItem.name)
    private catalogRepository: Model<CatalogItem>,
  ) {}

  async remove(id: string): Promise<void> {
    await this.catalogRepository.remove(id);
  }

  async update(item: CatalogItem): Promise<CatalogItem> {
    await this.catalogRepository.updateOne((x) => x._id == item._id, item);
    return item;
  }

  async add(item: CatalogItem): Promise<CatalogItem> {
    await this.catalogRepository.create(item);
    return item;
  }

  findBrands(): CatalogItemType[] {
    return Object.values(CatalogItemType);
  }

  async findById(id: string): Promise<CatalogItem> {
    return await this.catalogRepository.findById(id);
  }

  async findAll(): Promise<CatalogItem[]> {
    return await this.catalogRepository.find(
      {},
      { type: 1, brandName: 1, name: 1 },
    );
  }
}
