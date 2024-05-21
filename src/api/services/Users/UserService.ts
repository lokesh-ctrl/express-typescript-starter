import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { UserNotFoundException } from '@api/exceptions/Users/UserNotFoundException';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '@base/api/models/Users/User';

@Service()
export class UserService {
  constructor(@InjectRepository() private userRepository: UserRepository) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.userRepository.getManyAndCount(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedUserOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    let user = await this.userRepository.createUser(data);
    return user;
  }

  public async updateOneById(id: number, data: object) {
    const user = await this.getRequestedUserOrFail(id);

    return await this.userRepository.updateUser(user, data);
  }

  public async deleteOneById(id: number) {
    return await this.userRepository.delete(id);
  }

  private async getRequestedUserOrFail(id: number, resourceOptions?: object) {
    let user = await this.userRepository.getOneById(id, resourceOptions);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  public async getUserConversations(userId: number) {
    let user = await User.findByIds([userId]);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  public async setConversationToUser(userId: number, convId: number) {
    let user = await this.userRepository.getOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
  }
}
