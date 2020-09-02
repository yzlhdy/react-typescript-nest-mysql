import React from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Select
} from 'antd'

import { Container } from './styles';
const { Option } = Select;

const Product: React.FC = () => {


  const handleChange = () => {

  }
  const title = (
    <span>
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
      </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <Input placeholder='请输入类容' style={{ width: '200px', margin: '0 20px' }} />
      <Button type="primary">搜索</Button>
    </span>
  )
  const extra = (
    <Button type="primary">添加商品</Button>
  )

  const columns = [
    {
      title: '序号',

    }
  ]

  return (
    <Container>
      <Card title={title} extra={extra}>
        <Table
          columns={columns}

        />
      </Card>
    </Container>
  );
};

export default Product;
