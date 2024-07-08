import { Buyer_Info, PIC } from '@libs/utility';
import { Expose } from 'class-transformer';

export class BrandModel {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  code: string;
  @Expose()
  thumnailLink: string;
  @Expose()
  description: string;
  @Expose()
  product_defination: number;
  @Expose()
  is_deleted: boolean;
  @Expose()
  created_at: PIC;
  @Expose()
  updated_at: PIC[];
  @Expose()
  version: number;

  update(data: Partial<this>) {
    this.name = data.name ? data.name : this.name;
  }
}
