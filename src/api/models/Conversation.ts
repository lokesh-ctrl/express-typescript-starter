import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Message from './Message';
import { User } from './Users/User';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

@Entity('conversations')
class Conversation extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30 })
  active: string;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable()
  users: User[];
}

export default Conversation;
