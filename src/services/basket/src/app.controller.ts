import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import CustomerBasket from './models/customer-basket.model';
@Controller('api/v1/basket')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Basket by Customer ID' })
  @ApiResponse({
    status: 200,
    description: 'Get Basket by Customer ID',
    type: CustomerBasket,
  })
  async getBasketByIdAsync(@Param('id') id: string): Promise<CustomerBasket> {
    return await this.appService.getBasketByIdAsync(id);
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
    return await this.appService.updateBasketAsync(value);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete Basket' })
  @ApiResponse({
    status: 204,
    description: 'Delete Basket',
  })
  async deleteBasketByIdAsync(@Param('id') id: string): Promise<void> {
    return await this.appService.deleteBasketByIdAsync(id);
  }
}
