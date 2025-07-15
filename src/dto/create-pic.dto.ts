import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreatePic {
  @IsString()
  name: string;
}
