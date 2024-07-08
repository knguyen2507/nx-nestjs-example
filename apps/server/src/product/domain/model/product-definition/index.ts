import { Expose } from 'class-transformer';

export type PIC = {
  id: string;
  username: string;
  at: Date;
};

export type Image = {
  id: string;
  name: string;
  url: string;
  isMain: boolean;
};

export class ProductDefinitionModel {
  @Expose()
  id: string;
  @Expose()
  productCode: string;
  @Expose()
  name: string;
  @Expose()
  categoryId: string;
  @Expose()
  brandId: string;
  @Expose()
  qty: number;
  @Expose()
  purchase: number;
  @Expose()
  price: number;
  @Expose()
  description: string;
  @Expose()
  thumbnailLink: Image;
  @Expose()
  images: Image[];
  @Expose()
  created: PIC;
  @Expose()
  updated: PIC[];

  update(data: Partial<this>) {
    this.name = data.name ? data.name : this.name;
    this.qty = data.qty ? data.qty : this.qty;
    this.price = data.price ? data.price : this.price;
    this.description = data.description ? data.description : this.description;
    this.thumbnailLink = data.thumbnailLink ? data.thumbnailLink : this.thumbnailLink;
    this.images = data.images ? data.images : this.images;
  }
}
