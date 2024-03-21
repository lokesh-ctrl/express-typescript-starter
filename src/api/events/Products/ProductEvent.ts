import { EventSubscriber, On } from 'event-dispatch';

@EventSubscriber()
export class ProductEvent {
  @On('onProductCreate')
  public onProductCreate(product: any) {
    console.log('Product ' + product.name + ' created!');
  }
}
