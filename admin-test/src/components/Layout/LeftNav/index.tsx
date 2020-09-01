import React from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  NotificationOutlined

} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Container } from './styles';
import menuList from '../../../router/menus'
const { SubMenu } = Menu

const LeftNav: React.FC = () => {


  let opentKey: string = ""

  let location = useLocation()
  const selectKey = location.pathname
  const getMenuNodes1 = (menuList: any) => {

    return menuList.reduce((pre: any, item: any) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={<AppstoreOutlined />}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      } else {
        const cItem = item.children.find((cItem: any) => cItem.key === selectKey)
        if (cItem) {
          opentKey = item.key

        }
        pre.push(
          <SubMenu key={item.key} title={item.title} icon={<NotificationOutlined />} >
            {
              getMenuNodes1(item.children)
            }
          </SubMenu >
        )
      }
      return pre
    }, [])
  }

  return (
    <Container>
      <h1>Left Nav</h1>
      <Menu theme="light" mode="inline" selectedKeys={[selectKey]} defaultOpenKeys={[opentKey]}>
        {
          getMenuNodes1(menuList)
        }
      </Menu>
    </Container>
  );
};

export default LeftNav;
