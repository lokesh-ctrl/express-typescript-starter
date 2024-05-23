import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { UserUpdateRequest } from '@api/requests/Users/UserUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { LoggedUser } from '@base/decorators/LoggedUser';
import { LoggedUserInterface } from '@api/interfaces/users/LoggedUserInterface';
import { UserService } from '../services/Users/UserService';
import { ConvresationCreateRequest } from '../requests/ConversationCreateRequest';
import { MessageCreateRequest } from '../requests/MessageCreateRequest';
import { MessageService } from '../services/MessageService';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/messages')
@UseBefore(AuthCheck)
export class MessageController extends ControllerBase {
  public constructor(private messageService: MessageService, private userService: UserService) {
    super();
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.messageService.findOneById(id, resourceOptions);
  }

  @Get('/conversation/:id([0-9]+)')
  public async getConvMessages(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.messageService.getConversationMessages(id);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() message: MessageCreateRequest) {
    return await this.messageService.create(message);
  }

  //   @Put('/:id')
  //   public async update(@Param('id') id: number, @Body() user: UserUpdateRequest) {
  //     return await this.messageService.updateOneById(id, user);
  //   }

  //   @Delete('/:id')
  //   @HttpCode(204)
  //   public async delete(@Param('id') id: number) {
  //     return await this.messageService.deleteOneById(id);
  //   }
}
