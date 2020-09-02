import { Injectable } from '@nestjs/common';
import * as Sequlize from 'sequelize'
import sequlize from '../../database/sequelize'

import { Category, CreateCategory } from './interface/category.interface'

@Injectable()
export class CategoryService {
    async findAllCategory(body: Category): Promise<any> {
        const { pageSize = 10, pageIndex = 1 } = body;
        console.log(body);

        const currentIndex = (pageIndex - 1) * pageSize > 0 ? 0 : (pageIndex - 1) * pageSize

        const queryCategorySql = `
            SELECT
                id,category_name,  DATE_FORMAT(c_time, '%Y-%m-%d %H:%i:%s') AS createTime
            FROM
                category
            LIMIT ${currentIndex}, ${pageSize};
        `
        const categoryList: any[] = await sequlize.query(queryCategorySql, {
            type: Sequlize.QueryTypes.SELECT,
            raw: true,
            logging: false
        })

        const countListSql = `
            SELECT
                COUNT(*) AS total
            FROM
                category
   
        `
        const count: any = (
            await sequlize.query(countListSql, {
                type: Sequlize.QueryTypes.SELECT,
                raw: true,
                logging: false
            })
        )[0]
        return {
            code: 200,
            data: {
                categoryList,
                total: count.total
            },
        }

    }


    async createCategory(body: CreateCategory): Promise<any> {
        const { name, time } = body
        const queryCreateSql = `
            INSERT INTO category
                (category_name,c_time)
            VALUES
            ('${name}','${time}')
        `

        await sequlize.query(queryCreateSql, {
            logging: false
        })
        return {
            code: 200,
            msg: '创建成功'
        }
    }


    async updatadCatagory(body: any): Promise<any> {
        const { id, name, time } = body;
        console.log(body);

        const updateSql = `
                UPDATE
                category
            SET
                category_name='${name}',
                c_time = '${time}'
            WHERE
             id = ${id};
        `
        // const transaction = await sequlize.transaction();
        await sequlize.query(updateSql, { logging: false });
        return {
            code: 200,
            msg: '修改成功'
        }
    }

    async deleteCategory(body: any): Promise<any> {
        const { id } = body
        const deleteSql = `
            DELETE FROM 
                category
            WHERE
            id = ${id}
        `

        await sequlize.query(deleteSql, {
            logging: false
        })
        return {
            code: 200,
            msg: '删除成功'
        }
    }
}
