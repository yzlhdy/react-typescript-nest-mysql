import React from 'react';
import { Switch, Route } from 'react-router-dom'

import { Container } from './styles';
import ProductAdd from '../../components/ProductAdd'
import ProductHome from '../../components/ProductHome'
import ProductDetail from '../../components/ProductDetail'

const Product: React.FC = () => {
  return (
    <Container>
      <Switch>
        <Route path="/product" exact component={ProductHome} />
        <Route path="/product/addupdate" component={ProductAdd} />
        <Route path="/product/detail" component={ProductDetail} />

      </Switch>
    </Container>
  );
}

export default Product;