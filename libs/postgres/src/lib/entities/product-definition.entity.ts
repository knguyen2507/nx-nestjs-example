import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import Brand from './brand.entity';
import Category from './category.entity';
import Product from './product.entity';
import { Image } from '@libs/utility';

@Entity()
export class ProductDefinition extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public code!: string;

  @Column()
  public purchase_price!: number;

  @Column({ nullable: true })
  public sell_price!: number;

  @Column({ type: 'json' })
  public thumbnailLink!: Image;

  @Column({
    type: 'json',
    default: [],
  })
  public images!: Image[];

  @Column()
  public description!: string;

  @Column({ name: 'brand_id' })
  brand_id!: number;

  @ManyToOne(() => Brand, (brand: Brand) => brand.product_definition)
  @JoinColumn({ name: 'brand_id' })
  public brand?: Brand | null;

  @Column({ name: 'category_id' })
  category_id!: number;

  @ManyToOne(() => Category, (category: Category) => category.product_definition)
  @JoinColumn({ name: 'category_id' })
  public category?: Category | null;

  @OneToMany(() => Product, (products: Product) => products.product_definition)
  public products?: Product[] | [];

  @Column()
  public is_used!: boolean;

  @Column()
  public is_deleted!: boolean;

  @Column({ nullable: true })
  public meta!: string;
}

export default ProductDefinition;
