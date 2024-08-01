import { IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from '../../application/validators';

export class UpdateProductParamsDto {
  @IsString()
  @IsNotEmpty()
  @IsObjectId()
  idProduct: string;
}
