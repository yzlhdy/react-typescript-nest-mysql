import React from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Cascader,
  Upload
} from 'antd'
import { useHistory } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

import { Container } from './styles';
const { Item } = Form
const { TextArea } = Input
const ProductAdd: React.FC = () => {
  const history = useHistory()
  const title = (
    <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>返回商品</Button>
  )
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };
  return (
    <Container>
      <Card title={title}>
        <Form
          {...layout}
        >
          <Item label="商品名称">
            <Input placeholder="请输入名称" />
          </Item>
          <Item label="商品介绍">
            <TextArea placeholder="请输入商品介绍" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Item>
          <Item label="价格">
            <Input type="number" addonAfter="元" />
          </Item>
          <Item label="价格">
            <Input type="number" addonAfter="元" />
          </Item>
        </Form>
      </Card>
    </Container>
  );
};

export default ProductAdd;
