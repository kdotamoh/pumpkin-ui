import React from 'react';
import {connect} from 'react-redux';
import ManagementComponent from './Management';
import {Input, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {
    activeIconSVG,
    deactivatedIconSVG,
} from '../../../assets/svg/active-icon';
import {
    getEmployees,
    inviteEmployee,
    deleteEmployee,
    searchEmployees,
    setCurrentEmployee,
} from '../../store/actions/employee-actions';
import PropTypes from 'prop-types';

const columns = [
    {
        title: 'Employee ID',
        dataIndex: 'employeeId',
        key: 'employeeId',
    },
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

export class EmployeeManagementComponent extends React.Component {
    componentDidMount() {
        this.props.getEmployees(this.state.currentPage); // TODO: move to root
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            employeeId: '',
            currentPage: 1
        };
    }

    render() {
        return (
            <ManagementComponent
                headerTitle="LIST OF EMPLOYEES"
                columnDefs={columns}
                data={this.props.data}
                newEntityName="EMPLOYEE"
                onAddNewEntity={(callback) => this.onAddNewEmployee(callback)}
                onCancelAddEntity={(callback) => this.onCancelAddEmployee(callback)}
                entityContent={this.addNewEmployeeContent()}
                onSearch={this.onSearchEmployees}
                onDelete={this.showDeleteConfirmationModal}
                setCurrentEntity={this.props.setCurrentEmployee}
                currentPage={this.state.currentPage}
                total={this.props.totalEmployees}
                onPaginationChanged={this.onPaginationChanged}
            />
        );
    }

    onPaginationChanged = (currentPage) => {
        this.setState({currentPage});
        this.props.getEmployees(currentPage);
    }

    addNewEmployeeContent() {
        return (
            <div>
                <Input
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e) => this.handleInput(e, 'email')}
                />
                <Input
                    placeholder="Employee ID"
                    value={this.state.employeeId}
                    onChange={(e) => this.handleInput(e, 'employeeId')}
                />
            </div>
        );
    }

    handleInput = (event, name) => {
        const {value} = event.target;
        this.setState({
            [name]: value,
        });
    };

    onAddNewEmployee = (callback) => {
        this.props.inviteEmployee(this.state.email, this.state.employeeId);
        this.setState({
            email: '',
            employeeId: '',
        });
        callback();
    };

    onCancelAddEmployee = (callback) => {
        this.setState({
            email: '',
            employeeId: '',
        });
        callback();
    };

    onSearchEmployees = async (searchKey) => {
        this.props.searchEmployees(searchKey);
    };
    showDeleteConfirmationModal = (record) => {
        const {confirm} = Modal;
        confirm({
            title: 'Are you sure you want to remove this employee?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Caution: This cannot be undone.',
            okText: 'Remove',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => this.props.deleteEmployee(record.email),
            centered: true,
        });
    };
}

EmployeeManagementComponent.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    inviteEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired, //  TODO: make arrayOf
    searchEmployees: PropTypes.func.isRequired,
    setCurrentEmployee: PropTypes.func,
    totalEmployees: PropTypes.number
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
    data: state.employees.available,
    totalEmployees: state.employees.total
});
const mapDispatchToProps = (dispatch) => ({
    getEmployees: (currentPage) => dispatch(getEmployees(currentPage - 1)),
    inviteEmployee: (email, employeeId) =>
        dispatch(inviteEmployee(email, employeeId)),
    deleteEmployee: (email) => dispatch(deleteEmployee(email)),
    searchEmployees: (searchKey) => dispatch(searchEmployees(searchKey)),
    setCurrentEmployee: (record) => dispatch(setCurrentEmployee(record)),
});

/**
 * The connected EmployeeManagementComponent
 */
export const EmployeeManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeManagementComponent);
