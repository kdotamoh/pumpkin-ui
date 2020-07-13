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
  getUniversities,
  createUniversity,
  deleteUniversity,
  updateUniversity,
  setCurrentUniversity,
} from 'app/store/actions/university-actions';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
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

export class UniversitySetupManagementComponent extends React.Component {
  componentDidMount() {
    this.props.getUniversities(); // TODO: move to root
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country: '',
    };
  }
  render() {
    return (
      <React.Fragment>
        <ManagementComponent
          headerTitle="LIST OF UNIVERSITIES"
          columnDefs={columns}
          data={this.props.data}
          newEntityName="UNIVERSITY"
          onAddNewEntity={this.onAddNewUniversity}
          onCancelAddEntity={this.onCancelAddUniversity}
          entityContent={this.addNewUniversityContent()}
          onSearch={this.onSearchUniversity}
          onDelete={this.showDeleteConfirmationModal}
          setCurrentEntity={this.props.setCurrentUniversity}
        />
      </React.Fragment>
    );
  }
  addNewUniversityContent() {
    return (
      <div>
        <div>
          <Input
            placeholder="Name"
            value={this.state.name}
            onChange={(e) => this.handleInput(e, 'name')}
          />
          <select
            className="login-form__input"
            style={{ width: '100%' }}
            onChange={(e) => this.handleInput(e, 'country')}
            value={this.state.country}
          >
            <option value="" disabled>
              Select country
            </option>
            <option value="GHANA">Ghana</option>
            <option value="KENYA">Kenya</option>
            <option value="NIGERIA">Nigeria</option>
          </select>
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
  onAddNewUniversity = (callback) => {
    this.props.createUniversity(this.state.name, this.state.country);
    this.setState({
      name: '',
      country: '',
    });
    callback();
  };

  onCancelAddUniversity = (callback) => {
    this.setState({
      name: '',
      country: '',
    });
    callback();
  };
  // onSearchUniversity = (searchKey) => {
  //   this.props.searchUniversity(searchKey);
  // };
  showDeleteConfirmationModal = (record) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure you want to remove this university?',
      icon: <ExclamationCircleOutlined />,
      content: 'Caution: This cannot be undone.',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => this.props.deleteUniversity(record.code),
      centered: true,
    });
  };
}
UniversitySetupManagementComponent.propTypes = {
  getUniversities: PropTypes.func.isRequired,
  createUniversity: PropTypes.func.isRequired,
  deleteUniversity: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired, //  TODO: make arrayOf
  // searchUniversity: PropTypes.func.isRequired,
  setCurrentUniversity: PropTypes.func,
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  data: state.universities.available,
});
const mapDispatchToProps = (dispatch) => ({
  getUniversities: () => dispatch(getUniversities()),
  createUniversity: (name, country) =>
    dispatch(createUniversity(name, country)),
  deleteUniversity: (code) => dispatch(deleteUniversity(code)),
  updateUniversity: (name, code) => dispatch(updateUniversity(name, code)),
  setCurrentUniversity: (record) => dispatch(setCurrentUniversity(record)),
});

export const UniversitySetupManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(UniversitySetupManagementComponent);
