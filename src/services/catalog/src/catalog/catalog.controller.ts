import {
  Body,
  CacheInterceptor,
  CacheKey,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import CatalogItemDto from './dtos/catalog-item.dto';
import CatalogItem from './models/catalog-item.model';

@Controller('/api/v1/catalog')
export class CatalogController {
  constructor(private readonly service: CatalogService) {}

  @Get('items')
  @ApiOperation({ summary: 'Get Catalog items' })
  @ApiResponse({
    status: 200,
    description: 'Get Catalog items',
  })
  @UseInterceptors(CacheInterceptor)
  @CacheKey('catalog_items')
  async get(): Promise<CatalogItem[]> {
    return await this.service.findAll();
  }

  @Get('items/:id')
  @ApiOperation({ summary: 'Get Catalog item by id' })
  @ApiResponse({
    status: 200,
    description: 'Get Catalog item by id',
  })
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<CatalogItem> {
    return await this.service.findById(id);
  }

  @Get('brands')
  @ApiOperation({ summary: 'Get brands' })
  @ApiResponse({
    status: 200,
    description: 'Get brands',
  })
  @UseInterceptors(CacheInterceptor)
  @CacheKey('catalog_item')
  getBrands(): string[] {
    return this.service.findBrands();
  }

  @Post('items')
  @ApiOperation({ summary: 'Create catalog item' })
  @ApiResponse({
    status: 201,
    description: 'Create catalog item',
  })
  async post(@Body() catalogItemDto: CatalogItemDto): Promise<CatalogItem> {
    return await this.service.add({ ...catalogItemDto } as CatalogItem);
  }

  @Put('items/:id')
  @ApiOperation({ summary: 'Update catalog item' })
  @ApiResponse({
    status: 200,
    description: 'Update catalog item',
  })
  async put(
    @Param('id') id: string,
    @Body() catalogItemDto: CatalogItemDto,
  ): Promise<CatalogItem> {
    const catalogItem = { ...catalogItemDto } as CatalogItem;
    catalogItem.id = id;
    return await this.service.update(catalogItem);
  }

  @Delete('items/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete catalog item' })
  @ApiResponse({
    status: 204,
    description: 'Delete catalog item',
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.remove(id);
  }
}
