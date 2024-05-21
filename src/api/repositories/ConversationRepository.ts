import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import Conversation from '@api/models/Conversation';
import { User } from '../models/Users/User';

export type ConversationInputType = {
  active: string;
  users: number[];
};

@EntityRepository(Conversation)
export class ConversationRepository extends RepositoryBase<Conversation> {
  public async createConversation(data: ConversationInputType) {
    let entity = new Conversation();

    Object.assign(entity, data);

    let conv = await this.save(entity);

    let users = await User.findByIds(data.users);

    conv.users = users;

    await conv.save();

    return conv;
  }

  public async updateConversation(conversation: Conversation, data: object) {
    Object.assign(conversation, data);

    return await conversation.save(data);
  }
}
