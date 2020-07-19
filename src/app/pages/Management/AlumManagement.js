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
  getAlumni,
  inviteAlum,
  deleteAlum,
  searchAlumni,
  setCurrentAlum,
} from 'app/store/actions/alum-actions';

const columns = [
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
    title: 'SEO Year',
    dataIndex: 'seoGraduationYear',
    key: 'seoGraduationYear',
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

export class AlumManagementComponent extends React.Component {
  componentDidMount() {
    this.props.getAlumni(); // TODO: move to root
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      seoGraduationYear: '',
    };
  }
  render() {
    return (
      <React.Fragment>
        <ManagementComponent
          headerTitle="LIST OF ALUMNI"
          columnDefs={columns}
          data={this.props.data}
          newEntityName="ALUMNUS"
          onAddNewEntity={this.onAddNewAlum}
          onCancelAddEntity={this.onCancelAddAlum}
          entityContent={this.addNewAlumniContent()}
          onSearch={this.onSearchAlumni}
          onDelete={this.showDeleteConfirmationModal}
          setCurrentEntity={this.props.setCurrentAlum}
        />
      </React.Fragment>
    );
  }
  addNewAlumniContent() {
    return (
      <div>
        <div>
          <Input
            placeholder="Email Address"
            value={this.state.email}
            onChange={(e) => this.handleInput(e, 'email')}
          />
          <Input
            placeholder="SEO Year"
            value={this.state.seoGraduationYear}
            onChange={(e) => this.handleInput(e, 'seoGraduationYear')}
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
  onAddNewAlum = (callback) => {
    this.props.inviteAlum(this.state.email, this.state.seoGraduationYear);
    this.setState({
      email: '',
      seoGraduationYear: '',
    });
    callback();
  };

  onCancelAddAlum = (callback) => {
    this.setState({
      email: '',
      seoGraduationYear: '',
    });
    callback();
  };
  onSearchAlumni = (searchKey) => {
    this.props.searchAlumni(searchKey);
  };
  showDeleteConfirmationModal = (record) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure you want to remove this alumni?',
      icon: <ExclamationCircleOutlined />,
      content: 'Caution: This cannot be undone.',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => this.props.deleteAlum(record.email),
      centered: true,
    });
  };
}
AlumManagementComponent.propTypes = {
  getAlumni: PropTypes.func.isRequired,
  inviteAlum: PropTypes.func.isRequired,
  deleteAlum: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired, //  TODO: make arrayOf
  searchAlumni: PropTypes.func.isRequired,
  setCurrentAlum: PropTypes.func,
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  data: state.alumni.available,
});
const mapDispatchToProps = (dispatch) => ({
  getAlumni: () => dispatch(getAlumni()),
  inviteAlum: (email, seoGraduationYear) =>
    dispatch(inviteAlum(email, seoGraduationYear)),
  deleteAlum: (email) => dispatch(deleteAlum(email)),
  searchAlumni: (searchKey) => dispatch(searchAlumni(searchKey)),
  setCurrentAlum: (record) => dispatch(setCurrentAlum(record)),
});

/**
 * The connected AlumManagementComponent
 */
export const AlumManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlumManagementComponent);
