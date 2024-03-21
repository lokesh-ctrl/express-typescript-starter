import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Products } from '@base/api/types/Products/Products';
import { ProductService } from '@base/api/services/Products/ProductService';

@Service()
@Resolver((of) => Products)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query((returns) => [Products])
  public async products(): Promise<any> {
    return await this.productService.getAll().then((result) => {
      return result.rows;
    });
  }
}
