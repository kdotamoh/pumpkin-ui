import { ManagementComponent } from './Management';
import React from 'react';
import { ManagementColumnDefinitions } from 'state';
import { alumniMockDataSource } from 'mockdata';
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
    title: 'Institution',
    dataIndex: 'institution',
    key: 'institution',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

export interface AlumniManagementState {
  visible: boolean;
}

export class AlumniManagement extends React.Component<
  {},
  AlumniManagementState
> {
  render() {
    return (
      <ManagementComponent
        headerTitle="LIST OF ALUMNI"
        columnDefs={columns}
        data={alumniMockDataSource}
        newEntityName="ALUMNUS"
        onAddNewEntity={this.onAddNewAlumni}
        newEntityContent={this.addNewAlumniContent()}
      />
    );
  }
  private addNewAlumniContent = () => {
    return (
      <div>
        <Input placeholder="Email" />
        <Input placeholder="Full Name" />
        <Input placeholder="Institution" />
      </div>
    );
  };
  private onAddNewAlumni = () => {
    console.log('added');
  };
}
