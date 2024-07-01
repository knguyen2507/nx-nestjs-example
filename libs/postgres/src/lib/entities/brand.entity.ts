import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import ProductDefinition from './product-definition.entity';

@Entity()
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public code!: string;

  @Column()
  public thumbnailLink!: string;

  @Column()
  public description!: string;

  @OneToMany(() => ProductDefinition, (product_definition: ProductDefinition) => product_definition.brand)
  public product_definition?: ProductDefinition[] | [];

  @Column()
  public is_deleted!: boolean;
}

export default Brand;
