import React from 'react';
import {
  Card,
  List,
  Button
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'

import { Container, Detail, Images } from './styles';

const ProductDetail: React.FC = () => {


  const history = useHistory()


  const location = useLocation()
  // const { product } = location.state
  // console.log(product.name);







  const title = (
    <span>

      <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>商品列表</Button>

    </span>
  )

  return (
    <Container>
      <Card title={title}>
        <List>
          <List.Item>
            <Detail>
              <span>商品名称:</span>
              <span>{}</span>
            </Detail>
          </List.Item>
          <List.Item>
            <Detail>
              <span>商品描述:</span>
              <span>享12期免息！优惠200，到手价3988！】超感光徕卡三摄麒麟980；Mate30直降500元享12期</span>
            </Detail>
          </List.Item>
          <List.Item>
            <Detail>
              <span>商品价格:</span>
              <span>100</span>
            </Detail>
          </List.Item>
          <List.Item>
            <Detail>
              <span>所属分类:</span>
              <span>生活</span>
            </Detail>
          </List.Item>
          <List.Item>
            <Detail>
              <span>商品图片:</span>
              <span>
                <Images>
                  <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1633461278,1157974345&fm=26&gp=0.jpg" alt="" />
                </Images>
              </span>
            </Detail>
          </List.Item>
          <List.Item>
            <Detail>
              <span>商品详情:</span>
              <span

              >猫咪</span>
            </Detail>
          </List.Item>
        </List>
      </Card>
    </Container>
  );
};

export default ProductDetail;
