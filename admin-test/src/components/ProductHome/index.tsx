import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Select
} from 'antd'
import { useHistory } from 'react-router-dom'
import { productList, Products, productSearch, ProductsSearch } from '../../api/user'
// import { useQuery } from 'react-query'
import { Container } from './styles';
import { PAGE_SIZE } from '../../utils/constant'
const { Option } = Select;

interface ProductDatas {
  id: number;
  name: string;
  description: string;
  sale_money: string;
  createTime: string;

}

const ProductHome: React.FC = () => {

  const [productLists, setProductLists] = useState<ProductDatas[]>([])
  const [searchType, setSearchType] = useState<string>('product_name')
  const [searchName, setSearchName] = useState<string>('')
  const [total, setTotal] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)

  const history = useHistory()


  /**
   * 获取初始化数据
   */
  const productDataList = (prams: Products) => {
    productList(prams).then(res => {
      const { total, productList } = res.data.data
      if (res.data.code === 200) {
        setProductLists(productList)
        setTotal(total)
      }
    })
  }
  // const { data } = useQuery([{ pageSize: 10, pageIndex: 1 }], productDataList)


  useEffect(() => {
    productDataList({ pageSize: PAGE_SIZE, pageIndex: pageIndex })
    return () => {

    }
  }, [])
  const handleChange = (value: string) => {
    setSearchType(value)

  }
  /**
   * 搜索
   */
  const handelSearch = () => {
    const parms: ProductsSearch = {
      pageSize: PAGE_SIZE,
      pageIndex: pageIndex,
      keywords: searchName,
      productType: searchType
    }
    productSearch(parms).then(res => {

      if (res.data.code === 200) {
        setProductLists(res.data.data.productList)
      }
    })
  }
  const title = (
    <span>
      <Select defaultValue="lucy" style={{ width: 220 }} value={searchType} onChange={handleChange}>
        <Option value="product_name">按名称搜索</Option>
        <Option value="product_desc">按介绍搜索</Option>


      </Select>
      <Input placeholder='请输入类容' style={{ width: '240px', margin: '0 20px' }} value={searchName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchName(event.target.value)} />
      <Button type="primary" onClick={handelSearch}>搜索</Button>
    </span>
  )
  const extra = (
    <Button type="primary">添加商品</Button>
  )

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: '80px'

    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '详细信息',
      dataIndex: 'description',
      key: 'description',
      width: "500px"
    }, {
      title: '价格',
      dataIndex: 'sale_money',
      key: 'sale_money',

    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => {
        let benText = "下架"
        let text = '在售'
        if (status === 2) {
          benText = "上架"
          text = "已下架"
        }
        return (
          <span>
            <Button type="ghost">{benText}</Button>
            <div>{text}</div>
          </span>
        )
      }

    },
    {
      title: "创建日期",
      dataIndex: 'createTime',
      key: 'createTime'
    }, {
      title: '操作',
      width: '200px',
      render: (product: any) => {
        return (
          <span>
            <Button type="primary" onClick={() => history.push('/product/addupdate',)}>修改</Button>
            <Button type="dashed" onClick={() => history.push('/product/detail', { product })}>详情</Button>
          </span >
        )
      }
    }
  ]

  return (
    <Container>
      <Card title={title} extra={extra}>
        <Table
          columns={columns}

          dataSource={productLists}
          bordered
          rowKey='id'
          pagination={{
            total, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange: (page: number) => {
              setPageIndex(page)

              return productDataList({ pageSize: PAGE_SIZE, pageIndex: page })
            }
          }}
        />
      </Card>
    </Container>
  );
};

export default ProductHome;
