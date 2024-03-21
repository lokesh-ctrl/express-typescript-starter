import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'Product object.',
})
export class Products {
  @Field((type) => ID)
  public id: string;

  @Field({
    description: 'Name of the product.',
  })
  public name: string;

  @Field({
    description: 'Category of the product',
  })
  public category: string;

  @Field({
    description: 'If product is in stock or not',
  })
  public stocked: boolean;

  @Field({
    description: 'Price of the product',
  })
  public price: number;
}
