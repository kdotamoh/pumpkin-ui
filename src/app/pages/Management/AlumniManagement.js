import { ManagementComponent } from './Management';
import React from 'react';
import { Input, Modal } from 'antd';
import {
  activeIconSVG,
  deactivatedIconSVG,
} from '../../../assets/svg/active-icon';
import {
  getAlumni,
  inviteAlum,
  searchAlum,
  deleteAlum,
} from '../../../api/user-management/alum';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
    title: 'SEO Graduation Year',
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

export class AlumniManagement extends React.Component {
  componentDidMount() {
    this.getAlumni().then((res) => {
      this.setState({
        data: res,
      });
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
          data={this.state.data}
          newEntityName="ALUMNUS"
          onAddNewEntity={this.onAddNewAlum}
          onCancelAddEntity={this.onCancelAddAlum}
          newEntityContent={this.addNewAlumniContent()}
          onSearch={this.onSearchAlumni}
          onDeactivate={this.showDeactivateConfirmationModal}
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
            placeholder="SEO Graduation Year"
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
  async getAlumni() {
    const alumni = await getAlumni();
    return alumni.content;
  }
  onAddNewAlum = async (callback) => {
    await inviteAlum(this.state.email, this.state.seoGraduationYear);
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
  onSearchAlumni = async (searchKey) => {
    const filteredAlumni = await searchAlum(searchKey);
    const alumniContent = filteredAlumni.content;
    this.setState({
      data: alumniContent,
    });
  };
  showDeactivateConfirmationModal(record) {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure you want to deactivate this alumni?',
      icon: <ExclamationCircleOutlined />,
      content: 'Caution: This cannot be undone.',
      okText: 'Deactivate',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => await deleteAlum(record.email),
      centered: true,
    });
  }
}
