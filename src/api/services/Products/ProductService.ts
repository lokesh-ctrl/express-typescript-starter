import { Service } from 'typedi';
import { ProductRepository } from '@api/repositories/Products/ProductRepository';
import { UserNotFoundException } from '@api/exceptions/Users/UserNotFoundException';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class ProductService {
  constructor(@InjectRepository() private productRepository: ProductRepository) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.productRepository.getManyAndCount(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedUserOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    let product = await this.productRepository.createProduct(data);
    return product;
  }

  public async updateOneById(id: number, data: object) {
    const product = await this.getRequestedUserOrFail(id);

    return await this.productRepository.updateProduct(product, data);
  }

  public async deleteOneById(id: number) {
    return await this.productRepository.delete(id);
  }

  private async getRequestedUserOrFail(id: number, resourceOptions?: object) {
    let user = await this.productRepository.getOneById(id, resourceOptions);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
