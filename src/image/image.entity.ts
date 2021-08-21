import { Posts } from '../post/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: null })
  imageFile: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAtDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAtDate: Date;

  @Column()
  url: string;

  @Column()
  postId: number;
  
  @ManyToOne(() => Posts, (post) => post.images, {
    onDelete: 'CASCADE',
  })
  post: Posts;
}
