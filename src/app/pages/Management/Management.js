import * as React from 'react';
import { Table, Dropdown, Menu, Button, Input, Modal, Skeleton } from 'antd';
import { EllipsisOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ModalActions = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  ACTIVATE: 'ACTIVATE',
  DEACTIVATE: 'DEACTIVATE'
};

class ManagementComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      action: '',
      columnDefs: this.props.columnDefs
    };
  }

  componentDidMount() {
    if (
      this.state.columnDefs.filter((e) => e.dataIndex === 'actions').length ===
      0
    ) {
      this.setState({
        columnDefs: this.state.columnDefs.concat([
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
            )
          }
        ])
      });
    }
  }

  render() {
    return (
      <div className="management-component__container">
        <div className="management-component__header">
          <div style={{ display: 'flex' }}>
            {this.props.showShowBackButton && (
              <ArrowLeftOutlined
                style={{ marginRight: 24, marginTop: 4 }}
                onClick={() => this.props.history.goBack()}
              />
            )}
            <h4 className="management-component__h4">
              {this.props.headerTitle}
            </h4>
          </div>
          <div className="management-component__actions">
            {this.props.onAddNewEntity && (
              <Button
                type="primary"
                shape="round"
                onClick={() => this.onClickEntity(ModalActions.ADD)}
              >
                ADD NEW
              </Button>
            )}
            {this.props.onSearch && (
              <Input
                className="management-component__search"
                placeholder="Search by name/email"
                value={this.state.searchValue}
                onChange={(e) => this.props.onSearch(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="management-component__subheader">
          {this.props.subHeaderView}
        </div>
        {this.props.loading ?
          <Skeleton paragraph={{ rows: 7 }} /> :
          <Table
            dataSource={this.props.data}
            columns={this.state.columnDefs}
            pagination={{
              current: this.props.currentPage,
              total: this.props.total,
              pageSize: 10,
              showSizeChanger: false,
              onChange: this.props.onPaginationChanged
            }}
          />}


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
    this.props.willNavigate
      ? this.props.history.push(this.props.navigateTo)
      : this.setState({
        visible: true,
        action: action
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
        {this.props.newEntityName === 'CYCLE' && (
          <Menu.Item
            onClick={() => {
              this.props.onEditEntity(record);
            }}
          >
            Edit
          </Menu.Item>
        )}
        {record.status === 'INACTIVE' ? (
          <>
            {this.props.newEntityName !== 'EMPLOYEE' && (
              <Menu.Item
                style={{
                  cursor: 'pointer',
                  paddingLeft: '1.2rem',
                  paddingRight: '1.2rem'
                }}
                onClick={() => {
                  this.props.onActivateEntity(record);
                }}
              >
                Reactivate
              </Menu.Item>
            )}
          </>
        ) : (
          <>
            {this.props.newEntityName !== 'EMPLOYEE' && (
              <Menu.Item
                style={{
                  cursor: 'pointer',
                  paddingLeft: '1.2rem',
                  paddingRight: '1.2rem'
                }}
                onClick={() => {
                  this.props.onDeactivateEntity(record);
                }}
              >
                Deactivate
              </Menu.Item>
            )}
          </>
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
  onDeactivateEntity: PropTypes.func,
  onActivateEntity: PropTypes.func,
  newEntityName: PropTypes.string.isRequired,
  headerTitle: PropTypes.string.isRequired,
  columnDefs: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  entityContent: PropTypes.element,
  onSearch: PropTypes.func,
  onDelete: PropTypes.func,
  onEditEntity: PropTypes.func,
  setCurrentEntity: PropTypes.func,
  history: PropTypes.object,
  willNavigate: PropTypes.bool,
  navigateTo: PropTypes.string,
  subHeaderView: PropTypes.element,
  showShowBackButton: PropTypes.bool,
  currentPage: PropTypes.number,
  onPaginationChanged: PropTypes.func,
  total: PropTypes.number,
  loading: PropTypes.bool
};

export default withRouter(ManagementComponent);
