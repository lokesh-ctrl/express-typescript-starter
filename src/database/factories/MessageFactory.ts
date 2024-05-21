import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Message from '@api/models/Message';

define(Message, (faker: typeof Faker) => {
  const content = faker.lorem.sentence(5);

  const message = new Message();
  message.content = content;
  return message;
});
