import { NotFoundError } from 'routing-controllers';

export class NotFoundException extends NotFoundError {
  constructor() {
    super('Not Found');
  }
}
