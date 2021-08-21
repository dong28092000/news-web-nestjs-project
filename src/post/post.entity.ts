import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
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
import { Image } from '../image/image.entity';

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

  @OneToMany(() => Comment, (comment: Comment) => comment.post, {
    cascade: true
  })
  comments: Comment[];

  @OneToMany(() => Image, (image: Image) => image.post, {
    cascade: true,
  })
  images: Image[];

  @ManyToOne(() => User, (user: User) => user.posts)
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
