import * as React from 'react';
import { Table, Dropdown, Menu, Button, Input, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
const ModalActions = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
};
export class ManagementComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      action: '',
    };
  }

  render() {
    return (
      <div className="management-component__container">
        <div className="management-component__header">
          <h4 className="management-component__h4">{this.props.headerTitle}</h4>
          <div className="management-component__actions">
            <Button
              type="primary"
              shape="round"
              onClick={() => this.onClickEntity(ModalActions.ADD)}
            >
              ADD NEW
            </Button>
            {this.props.onSearch && (
              <Input
                className="management-component__search"
                placeholder="Search by email address"
                value={this.state.searchValue}
                onChange={(e) => this.props.onSearch(e.target.value)}
              />
            )}
          </div>
        </div>
        <Table
          dataSource={this.props.data}
          columns={this.props.columnDefs.concat([
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              fixed: 'right',
              width: 100,
              render: (text, record) => (
                <Dropdown overlay={this.menu(record)} placement="bottomCenter">
                  <EllipsisOutlined rotate={90} />
                </Dropdown>
              ),
            },
          ])}
        />
        <Modal
          title={`${this.state.action} ${this.props.newEntityName}`}
          visible={this.state.visible}
          onOk={() =>
            this.state.action === ModalActions.ADD
              ? this.props.onAddNewEntity(() =>
                  this.setState({ visible: false })
                )
              : this.props.onEditEntity(() => this.setState({ visible: false }))
          }
          onCancel={this.onCancelAddEntity}
        >
          {this.props.entityContent}
        </Modal>
      </div>
    );
  }
  onClickEntity = (action) => {
    this.setState({
      visible: true,
      action: action,
    });
  };
  onCancelAddEntity = () => {
    this.props.onCancelAddEntity(() => this.setState({ visible: false }));
  };
  menu = (record) => {
    return (
      <Menu>
        {this.props.newEntityName === 'TRACK' && (
          <Menu.Item
            onClick={() => {
              this.props.setCurrentEntity(record);
              this.onClickEntity(ModalActions.UPDATE);
            }}
          >
            Edit
          </Menu.Item>
        )}
        <Menu.Item
          onClick={() => {
            this.props.setCurrentEntity(record);
            this.props.onDelete(record);
          }}
        >
          Remove
        </Menu.Item>
      </Menu>
    );
  };
}

ManagementComponent.propTypes = {
  onAddNewEntity: PropTypes.func.isRequired,
  onCancelAddEntity: PropTypes.func.isRequired,
  newEntityName: PropTypes.string.isRequired,
  headerTitle: PropTypes.string.isRequired,
  columnDefs: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  entityContent: PropTypes.element.isRequired,
  onSearch: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onEditEntity: PropTypes.func,
  setCurrentEntity: PropTypes.func.isRequired,
};