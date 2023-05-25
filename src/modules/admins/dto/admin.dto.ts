import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class AdminDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}

export class LoginAdminDto {
    @IsNotEmpty()
    @IsEmail()
    readonly username: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}