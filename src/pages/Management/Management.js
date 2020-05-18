import * as React from 'react';
import { Table, Dropdown, Menu, Button, Input, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { inviteEmployee } from 'api/employee-management';
// import { ManagementColumnDefinitions } from 'state';

// export interface ManagementComponentProps {
//   headerTitle: string;
//   newEntityName: string;
//   onAddNewEntity: () => void;
//   newEntityContent: JSX.Element;
//   columnDefs: ManagementColumnDefinitions[];
//   data: any[];
// }
// export interface ManagementComponentState {
//   visible: boolean;
//   email: string;
//   employeeId: string;
// }
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://google.com/">
        Edit
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener s noreferrer" href="http://google.com/">
        Deactivate
      </a>
    </Menu.Item>
  </Menu>
);

export class ManagementComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      email: '',
      employeeId: '',
    };
  }

  render() {
    return (
      <div className="management-component__container">
        <div className="management-component__header">
          <h4 className="management-component__h4">{this.props.headerTitle}</h4>
          <div className="management-component__actions">
            {/* uncomment me */}
            <Button
              type="primary"
              // shape="round"
              onClick={this.onClickAddNewEntity}
            >
              ADD NEW
            </Button>
            <Input
              className="management-component__search"
              placeholder="Search by name"
            />
          </div>
        </div>
        <Table
          dataSource={this.props.data}
          columns={this.props.columnDefs.concat([
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: () => (
                <Dropdown overlay={menu} placement="bottomCenter">
                  <EllipsisOutlined rotate={90} />
                </Dropdown>
              ),
            },
          ])}
        />
        <Modal
          title={`ADD NEW ${this.props.newEntityName}`}
          visible={this.state.visible}
          onOk={() => this.onAddNewEntity(this.props.newEntityName)}
          onCancel={this.onCancelAddEntity}
        >
          <Input
            placeholder="Email"
            onChange={(event) => this.handleInput(event)}
            name="email"
          />
          <Input
            placeholder="Full Name"
            onChange={(event) => this.handleInput(event)}
            name="employeeId"
          />
        </Modal>
      </div>
    );
  }
  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  onClickAddNewEntity = () => {
    this.setState({
      visible: true,
    });
  };
  onCancelAddEntity = () => {
    this.setState({
      visible: false,
    });
  };
  onAddNewEntity = (entityName) => {
    const data = { email: this.state.email, employeeId: this.state.employeeId };
    if (entityName === 'EMPLOYEE') {
      inviteEmployee(data);
    }
    if (entityName === 'ALUMNI') {
      console.log(this.state);
    }
  };
}
