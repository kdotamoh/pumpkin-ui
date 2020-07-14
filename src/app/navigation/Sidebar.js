import { Menu } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  GoldOutlined,
  LogoutOutlined,
  RiseOutlined,
  SyncOutlined,
  SettingOutlined,
  ReadOutlined,
  BankOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import store from '../store';

import { unsetUser } from '../store/auth';

const { SubMenu } = Menu;

export class SideBarComponent extends React.Component {
  render() {
    const isSuperAdmin = this.props.user.roles.includes('SUPER_ADMIN');
    return (
      <Menu mode="inline">
        <Menu.Item key="employees">
          <NavLink to="/employees">
            <GoldOutlined />
            <span>Employees</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="alumni">
          <NavLink to="/alumni">
            <GoldOutlined />
            <span>Alumni</span>
          </NavLink>
        </Menu.Item>
        {isSuperAdmin && (
          <Menu.Item key="tracks">
            <NavLink to="/tracks">
              <RiseOutlined />
              <span>Tracks</span>
            </NavLink>
          </Menu.Item>
        )}
        {isSuperAdmin && (
          <Menu.Item key="cycles">
            <NavLink to="/cycles">
              <SyncOutlined />
              <span>Cycles</span>
            </NavLink>
          </Menu.Item>
        )}
        {isSuperAdmin && (
          <SubMenu title="Settings" icon={<SettingOutlined />}>
            <Menu.Item key="majors">
              <NavLink to="/university-majors">
                <ReadOutlined />
                <span>Majors</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="setup">
              <NavLink to="/university-setup">
                <BankOutlined />
                <span>Setup</span>
              </NavLink>
            </Menu.Item>
          </SubMenu>
        )}
        <Menu.Item
          onClick={() => {
            console.log('clicked');
            store.dispatch(unsetUser());
          }}
          key="logout"
        >
          <LogoutOutlined />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );
  }
}

SideBarComponent.propTypes = {
  user: PropTypes.object,
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  user: state.user,
});

/**
 * The connected SidebarComponent
 */
export const SideBar = connect(mapStateToProps, {})(SideBarComponent);
