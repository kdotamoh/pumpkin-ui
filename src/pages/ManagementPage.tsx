import { FunctionComponent } from "react";
import * as React from 'react';
import { Table, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';

const dataSource = [
    {
      key: '1',
      name: 'Seun Afolayan',
      email: 'email123@gmail.com',
      dateCreated: '12/01/19',
    },
    {
      key: '2',
      name: 'John',
      email: 'email123@gmail.com',
      dateCreated: '12/01/19',
    },
    {
        key: '3',
        name: 'John',
        email: 'email123@gmail.com',
        dateCreated: '12/01/19',
    },
    {
        key: '4',
        name: 'John',
        email: 'email123@gmail.com',
        dateCreated: '12/01/19',
    },
    {
        key: '5',
        name: 'John',
        email: 'email123@gmail.com',
        dateCreated: '12/01/19',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: () => <Dropdown overlay={menu} placement="bottomCenter">
        <EllipsisOutlined rotate={90} />
      </Dropdown>
        
      },
  ];
  
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://google.com/">
          Edit
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://google.com/">
          Deactivate
        </a>
      </Menu.Item>
    </Menu>
  );

  
export const ManagementScreen: FunctionComponent = () => {
    return <Table dataSource={dataSource} columns={columns} />;
}