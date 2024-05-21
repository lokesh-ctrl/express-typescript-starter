import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Conversation from '@api/models/Conversation';

define(Conversation, (faker: typeof Faker) => {
  const conversation = new Conversation();

  return conversation;
});
