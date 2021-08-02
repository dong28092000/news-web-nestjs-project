import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAtDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updateAtDate: Date;
}
