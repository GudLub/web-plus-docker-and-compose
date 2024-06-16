import { 
  IsEmail, 
  IsOptional, 
  IsUrl, 
  Length,
  IsString,
  IsNotEmpty,
  MinLength,
 } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @IsString()
  @Length(2, 300)
  @IsOptional()
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
