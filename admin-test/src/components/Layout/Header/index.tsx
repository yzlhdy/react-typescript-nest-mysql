import React from 'react';
import { BarsOutlined, ExportOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { Container, Headers, HeaderLeft, HeaderRight } from './styles';
import menuList from '../../../router/menus'

const Header: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const handelDelete = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    history.push('/')
  }
  const getTitle = () => {
    let title: string = '';
    const path = location.pathname
    menuList.forEach((item: any) => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find((cItem: any) => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }


  return (
    <Container>
      <Headers>
        <HeaderLeft>
          <BarsOutlined style={{ fontSize: '20px', color: '#00C06B' }} /><span>{getTitle()}</span>
        </HeaderLeft>
        <HeaderRight onClick={handelDelete}>
          <ExportOutlined style={{ fontSize: '20px', color: '#00C06B' }} />
        </HeaderRight>
      </Headers>
    </Container>
  );
};

export default Header;
