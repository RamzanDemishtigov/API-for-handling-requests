import { IsNotEmpty, IsEnum, IsEmail } from 'class-validator';

enum Status {
    ACTIVE = 'Active',
    RESOLVED = 'Resolved',
}

export class RequestDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsEnum(Status,{
        message:'status must be either Active or Resolved'
    })
    readonly status: Status;

    @IsNotEmpty()
    readonly message: string;

    @IsNotEmpty()
    readonly comment: string;
}