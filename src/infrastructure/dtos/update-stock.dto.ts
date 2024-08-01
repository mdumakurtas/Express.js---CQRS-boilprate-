import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateStockDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  amount: number;
}
