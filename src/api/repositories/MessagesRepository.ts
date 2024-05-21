import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import Message from '@api/models/Message';

@EntityRepository(Message)
export class MessageRepository extends RepositoryBase<Message> {
  public async createMessage(data: object) {
    let entity = new Message();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateMessage(message: Message, data: object) {
    Object.assign(message, data);

    return await message.save(data);
  }
}
