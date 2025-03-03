import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {

    @ApiProperty()
    @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}


export class CreateUserDto {

  @ApiProperty()
  @IsString()
@IsEmail()
email: string;

@ApiProperty()
@IsString()
@IsNotEmpty()
password: string;
}
