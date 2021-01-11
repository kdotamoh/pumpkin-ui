import ManagementComponent from './Management';
import React from 'react';
import { Input, Modal } from 'antd';
import {
  activeIconSVG,
  deactivatedIconSVG,
} from '../../../assets/svg/active-icon';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getMajors,
  createMajor,
  deleteMajor,
  updateMajor,
  setCurrentMajor,
} from 'app/store/actions/major-actions';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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

export class MajorManagementComponent extends React.Component {
  componentDidMount() {
    this.props.getMajors(this.state.currentPage); // TODO: move to root
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      seoGraduationYear: '',
      currentPage: 1,
    };
  }
  render() {
    const loading = !this.props.hasMajorsBeenLoaded;
    return (
      <React.Fragment>
        <ManagementComponent
          headerTitle="LIST OF MAJORS"
          columnDefs={columns}
          data={this.props.data}
          newEntityName="MAJOR"
          onAddNewEntity={this.onAddNewMajor}
          onCancelAddEntity={this.onCancelAddMajor}
          entityContent={this.addNewMajorContent()}
          onSearch={this.onSearchMajor}
          onDelete={this.showDeleteConfirmationModal}
          setCurrentEntity={this.props.setCurrentMajor}
          currentPage={this.state.currentPage}
          total={this.props.totalMajors}
          onPaginationChanged={this.onPaginationChanged}
          loading={loading}
        />
      </React.Fragment>
    );
  }
  onPaginationChanged = (currentPage) => {
    this.setState({currentPage});
    this.props.getMajors( currentPage);
  }
  addNewMajorContent() {
    return (
      <div>
        <div>
          <Input
            placeholder="Name"
            value={this.state.name}
            onChange={(e) => this.handleInput(e, 'name')}
          />
        </div>
      </div>
    );
  }
  handleInput = (event, name) => {
    const { value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  onAddNewMajor = (callback) => {
    this.props.createMajor(this.state.name);
    this.setState({
      name: '',
    });
    callback();
  };

  onCancelAddMajor = (callback) => {
    this.setState({
      name: '',
    });
    callback();
  };
  // onSearchAlumni = (searchKey) => {
  //   this.props.searchCountry(searchKey);
  // };
  showDeleteConfirmationModal = (record) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure you want to remove this major?',
      icon: <ExclamationCircleOutlined />,
      content: 'Caution: This cannot be undone.',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => this.props.deleteMajor(record.code),
      centered: true,
    });
  };
}
MajorManagementComponent.propTypes = {
  getMajors: PropTypes.func.isRequired,
  createMajor: PropTypes.func.isRequired,
  deleteMajor: PropTypes.func.isRequired,
  updateMajor: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired, //  TODO: make arrayOf
  setCurrentMajor: PropTypes.func,
  totalMajors: PropTypes.number
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  data: state.majors.available,
  totalMajors: state.majors.total,
  hasMajorsBeenLoaded: state.majors.hasMajorsBeenLoaded
});
const mapDispatchToProps = (dispatch) => ({
  getMajors: (currentPage) => dispatch(getMajors(currentPage - 1)),
  createMajor: (name) => dispatch(createMajor(name)),
  deleteMajor: (code) => dispatch(deleteMajor(code)),
  updateMajor: (name, code) => dispatch(updateMajor(name, code)),
  setCurrentMajor: (record) => dispatch(setCurrentMajor(record)),
});

export const MajorManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(MajorManagementComponent);
