import React from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import ManagementComponent from './Management';
import {
  getCycles,
  createCycle,
  deleteCycle,
  updateCycle,
  deactivateCycle,
  reactivateCycle,
  setCurrentCycle,
} from 'app/store/actions/cycle-actions';

import { activeIconSVG, deactivatedIconSVG } from 'assets/svg/active-icon';

const columns = [
  {
    title: 'Cycles',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
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

export class RecruitmentCycleManagementComponent extends React.Component {
  state = {
    name: this.props.currentCycle ? this.props.currentCycle.name : '',
    currentPage: 1
  };
  componentDidMount() {
    this.props.getCycles(this.state.currentPage);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.currentCycle &&
      this.props.currentCycle !== prevProps.currentCycle
    ) {
      this.setState({
        name: this.props.currentCycle.name,
      });
    }
  }
  render() {
    return (
      <ManagementComponent
        headerTitle="RECRUITMENT CYCLES"
        columnDefs={columns}
        data={this.props.data}
        newEntityName="CYCLE"
        onAddNewEntity={this.onAddNewCycle}
        onCancelAddEntity={this.onCancelAddCycle}
        entityContent={this.addNewCycleContent()}
        onDelete={this.showDeleteConfirmationModal}
        onEditEntity={this.onEditCycle}
        onActivateEntity={this.onActivateCycle}
        onDeactivateEntity={this.onDeactivateCycle}
        setCurrentEntity={this.props.setCurrentCycle}
        willNavigate={true}
        navigateTo="/cycles/new"
        currentPage={this.state.currentPage}
        total={this.props.totalAlumni}
        onPaginationChanged={this.onPaginationChanged}
      />
    );
  }
  onPaginationChanged = (currentPage) => {
    this.setState({currentPage});
    this.props.getCycles( currentPage);
  }
  addNewCycleContent = () => {
    return (
      <Input
        placeholder="Name"
        value={this.state.name}
        onChange={(e) => this.handleInput(e, 'name')}
      />
    );
  };
  handleInput = (event, name) => {
    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  onAddNewCycle = (callback) => {
    this.props.createCycle(this.state.name);
    this.setState({
      name: '',
    });
    callback();
  };
  onEditCycle = (record) => {
    // this.props.updateCycle(this.state.name, this.props.currentCycle.code);
    // this.setState({
    //   name: '',
    // });
    this.props.history.push(`/cycles/update/${record.code}`);
    // callback();
  };
  onActivateCycle = async (record) => {
    await this.props.reactivateCycle(record.code);
    this.componentDidMount();
    // callback();
  };
  onDeactivateCycle = async (record) => {
    await this.props.deactivateCycle(record.code);
    this.componentDidMount();
    // callback();
  };
  onCancelAddCycle = (callback) => {
    this.setState({
      name: '',
    });
    callback();
  };
  showDeleteConfirmationModal = (record) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure you want to remove this cycle?',
      icon: <ExclamationCircleOutlined />,
      content: 'Caution: This cannot be undone.',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => this.props.deleteCycle(record.code),
      centered: true,
    });
  };
}
RecruitmentCycleManagementComponent.propTypes = {
  getCycles: PropTypes.func.isRequired,
  createCycle: PropTypes.func.isRequired,
  deleteCycle: PropTypes.func.isRequired,
  updateCycle: PropTypes.func.isRequired,
  deactivateCycle: PropTypes.func.isRequired,
  reactivateCycle: PropTypes.func.isRequired,
  setCurrentCycle: PropTypes.func.isRequired,
  currentCycle: PropTypes.object,
  data: PropTypes.array.isRequired,
  history: PropTypes.object,
  totalCycles: PropTypes.number
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  data: state.cycles.available,
  currentCycle: state.cycles.current,
  totalCycles: state.cycles.total
});
const mapDispatchToProps = (dispatch) => ({
  getCycles: (currentPage) => dispatch(getCycles(currentPage - 1)),
  createCycle: (name) => dispatch(createCycle(name)),
  deleteCycle: (code) => dispatch(deleteCycle(code)),
  updateCycle: (name, code) => dispatch(updateCycle(name, code)),
  deactivateCycle: (code) => dispatch(deactivateCycle(code)),
  reactivateCycle: (code) => dispatch(reactivateCycle(code)),
  setCurrentCycle: (record) => dispatch(setCurrentCycle(record)),
});

/**
 * The connected RecruitmentCycleManagementComponent
 */
export const RecruitmentCycleManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitmentCycleManagementComponent);
