import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { ProductService } from '@api/services/Products/ProductService';
import { Service } from 'typedi';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { ProductCreateRequest } from '@base/api/requests/Products/ProductCreateRequest';
import { ProductUpdateRequest } from '@base/api/requests/Products/ProductUpdateRequest';
import { OnConnect, SocketController, ConnectedSocket, OnDisconnect, MessageBody, OnMessage } from 'socket-controllers';

@Service()
@OpenAPI({})
@JsonController('/products')
@SocketController()
export class ProductController extends ControllerBase {
  public constructor(private productService: ProductService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.productService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.productService.findOneById(id, resourceOptions);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() user: ProductCreateRequest) {
    return await this.productService.create(user);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() user: ProductUpdateRequest) {
    return await this.productService.updateOneById(id, user);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.productService.deleteOneById(id);
  }

  @OnConnect()
  connection(@ConnectedSocket() socket: any) {
    console.log('client connected');
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: any) {
    console.log('client disconnected');
  }

  @OnMessage('save')
  save(@ConnectedSocket() socket: any, @MessageBody() message: any) {
    console.log('received message:', message);
    console.log('setting id to the message and sending it back to the client');
    message.id = 1;
    socket.emit('message_saved', message);
  }
}
