// src/logical/user/user.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterInfoDTO {
    @ApiProperty()
    @IsNotEmpty({ message: '用户名不能为空' })
    readonly accountName: string;
    @ApiProperty()
    @IsNotEmpty({ message: '真实姓名不能为空' })
    @IsString({ message: '真实姓名必须是 String 类型' })
    readonly realName: string;
    @ApiProperty()
    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;
    @ApiProperty()
    @IsNotEmpty({ message: '重复密码不能为空' })
    readonly repassword: string;
    @ApiProperty()
    @IsNotEmpty({ message: '手机号不能为空' })
    @IsNumber()
    readonly mobile: number;
    @ApiProperty()
    readonly role?: string | number;
}

export class LoginDTO {
    @ApiProperty()
    @ApiProperty({ description: '用户名', example: 'admin', })
    @IsNotEmpty({ message: '用户名不能为空' })
    readonly username: string;
    @ApiProperty({ description: '密码', example: '123456' })
    @ApiProperty()
    @IsNotEmpty({ message: '密码不能为空' })
    readonly password: string;
}
