import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: null })
  userId: number;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => User, (user: User) => user.posts)
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
