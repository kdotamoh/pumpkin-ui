import ManagementComponent from './Management';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    getCandidates, setCurrentCandidate
} from 'app/store/actions/candidate-application-actions';
import {Link} from "react-router-dom";

export class CandidateApplicationManagementComponent extends React.Component {

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
        },
        {
            title: 'Track (First Choice)',
            dataIndex: 'firstChoice',
            key: 'firstChoice',
        },
        {
            title: 'Current Stage',
            dataIndex: 'currentStage',
            key: 'currentStag',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                if (status === 'ACTIVE') {
                    return <div style={{color: 'green'}}>Active</div>;
                }
                return <div style={{color: 'grey'}}>Inactive</div>;
            },
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            render: (text, record) => (
                <Link to={`/application-summary/${record.reference}`}
                      onClick={() => this.props.setCurrentCandidate(record)}>
                    View candidate
                </Link>),
        }
    ];

    componentDidMount() {
        this.props.getCandidates();
        this.props.setCurrentCandidate({});
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
                    headerTitle="LIST OF CANDIDATES"
                    columnDefs={this.columns}
                    data={this.props.data}
                    newEntityName="CANDIDATES"
                    setCurrentEntity={this.props.setCurrentCandidate}
                    // subHeaderView={this.subHeaderView()}
                />
            </React.Fragment>
        );
    }
}

CandidateApplicationManagementComponent.propTypes = {
    getCandidates: PropTypes.func.isRequired,
    setCurrentCandidate: PropTypes.func.isRequired
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
    data: state.candidateApplications.available,
})

const mapDispatchToProps = (dispatch) => ({
    getCandidates: () => dispatch(getCandidates()),
    setCurrentCandidate: (candidate) => dispatch(setCurrentCandidate(candidate))
});

export const CandidateApplicationManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(CandidateApplicationManagementComponent);
