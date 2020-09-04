import React, { useRef } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Cascader,
  Upload
} from 'antd'
import { FormInstance } from 'antd/lib/form';
import FormComponentProps from 'antd/lib/form';

import { useHistory } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

import { Container } from './styles';
const { Item } = Form
const { TextArea } = Input
interface IFormComponentProps extends FormComponentProps {

}
const ProductAdd: React.FC<IFormComponentProps> = (props) => {
  // const { form } = props
  console.log(props);

  // const { getFieldDecorator } = form
  const history = useHistory()
  const inputEl = useRef<FormInstance>(null)
  console.log('ref', inputEl);

  const title = (
    <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>返回商品</Button>
  )
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const onChange = (value: any) => {
    console.log(value);

  }
  const submint = () => {
    // inputEl.current.validateFields((error: any, value: any) => {
    //   console.log(error);

    // })
  }
  return (
    <Container>
      <Card title={title}>
        <Form
          {...layout}
          ref={inputEl}
        >
          <Item label="商品名称" rules={[{ required: true }]}>
            <Input placeholder="请输入名称" />
          </Item>
          <Item label="商品介绍" rules={[{ required: true }]}>
            <TextArea placeholder="请输入商品介绍" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Item>
          <Item label="价格" rules={[{ required: true }]}>
            <Input type="number" addonAfter="元" />
          </Item>
          <Item label="商品分类">
            <Cascader options={options} onChange={onChange} placeholder="Please select" />
          </Item>
          <Item label="商品图片">

          </Item>
          <Item label="商品详情">

          </Item>
          <Item >
            <Button type="primary" onClick={submint}>提交</Button>
          </Item>
        </Form>
      </Card>
    </Container>
  );
};

export default ProductAdd;
