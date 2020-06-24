import { Menu } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoldOutlined, ExportOutlined, RiseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import store from '../store';

import { unsetUser } from '../store/auth';

export class SideBarComponent extends React.Component {
  render() {
    return (
      <Menu mode="inline">
        {this.getSidebarItems().map(
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
  }
  getSidebarItems = () => {
    const sidebarItems = [
      {
        key: 'employees',
        name: 'Employees',
        icon: <GoldOutlined />,
        route: '/employees',
        withBreak: true,
      },
      {
        key: 'alumni',
        name: 'Alumni',
        icon: <GoldOutlined />,
        route: '/alumni',
      },
    ];
    if (this.props.user.roles.includes('SUPER_ADMIN')) {
      sidebarItems.push({
        key: 'tracks',
        name: 'Tracks',
        icon: <RiseOutlined />,
        route: '/tracks',
      });
    }
    sidebarItems.push({
      key: 'logout',
      name: 'Logout',
      icon: <ExportOutlined />,
      route: '/#',
    });
    return sidebarItems;
  };
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
