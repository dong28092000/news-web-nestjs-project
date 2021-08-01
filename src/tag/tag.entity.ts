import { Posts } from 'src/post/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createAtDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updateAtDate: Date;

  @ManyToMany(() => Posts)
  posts: Posts[];
}
