import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsArray } from 'class-validator';

export class ConvresationCreateRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  active: string;

  @IsArray()
  users: number[];
}
