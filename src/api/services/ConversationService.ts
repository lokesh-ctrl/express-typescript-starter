import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ConversationInputType, ConversationRepository } from '../repositories/ConversationRepository';
import { NotFoundException } from '../exceptions/NotFoundException';
import Conversation from '../models/Conversation';

@Service()
export class ConversationService {
  constructor(@InjectRepository() private conversationRepository: ConversationRepository) {}

  public async getAll(resourceOptions?: object) {
    const convRepo = Conversation.getRepository();
    return await convRepo.find({ relations: ['users'] });
  }

  public async getUserConvs(userId: number) {
    const convRepo = Conversation.getRepository();
    return await convRepo.find({ relations: ['users'], where: { users: [userId] } });
  }

  public async findOneById(id: number, resourceOptions?: object) {
    const convRepo = Conversation.getRepository();
    const conversation = await convRepo.findOne(id, { relations: ['users'] });
    return conversation;
  }

  public async create(data: ConversationInputType) {
    let conversation = await this.conversationRepository.createConversation(data);

    return conversation;
  }

  public async updateOneById(id: number, data: object) {
    const conversation = await this.getRequestedConversationOrFail(id);

    return await this.conversationRepository.updateConversation(conversation, data);
  }

  public async deleteOneById(id: number) {
    return await this.conversationRepository.delete(id);
  }

  private async getRequestedConversationOrFail(id: number, resourceOptions?: object) {
    let conversation = await this.conversationRepository.getOneById(id);

    console.log(conversation.users);

    if (!conversation) {
      throw new NotFoundException();
    }

    return conversation;
  }
}
