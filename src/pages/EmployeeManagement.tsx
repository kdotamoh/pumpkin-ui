import { ManagementComponent } from './Management';
import React from 'react';
import { ManagementColumnDefinitions } from 'state';
import { employeeMockDataSource } from 'mockdata';

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
        newEntityContent={<p>New Contetn</p>}
      />
    );
  }
  private onAddNewEmployee = () => {
    console.log('added');
  };
}
