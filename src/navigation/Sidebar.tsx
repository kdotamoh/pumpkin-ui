import { Menu } from "antd";
import * as React from "react";
import { AppstoreOutlined, GoldOutlined, CalendarOutlined } from '@ant-design/icons';

export const SideBar = () => (
    <Menu
        mode="inline"
    >
        <Menu.Item key="1">
            <AppstoreOutlined />
            <span>Dashboard</span>
        </Menu.Item>
        <Menu.Item key="2">
        <CalendarOutlined />
            <span>Cycles</span>
        </Menu.Item>
        <hr style={{ width: '80%' }}/>
        <Menu.Item key="3">
            <GoldOutlined />
            <span>Employee</span>
        </Menu.Item>
    </Menu>
);