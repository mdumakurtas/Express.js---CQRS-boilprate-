import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsObjectId } from '../../application/validators';

class OrderProduct {
  @IsNotEmpty()
  @IsString()
  @IsObjectId()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products: OrderProduct[];
}
