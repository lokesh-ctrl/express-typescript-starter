import { EntityRepository } from 'typeorm';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import { Product } from '@base/api/models/Products/Product';

@EntityRepository(Product)
export class ProductRepository extends RepositoryBase<Product> {
  public async createProduct(data: object) {
    let entity = new Product();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateProduct(product: Product, data: object) {
    Object.assign(product, data);

    return await product.save(data);
  }
}
