import * as React from 'react';
import { Layout } from 'antd';
import { SideBar } from '../navigation/Sidebar';
import logo from '../assets/svg/pumpkin-logo.png';
import PropTypes from 'prop-types';

const { Sider, Content } = Layout;
export const DefaultLayout = (props) => (
  <Layout className="default-layout__container">
    <Sider collapsible theme="light">
      <div className="logo">
        <img src={logo} alt={logo} />
      </div>
      <SideBar />
    </Sider>
    <Content className="default-layout__content">{props.children}</Content>
  </Layout>
);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
