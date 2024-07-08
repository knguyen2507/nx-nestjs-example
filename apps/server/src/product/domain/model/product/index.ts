import { Buyer_Info, PIC } from '@libs/utility';
import { Expose } from 'class-transformer';
import { ProductDefinitionModel } from '../product-definition';

export class ProductModel {
  @Expose()
  id: number;
  @Expose()
  product_definition_id: number;
  @Expose()
  product_definition: ProductDefinitionModel;
  @Expose()
  is_sold: boolean;
  @Expose()
  buyer_info: Buyer_Info;
  @Expose()
  sold_price: number;
  @Expose()
  description: number;
  @Expose()
  shop_id: number;
  @Expose()
  shop: string;
  @Expose()
  created_at: PIC;
  @Expose()
  updated_at: PIC[];
  @Expose()
  version: number;

  update(data: Partial<this>) {
    this.is_sold = data.is_sold ? data.is_sold : this.is_sold;
  }
}
