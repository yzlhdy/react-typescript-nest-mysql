import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize'
import * as Sequelize from 'sequelize'
import { User } from './interface/user.interface';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class UserService {
    /**
     *
     *
     * @param {User} body username--用户名
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async findOne(body: User): Promise<any> {
        console.log(body);

        const { username } = body
        const sql = `
            SELECT 
                    user_id userId, account_name username, real_name realName, passwd password,
                    passwd_salt salt, mobile, role
            FROM
                admin_user
            WHERE
        account_name = '${username}'
        `
        try {
            const user = (
                await sequelize.query(sql, {
                    type: Sequelize.QueryTypes.SELECT,
                    raw: false,
                    logging: true
                })
            )[0]
            return user
        } catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }

    /**
     *
     *
     * @param {Register} body 注册
     * @returns {(Promise<any | undefined>)}
     * @memberof UserService
     */
    async register(body: any): Promise<any | undefined> {
        const { realName, repassword, password, accountName, mobile } = body
        if (password !== repassword) {
            return {
                code: 400,
                msg: '两次密码不正确'
            }
        }
        const user = await this.findOne({ username: accountName })
        if (user) {
            return {
                code: 400,
                msg: '用户已存在'
            }
        }
        const salt = makeSalt() //制作密码盐
        const hashPwd = encryptPassword(password, salt);  // 加密密码
        const registerSQL = `
                INSERT INTO admin_user
                    (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
                VALUES
                    ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
                `
        try {
            await sequelize.query(registerSQL, {
                logging: false
            })
            return {
                code: 200,
                msg: '注册成功'
            }
        } catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
}
