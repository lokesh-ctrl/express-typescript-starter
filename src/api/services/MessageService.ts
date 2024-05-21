import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NotFoundException } from '../exceptions/NotFoundException';
import { MessageRepository } from '../repositories/MessagesRepository';

@Service()
export class MessageService {
  constructor(@InjectRepository() private messageRepository: MessageRepository) {}

  public async getAll(resourceOptions?: object) {
    return await this.messageRepository.getManyAndCount(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedMessageOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    let message = await this.messageRepository.createMessage(data);

    return message;
  }

  public async updateOneById(id: number, data: object) {
    const message = await this.getRequestedMessageOrFail(id);

    return await this.messageRepository.updateMessage(message, data);
  }

  public async deleteOneById(id: number) {
    return await this.messageRepository.delete(id);
  }

  private async getRequestedMessageOrFail(id: number, resourceOptions?: object) {
    let message = await this.messageRepository.getOneById(id, resourceOptions);

    if (!message) {
      throw new NotFoundException();
    }

    return message;
  }
}
