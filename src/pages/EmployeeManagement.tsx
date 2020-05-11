import { ManagementComponent } from './Management';
import React from 'react';
import { ManagementColumnDefinitions } from 'state';
import { employeeMockDataSource } from 'mockdata';
import { Input } from 'antd';

const columns: ManagementColumnDefinitions[] = [
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
];
export interface EmployeeManagementState {
  visible: boolean;
}
export class EmployeeManagement extends React.Component<
  {},
  EmployeeManagementState
> {
  render() {
    return (
      <ManagementComponent
        headerTitle="LIST OF EMPLOYEES"
        columnDefs={columns}
        data={employeeMockDataSource}
        newEntityName="EMPLOYEE"
        onAddNewEntity={this.onAddNewEmployee}
        newEntityContent={this.addNewEmployeeContent()}
      />
    );
  }
  private addNewEmployeeContent = () => {
    return (
      <div>
        <Input placeholder="Email" />
        <Input placeholder="Full Name" />
      </div>
    );
  };
  private onAddNewEmployee = () => {
    console.log('added');
  };
}
