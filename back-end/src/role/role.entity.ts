import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Permission } from '../permission/permission.entity';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAtDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updateAtDate: Date;

  @ManyToMany(() => User)
  users: User[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
