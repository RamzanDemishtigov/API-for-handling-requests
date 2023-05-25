import { IsNotEmpty, IsEnum, IsEmail,IsOptional } from 'class-validator';
import { OmitType,ApiProperty } from '@nestjs/swagger';

export enum Status {
    ACTIVE = 'Active',
    RESOLVED = 'Resolved',
}

export class RequestDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        enum: Status,
        isArray: false,
    })
    @IsOptional()
    @IsEnum(Status,{
        message:'status must be either Active or Resolved'
    })
    readonly status: Status;

    @IsNotEmpty()
    readonly message: string;

    @IsOptional()
    readonly comment: string;
}

export class CreateRequestDto extends OmitType(RequestDto, ['comment'] as const) {}
export class UpdateRequestDto extends OmitType(RequestDto, ['name','email','message','status'] as const) {}