import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public code!: string;

  @Column()
  public brand_code!: string;

  @Column()
  public category_code!: string;

  @Column()
  public product_definition_code!: string;

  @Column({ nullable: true })
  public percent!: number;

  @Column({ nullable: true })
  public sale_price!: number;

  @Column({ nullable: true })
  public max_sale_price!: number;

  @Column({
    type: 'json',
    default: [],
  })
  public shop_id!: number[];

  @Column()
  public description!: string;

  @Column()
  public is_used!: boolean;

  @Column()
  public is_deleted!: boolean;

  @Column({ nullable: true })
  public time_start!: Date;

  @Column({ nullable: true })
  public time_end!: Date;
}

export default Sales;
