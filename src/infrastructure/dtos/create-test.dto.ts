import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
