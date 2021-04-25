import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CustomerBasket from './models/customer-basket.model';

@Controller('api/v1/basket')
@ApiTags('basket')
export class BasketController {
  constructor(private readonly service: BasketService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Basket by Customer ID' })
  @ApiResponse({
    status: 200,
    description: 'Get Basket by Customer ID',
    type: CustomerBasket,
  })
  async getBasketByIdAsync(@Param('id') id: string): Promise<CustomerBasket> {
    return await this.service.getBasketByIdAsync(id);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create/Update Basket' })
  @ApiResponse({
    status: 200,
    description: 'Create Or Update Basket',
    type: CustomerBasket,
  })
  async updateBasketAsync(
    @Body() value: CustomerBasket,
  ): Promise<CustomerBasket> {
    return await this.service.updateBasketAsync(value);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete Basket' })
  @ApiResponse({
    status: 204,
    description: 'Delete Basket',
  })
  async deleteBasketByIdAsync(@Param('id') id: string): Promise<void> {
    return await this.service.deleteBasketByIdAsync(id);
  }
}
