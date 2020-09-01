import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';

import { AuthService } from '../auth/auth.service';
import { RegisterInfoDTO, LoginDTO } from './dto/user.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('user 用户登录及注册') // 添加 接口标签 装饰器
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }
    @Post()
    findOne(@Body() body: any) {
        console.log(body);

        return this.userService.findOne(body)
    }

    /**
     *
     *
     * @param {Register} body
     * @returns 注册
     * @memberof UserController
     */
    @UsePipes(new ValidationPipe()) // 使用管道验证
    @Post('register')
    register(@Body() body: RegisterInfoDTO) {
        return this.userService.register(body)
    }

    @Post('login')
    @ApiBody({
        description: '用户登录',
        type: LoginDTO,
    })
    async login(@Body() loginParams: LoginDTO) {
        console.log('JWT验证 - Step 1: 用户请求登录');
        const { username, password } = loginParams
        const authResult = await this.authService.validateUser(username, password)
        switch (authResult.code) {
            case 1:
                return this.authService.certificate(authResult.user);
            case 2:
                return {
                    code: 600,
                    msg: `账号或密码不正确`,
                };
            default:
                return {
                    code: 600,
                    msg: `查无此人`,
                };
        }
    }
}
