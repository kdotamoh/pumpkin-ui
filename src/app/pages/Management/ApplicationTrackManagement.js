import ManagementComponent from './Management';
import React from 'react';
import { Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getTracks,
  createTrack,
  deleteTrack,
  updateTrack,
  setCurrentTrack,
} from 'app/store/actions/track-actions';

const columns = [
  {
    title: 'Track',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

export class ApplicationTrackManagementComponent extends React.Component {
  componentDidMount() {
    this.props.getTracks(this.state.currentPage); // TODO: move to root
  }
  constructor(props) {
    super(props);
    this.state = {
      name: props.currentTrack ? props.currentTrack.name : '',
      currentPage: 1
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.currentTrack &&
      this.props.currentTrack !== prevProps.currentTrack
    ) {
      this.setState({
        name: this.props.currentTrack.name,
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <ManagementComponent
          headerTitle="APPLICATION TRACKS"
          columnDefs={columns}
          data={this.props.data}
          newEntityName="TRACK"
          onAddNewEntity={this.onAddNewTrack}
          onCancelAddEntity={this.onCancelAddTrack}
          entityContent={this.addNewTrackContent()}
          onDelete={this.showDeleteConfirmationModal}
          onEditEntity={this.onEditTrack}
          setCurrentEntity={this.props.setCurrentTrack}
          currentPage={this.state.currentPage}
          total={this.props.totalTracks}
          onPaginationChanged={this.onPaginationChanged}
        />
      </React.Fragment>
    );
  }
  onPaginationChanged = (currentPage) => {
    this.setState({currentPage});
    this.props.getTracks(currentPage);
  }
  addNewTrackContent = () => {
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
  onAddNewTrack = (callback) => {
    this.props.createTrack(this.state.name);
    this.setState({
      name: '',
    });
    callback();
  };
  onEditTrack = (callback) => {
    this.props.updateTrack(this.state.name, this.props.currentTrack.code);
    this.setState({
      name: '',
    });
    callback();
  };

  onCancelAddTrack = (callback) => {
    this.setState({
      name: '',
    });
    callback();
  };
  showDeleteConfirmationModal = (record) => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure you want to remove this track?',
      icon: <ExclamationCircleOutlined />,
      content: 'Caution: This cannot be undone.',
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => this.props.deleteTrack(record.code),
      centered: true,
    });
  };
}
ApplicationTrackManagementComponent.propTypes = {
  getTracks: PropTypes.func.isRequired,
  createTrack: PropTypes.func.isRequired,
  deleteTrack: PropTypes.func.isRequired,
  updateTrack: PropTypes.func.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
  currentTrack: PropTypes.object,
  totalTracks: PropTypes.number,
  data: PropTypes.array.isRequired, //  TODO: make arrayOf
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  data: state.tracks.available,
  totalTracks: state.tracks.total,
  currentTrack: state.tracks.current,
});
const mapDispatchToProps = (dispatch) => ({
  getTracks: (currentPage) => dispatch(getTracks(currentPage -1)),
  createTrack: (name) => dispatch(createTrack(name)),
  deleteTrack: (code) => dispatch(deleteTrack(code)),
  updateTrack: (name, code) => dispatch(updateTrack(name, code)),
  setCurrentTrack: (record) => dispatch(setCurrentTrack(record)),
});

/**
 * The connected ApplicationTrackManagementComponent
 */
export const ApplicationTrackManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationTrackManagementComponent);
