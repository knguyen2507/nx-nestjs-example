import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public phone!: string;

  @Column()
  public email!: string;

  @Column()
  public username!: string;

  @Column()
  public password!: string;

  @Column()
  public is_deleted!: boolean;

  @Column()
  public is_verified!: boolean;

  @Column()
  public is_sa!: boolean;
}

export default User;
