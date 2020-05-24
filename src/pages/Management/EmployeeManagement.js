import { ManagementComponent } from './Management';
import React from 'react';
// import { ManagementColumnDefinitions } from 'state';
import { employeeMockDataSource } from 'mockdata';

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
];

export class EmployeeManagement extends React.Component {
  render() {
    return (
      <ManagementComponent
        headerTitle="LIST OF EMPLOYEES"
        columnDefs={columns}
        data={employeeMockDataSource}
        newEntityName="EMPLOYEE"
        // onAddNewEntity={this.onAddNewEmployee}
        // newEntityContent={this.addNewEmployeeContent()}
      />
    );
  }
  // addNewEmployeeContent = () => {
  //   return (
  //     <div>
  //       <Input
  //         placeholder="Email"
  //         name="email"
  //         onChange={(event) => this.handleInput(event)}
  //       />
  //       <Input
  //         placeholder="Full Name"
  //         name="employeeID"
  //         onChange={(event) => this.handleInput(event)}
  //       />
  //     </div>
  //   );
  // };
  // handleInput = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };
  // onAddNewEmployee = () => {
  //   console.log('added');
  //   // inviteEmployee({});
  // };
}
