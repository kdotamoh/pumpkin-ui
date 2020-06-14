import React from 'react';
import { ManagementComponent } from './Management';
import { Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  getEmployees,
  inviteEmployee,
  searchEmployees,
  deleteEmployee,
} from '../../../api/user-management/employee';
import {
  activeIconSVG,
  deactivatedIconSVG,
} from '../../../assets/svg/active-icon';
const columns = [
  {
    title: 'Employee ID',
    dataIndex: 'employeeId',
    key: 'employeeId',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      if (status === 'ACTIVE') {
        return activeIconSVG;
      }
      return deactivatedIconSVG;
    },
  },
];

export class EmployeeManagement extends React.Component {
  componentDidMount() {
    this.setEmployeeData();
  }
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      email: '',
      employeeId: '',
    };
  }
  render() {
    return (
      <ManagementComponent
        headerTitle="LIST OF EMPLOYEES"
        columnDefs={columns}
        data={this.state.data}
        newEntityName="EMPLOYEE"
        onAddNewEntity={(callback) => this.onAddNewEmployee(callback)}
        onCancelAddEntity={(callback) => this.onCancelAddEmployee(callback)}
        newEntityContent={this.addNewEmployeeContent()}
        onSearch={this.onSearchEmployees}
        onDelete={this.showDeleteConfirmationModal}
      />
    );
  }
  addNewEmployeeContent() {
    return (
      <div>
        <Input
          placeholder="Email"
          value={this.state.email}
          onChange={(e) => this.handleInput(e, 'email')}
        />
        <Input
          placeholder="Employee ID"
          value={this.state.employeeID}
          onChange={(e) => this.handleInput(e, 'employeeId')}
        />
      </div>
    );
  }
  handleInput = (event, name) => {
    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  getEmployees = async () => {
    const employees = await getEmployees();
    return employees.content;
  };

  onAddNewEmployee = async (callback) => {
    await inviteEmployee(this.state.email, this.state.employeeId);
    this.setState({
      email: '',
      employeeID: '',
    });
    callback();
    this.setEmployeeData();
  };

  onCancelAddEmployee = (callback) => {
    this.setState({
      email: '',
      employeeID: '',
    });
    callback();
    this.setEmployeeData();
  };

  onSearchEmployees = async (searchKey) => {
    const filteredEmployees = await searchEmployees(searchKey);
    const employeesContent = filteredEmployees.content;
    this.setState({
      data: employeesContent,
    });
  };
  showDeleteConfirmationModal = (record) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure you want to remove this employee?',
      icon: <ExclamationCircleOutlined />,
      content: 'Caution: This cannot be undone.',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () =>
        await deleteEmployee(record.email).then(() => this.setEmployeeData()),
      centered: true,
    });
  };
  setEmployeeData() {
    this.getEmployees().then((res) => {
      this.setState({
        data: res,
      });
    });
  }
}
