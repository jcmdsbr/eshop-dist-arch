import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

class BasketItem {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  public id: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  public productId: number;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  public productName: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  public unitPrice: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  public quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  public pictureUrl: string;
}

export default BasketItem;
