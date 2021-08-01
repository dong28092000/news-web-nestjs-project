import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
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

  @Column({default: null})
  userId: number;


  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => User, (user: User) => user.posts)
  user: User;
}
