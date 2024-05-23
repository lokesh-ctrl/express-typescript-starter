import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsArray, IsNumber } from 'class-validator';

export class MessageCreateRequest {
  @MaxLength(150)
  @IsString()
  content: string;

  @IsNumber()
  sender_id: number;

  @IsNumber()
  receiver_id: number;

  @IsNumber()
  conversation_id: number;
}
