import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Register } from './interface/user.interface';
import { AuthService } from '../auth/auth.service';

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
    @Post('register')
    register(@Body() body: Register) {
        return this.userService.register(body)
    }

    @Post('login')
    async login(@Body() loginParams: any) {
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
