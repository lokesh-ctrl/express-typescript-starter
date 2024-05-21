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
import { ConversationService } from '../services/ConversationService';
import { UserService } from '../services/Users/UserService';
import { ConvresationCreateRequest } from '../requests/ConversationCreateRequest';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/conversations')
@UseBefore(AuthCheck)
export class ConversationController extends ControllerBase {
  public constructor(private convesationService: ConversationService, private userService: UserService) {
    super();
  }

  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.convesationService.getAll(resourceOptions);
  }

  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.convesationService.findOneById(id, resourceOptions);
  }

  @Get('/mine')
  public async getMine(@QueryParams() parseResourceOptions: RequestQueryParser, @LoggedUser() loggedUser: LoggedUserInterface) {
    return await this.userService.getUserConversations(loggedUser.userId);
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() conversation: ConvresationCreateRequest) {
    return await this.convesationService.create(conversation);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() user: UserUpdateRequest) {
    return await this.convesationService.updateOneById(id, user);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.convesationService.deleteOneById(id);
  }
}
