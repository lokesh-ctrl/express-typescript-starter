import { IsNotEmpty, IsNumber, IsString, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class ProductCreateRequest {
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsNotEmpty()
  stocked: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
