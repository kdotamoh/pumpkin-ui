import { Menu } from "antd";
import * as React from "react";
import {  NavLink } from "react-router-dom";
import { AppstoreOutlined, GoldOutlined, CalendarOutlined } from '@ant-design/icons';

const sidebarItems = [
    {
        key: '1',
        name: 'Dashboard',
        icon: <AppstoreOutlined />,
        route: ''
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
        route: '/alumni'
    },
   
]
export const SideBar = () => (
    <Menu
        mode="inline"
    >
        {sidebarItems.map(item =>     
            {
            return(
            <Menu.Item key={item.key}>
            <NavLink to={item.route}>
                {item.icon}
                <span>{item.name}</span>
            </NavLink>
            </Menu.Item>
            )}
            // {item.withBreak ? <hr style={{ width: '80%' }}/> : null}
        )}
    </Menu>
);