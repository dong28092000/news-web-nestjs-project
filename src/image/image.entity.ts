import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: null })
  imageFile: string

  @CreateDateColumn({ type: 'timestamp' })
  createAtDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAtDate: Date;

  url: string;
}
