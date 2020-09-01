import React from 'react';
import {
  Card,
  Button,
  Table
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Container } from './styles';

const Category: React.FC = () => {

  const extra = (
    <Button icon={<PlusOutlined />} type="primary">添加分类</Button>
  )

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Cash Assets',
      dataIndex: 'money',

    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  return (
    <Container>
      <Card title="分类列表" extra={extra}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{ defaultPageSize: 2, showQuickJumper: true }}
        />,
      </Card>
    </Container>
  );
};

export default Category;
