import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Select
} from 'antd'
import { productList, Products, productSearch, ProductsSearch } from '../../api/user'
// import { useQuery } from 'react-query'
import { Container } from './styles';
const { Option } = Select;

interface ProductDatas {
  id: number;
  name: string;
  description: string;
  sale_money: string;
  createTime: string;

}

const Product: React.FC = () => {

  const [productLists, setProductLists] = useState<ProductDatas[]>([])
  const [searchType, setSearchType] = useState<string>('product_name')
  const [searchName, setSearchName] = useState<string>('')


  const productDataList = (prams: Products) => {
    productList(prams).then(res => {
      console.log(res);
      if (res.data.code === 200) {
        setProductLists(res.data.data.productList)
      }
    })
  }
  // const { data } = useQuery([{ pageSize: 10, pageIndex: 1 }], productDataList)


  useEffect(() => {
    productDataList({ pageSize: 10, pageIndex: 1 })
    return () => {

    }
  }, [])
  const handleChange = (value: string) => {
    setSearchType(value)

  }

  const handelSearch = () => {
    const parms: ProductsSearch = {
      pageSize: 10,
      pageIndex: 1,
      keywords: searchName,
      productType: searchType
    }
    productSearch(parms).then(res => {
      console.log(res);

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
      key: 'id'
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '详细信息',
      dataIndex: 'description',
      key: 'description'
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
      render: () => <Button>不知道</Button>
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
        />
      </Card>
    </Container>
  );
};

export default Product;
