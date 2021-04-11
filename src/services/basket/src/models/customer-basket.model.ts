import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import BasketItem from './basket-item.model';

class CustomerBasket {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public buyerId: string;

  @ApiProperty({
    isArray: true,
    type: BasketItem,
  })
  @ValidateNested({ each: true, always: true })
  public items: BasketItem[];
}

export default CustomerBasket;
