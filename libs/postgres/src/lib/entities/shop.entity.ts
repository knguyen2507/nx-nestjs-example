import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import Product from './product.entity';

@Entity()
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public phone!: string;

  @Column()
  public email!: string;

  @Column()
  public address!: string;

  @OneToMany(() => Product, (products: Product) => products.shop)
  public products?: Product[] | [];
}

export default Shop;
