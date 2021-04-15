import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CatalogItemType } from '../fixed/catalog-type.enum';
import { Document } from 'mongoose';

@Schema()
class CatalogItem extends Document {
  @Prop({ required: true, index: true })
  public type: CatalogItemType;
  @Prop({ required: true })
  public brandName: string;
  @Prop({ required: true })
  public description: string;
  @Prop({ required: true })
  public name: string;
}

export default CatalogItem;
export const CatalogItemSchema = SchemaFactory.createForClass(CatalogItem);
