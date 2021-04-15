import { IsEnum, IsNotEmpty } from 'class-validator';
import { CatalogItemType } from '../fixed/catalog-type.enum';

class CatalogItemDto {
  @IsEnum(CatalogItemType)
  public type: CatalogItemType;
  @IsNotEmpty()
  public brandName: string;
  @IsNotEmpty()
  public description: string;
  @IsNotEmpty()
  public name: string;
}

export default CatalogItemDto;
