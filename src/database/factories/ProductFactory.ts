import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Product } from '@base/api/models/Products/Product';

define(Product, (faker: typeof Faker) => {
  const name = faker.lorem.word();
  const category = faker.lorem.word();
  const price = parseInt(faker.finance.amount());
  const stocked = false;

  const product = new Product();
  product.name = name;
  product.category = category;
  product.price = price;
  product.stocked = stocked;

  return product;
});
