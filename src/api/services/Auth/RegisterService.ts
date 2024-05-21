import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AuthService } from '@base/infrastructure/services/auth/AuthService';

@Service()
export class RegisterService {
  constructor(
    @InjectRepository() private userRepository: UserRepository,
    private authService: AuthService,
  ) {
    //
  }

  public async register(data: object) {
    let user = await this.userRepository.createUser(data);

    user = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['role'],
    });

    return this.authService.sign(
      {
        userId: user.id,
        email: user.email,
        role_id: user.role_id,
        role: user.role.name,
      },
      { user: { id: user.id, email: user.email, role: user.role.name } },
    );
  }
}
