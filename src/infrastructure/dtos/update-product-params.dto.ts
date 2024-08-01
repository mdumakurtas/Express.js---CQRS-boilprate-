import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductParamsDto {
  @IsString()
  @IsNotEmpty()
  idProduct: string;
}
