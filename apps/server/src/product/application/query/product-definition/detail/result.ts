import { Image } from '@libs/utility';
import { Expose } from 'class-transformer';

export class DetailProductDefinitionResult {
  @Expose()
  readonly id: number;
  @Expose()
  readonly code: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly brand: string;
  @Expose()
  readonly category: string;
  @Expose()
  readonly sell_price: number;
  @Expose()
  readonly description: string;
  @Expose()
  readonly thumbnailLink: Image;
  @Expose()
  readonly images: Image[];
  @Expose()
  readonly inStock: boolean;
  @Expose()
  readonly meta: string;
}
