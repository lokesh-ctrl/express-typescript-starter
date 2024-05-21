import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsArray } from 'class-validator';

export class ConvresationUpdateRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  active: string;

  @IsArray()
  users: number[]
}
