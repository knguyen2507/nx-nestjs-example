import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import ProductDefinition from './product-definition.entity';
import { Buyer_Info } from '@libs/utility';
import Shop from './shop.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ name: 'product_definition_id' })
  product_definition_id!: number;

  @ManyToOne(() => ProductDefinition, (product_definition: ProductDefinition) => product_definition.products)
  @JoinColumn({ name: 'product_definition_id' })
  public product_definition?: ProductDefinition | null;

  @Column()
  is_sold!: boolean;

  @Column({ nullable: true })
  buyer_info!: Buyer_Info;

  @Column({ default: 0 })
  sold_price!: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ name: 'shop_id' })
  shop_id!: number;

  @ManyToOne(() => Shop, (shop: Shop) => shop.products)
  @JoinColumn({ name: 'shop_id' })
  public shop?: Shop | null;
}

export default Product;
