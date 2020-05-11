import * as React from 'react';
import { Table, Dropdown, Menu, Button, Input, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { ManagementColumnDefinitions } from 'state';

export interface ManagementComponentProps {
  headerTitle: string;
  newEntityName: string;
  onAddNewEntity: () => void;
  newEntityContent: JSX.Element;
  columnDefs: ManagementColumnDefinitions[];
  data: any[];
}
export interface ManagementComponentState {
  visible: boolean;
}
export class ManagementComponent extends React.Component<
  ManagementComponentProps,
  ManagementComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    return (
      <div className="management-component__container">
        <div className="management-component__header">
          <h4 className="management-component__h4">{this.props.headerTitle}</h4>
          <div className="management-component__actions">
            <Button type="primary" onClick={this.onClickAddNewEntity}>
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
          onOk={this.props.onAddNewEntity}
          onCancel={this.onCancelAddEntity}
        >
          {this.props.newEntityContent}
        </Modal>
      </div>
    );
  }
  private onClickAddNewEntity = () => {
    this.setState({
      visible: true,
    });
  };
  private onCancelAddEntity = () => {
    this.setState({
      visible: false,
    });
  };
}

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
