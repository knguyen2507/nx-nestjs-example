import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public email!: string;

  @Column()
  public otp!: string;

  @Column({ default: 0 })
  public wrong!: number;

  @Column()
  public time!: Date;
}

export default Otp;
