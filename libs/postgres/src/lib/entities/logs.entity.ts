import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusLogLevel } from '@libs/utility';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public message_id!: string;

  @Column()
  public level!: StatusLogLevel;

  @Column()
  public time_stamp!: Date;

  @Column()
  public event_name!: string;

  @Column()
  public message!: string;

  @Column()
  public data!: string;
}

export default Logs;
