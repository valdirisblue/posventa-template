import { IsString } from 'class-validator';

export class PersonDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  email: string;
}
