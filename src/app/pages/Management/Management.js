import * as React from 'react';
import { Table, Dropdown, Menu, Button, Input, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export class ManagementComponent extends React.Component {
  constructor(props) {
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
            <Button
              type="primary"
              shape="round"
              onClick={this.onClickAddNewEntity}
            >
              ADD NEW
            </Button>
            <Input
              className="management-component__search"
              placeholder="Search by name"
              value={this.state.searchValue}
              onChange={(e) => this.props.onSearch(e.target.value)}
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
              render: (text, record) => (
                <Dropdown overlay={this.menu(record)} placement="bottomCenter">
                  <EllipsisOutlined rotate={90} />
                </Dropdown>
              ),
            },
          ])}
        />
        <Modal
          title={`ADD NEW ${this.props.newEntityName}`}
          visible={this.state.visible}
          onOk={() =>
            this.props.onAddNewEntity(() => this.setState({ visible: false }))
          }
          onCancel={this.onCancelAddEntity}
        >
          {this.props.newEntityContent}
        </Modal>
      </div>
    );
  }
  onClickAddNewEntity = () => {
    this.setState({
      visible: true,
    });
  };
  onCancelAddEntity = () => {
    this.props.onCancelAddEntity(() => this.setState({ visible: false }));
  };
  menu(record) {
    return (
      <Menu>
        <Menu.Item onClick={() => this.props.onDeactivate(record)}>
          Deactivate
        </Menu.Item>
      </Menu>
    );
  }
}

ManagementComponent.propTypes = {
  onAddNewEntity: PropTypes.func.isRequired,
  onCancelAddEntity: PropTypes.func.isRequired,
  newEntityName: PropTypes.string.isRequired,
  headerTitle: PropTypes.string.isRequired,
  columnDefs: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  newEntityContent: PropTypes.element.isRequired,
  onSearch: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
};
