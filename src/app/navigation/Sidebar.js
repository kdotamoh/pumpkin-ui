import { Menu } from 'antd';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppstoreOutlined,
  GoldOutlined,
  CalendarOutlined,
  ExportOutlined,
} from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
import store from '../store';

import { unsetUser } from '../store/auth';

const sidebarItems = [
  {
    key: '1',
    name: 'Dashboard',
    icon: <AppstoreOutlined />,
    route: '',
  },
  {
    key: '2',
    name: 'Cycles',
    icon: <CalendarOutlined />,
    route: '',
  },
  {
    key: '3',
    name: 'Employees',
    icon: <GoldOutlined />,
    route: '/employees',
    withBreak: true,
  },
  {
    key: '4',
    name: 'Alumni',
    icon: <GoldOutlined />,
    route: '/alumni',
  },
  {
    key: '5',
    name: 'Logout',
    icon: <ExportOutlined />,
    route: '/#',
  },
];

export const SideBar = () => (
  <Menu mode="inline">
    {sidebarItems.map(
      (item) => {
        return (
          <Menu.Item
            onClick={
              item.name === 'Logout'
                ? () => {
                    console.log('clicked');
                    store.dispatch(unsetUser());
                  }
                : null
            }
            key={item.key}
          >
            <NavLink to={item.route}>
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </Menu.Item>
        );
      }
      // {item.withBreak ? <hr style={{ width: '80%' }}/> : null}
    )}
  </Menu>
);
