import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './Users/User';
import Conversation from './Conversation';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

@Entity({ name: 'messages' })
export class Message extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @Column()
  sender_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column()
  conversation_id: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}

export default Message;
