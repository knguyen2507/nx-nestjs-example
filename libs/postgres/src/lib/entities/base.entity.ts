import { PIC } from '@libs/utility';
import { Column, Entity, VersionColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @Column({ type: 'json' })
  created_at!: PIC;

  @Column({
    type: 'json',
    default: [],
  })
  updated_at!: PIC[];

  @VersionColumn()
  version!: number;
}
