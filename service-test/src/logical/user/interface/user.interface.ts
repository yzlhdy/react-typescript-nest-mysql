export interface User {
    username: string
}

/**
 * 注册
 */
export interface Register {
    accountName: string;
    realName: string;
    password: string;
    repassword: string
    mobile: number;
}