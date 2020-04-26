import * as React from 'react'
import { Layout} from 'antd';
import {SideBar} from '../navigation/Sidebar';
import logo from '../assets/svg/pumpkin-logo.png'

interface DefaultLayoutProps {
    children: any;
}
const { Sider, Content } = Layout;
export const DefaultLayout = (props: DefaultLayoutProps) => (
    <Layout style={{ height: '100%' }}>
        <Sider collapsible theme="light"><div className="logo" ><img src ={logo} alt={logo} /></div><SideBar /></Sider>
        <Content  style={{ margin: '16px' }}>{props.children}</Content>
    </Layout>
  );