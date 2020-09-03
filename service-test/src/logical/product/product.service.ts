import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize'
import * as Sequelize from 'sequelize'

import { Product } from './interface/product.interface';

@Injectable()
export class ProductService {
    async productList(body: Product): Promise<any> {
        const { pageSize = 10, pageIndex = 1 } = body
        const currentPage = (pageIndex - 1) * pageSize > 0 ? 0 : (pageIndex - 1) * pageSize
        console.log(currentPage, pageSize);

        const queryProductSql = `
            SELECT
	            id,
	            product_name name,
	            product_desc description,
	            sale_money,
                DATE_FORMAT( c_time, '%Y-%m-%d %H:%i:%s' ) createTime ,
                status
            FROM
                product 
            ORDER BY
                id ASC 
            LIMIT ${currentPage},${pageSize}
        `

        const productList: any[] = await sequelize.query(queryProductSql, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: false
        })

        const countSql = `
            SELECT
                COUNT(*) AS total
            FROM
                product
        `

        const count: any = (
            await sequelize.query(countSql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: false
            })
        )[0]

        return {
            code: 200,
            data: {
                productList,
                total: count.total
            }
        }
    }

    async productSearch(body: any): Promise<any> {
        const { pageSize, pageIndex, productType, keywords } = body
        console.log(body);

        const currentSearch = (pageIndex - 1) * pageSize > 0 ? 0 : (pageIndex - 1) * pageSize
        const searchSql = `
            SELECT
	            id,
	            product_name name,
	            product_desc description,
	            sale_money,
                DATE_FORMAT( c_time, '%Y-%m-%d %H:%i:%s' ) createTime ,
                status
            FROM
                product
            WHERE
                ${productType} LIKE '%${keywords}%'
            ORDER BY
                id DESC 
            LIMIT ${currentSearch},${pageSize}
        `
        const productList: any[] = await sequelize.query(searchSql, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: false
        })

        const countSql = `
            SELECT
                COUNT(*) AS total
            FROM
                product
        `

        const count: any = (
            await sequelize.query(countSql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: false
            })
        )[0]

        return {
            code: 200,
            data: {
                productList,
                total: count.total
            }
        }
    }

    async productStatus(body: any): Promise<any | null> {
        const { id, status } = body
        const statusSql = `
            UPDATE
                product
            SET
                status=${status}
            WHERE
               id = ${id}
        `
        await sequelize.query(statusSql, {
            logging: false
        })
        return {
            code: 200,
            msg: '修改成功'
        }
    }
}
