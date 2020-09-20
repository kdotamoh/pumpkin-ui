import React from 'react';
import {connect} from 'react-redux';
import ManagementComponent from './Management';
import {getCycles} from 'app/store/actions/cycle-actions';
import PropTypes from 'prop-types';
import {
    getApplicationReviewers,
    searchApplicationReviewers,
    setCurrentApplicationReviewer,
} from 'app/store/actions/application-reviewer-actions';
import {getRecruitmentCycleReviewSummary} from 'app/store/actions/candidate-review-actions';
import {Select} from 'antd';
import {withRouter, Link} from 'react-router-dom';
import SummaryBadgeComponent from './SummaryBadgeComponent';
import {setCycleReference, setCyclesHaveBeenLoaded} from "../../store/actions/application-reviewer-actions";

export class ApplicationReviewerManagementComponent extends React.Component {
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            dataIndex: 'seoYear',
            key: 'seoYear',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            render: (text, record) => (
                <Link
                    to={`/application-review/${record.reviewerCode}`}
                    onClick={() => this.props.setCurrentApplicationReviewer(record)}
                >
                    View applicants
                </Link>
            ),
        },
    ];

    componentDidMount() {
        if (!this.props.hasReviewersBeenLoaded) {
            this.props.getCycles().then((data) => {
                if (data && this.props.recruitmentCycles.length > 0) {
                    this.onRecruitmentCycleSelected(this.props.recruitmentCycles[0].code);
                }
            });
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ManagementComponent
                headerTitle="LIST OF REVIEWERS"
                columnDefs={this.columns}
                data={this.props.data}
                newEntityName="REVIEWERS"
                onSearch={this.onSearchApplicationReviewers}
                setCurrentEntity={this.props.setCurrentApplicationReviewer}
                subHeaderView={this.subHeaderView()}
            />
        );
    }

    onSearchApplicationReviewers = async (searchKey) => {
        this.props.searchApplicationReviewers(this.props.cycleReference, searchKey);
    };

    onRecruitmentCycleSelected = (code) => {
        this.props.setCycleReference( code);
        this.props.setCyclesHaveBeenLoaded(true);
        this.props.getApplicationReviewers(code);
        this.props.getRecruitmentCycleReviewSummary(code);
    };

    subHeaderView = () => {
        let children = [];

        for (let i of this.props.recruitmentCycles) {
            children.push(<Select.Option key={i.code}>{i.name}</Select.Option>);
        }

        const showSummary =
            this.props.recruitmentCycleSummary.totalReviewers != undefined;
        const totalReviewers = this.props.recruitmentCycleSummary.totalReviewers;
        const pendingReviews = this.props.recruitmentCycleSummary
            .totalPendingReviews;
        const approvedReviews = this.props.recruitmentCycleSummary.totalApproved;
        return (
            <div style={{display: 'flex'}}>
                {this.props.cyclesHaveBeenLoaded && (
                    <div style={{marginRight: 16}}>
                        <p className="management-component__subheader_title">
                            Recruitment Cycle
                        </p>
                        <Select
                            defaultValue={this.props.cycleReference}
                            style={{width: 300}}
                            onSelect={this.onRecruitmentCycleSelected}
                        >
                            {children}
                        </Select>
                    </div>
                )}
                {showSummary && (
                    <div style={{marginLeft: 'auto'}}>
                        <p className="management-component__subheader_title">
                            Application Summary
                        </p>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <SummaryBadgeComponent
                                title="Total Reviewers"
                                count={totalReviewers}
                                type="primary"
                            />
                            <SummaryBadgeComponent
                                title="Total Approved"
                                count={approvedReviews}
                                type="success"
                            />
                            <SummaryBadgeComponent
                                title="Total Pending"
                                count={pendingReviews}
                                type="warning"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };
}

ApplicationReviewerManagementComponent.propTypes = {
    getCycles: PropTypes.func.isRequired,
    recruitmentCycles: PropTypes.array.isRequired,
    getApplicationReviewers: PropTypes.func.isRequired,
    getRecruitmentCycleReviewSummary: PropTypes.func.isRequired,
    recruitmentCycleSummary: PropTypes.object.isRequired,
    searchApplicationReviewers: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    setCurrentApplicationReviewer: PropTypes.func.isRequired,
    hasReviewersBeenLoaded: PropTypes.bool,
    cyclesHaveBeenLoaded: PropTypes.bool,
    setCyclesHaveBeenLoaded: PropTypes.func.isRequired
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
    recruitmentCycles: state.cycles.available,
    data: state.applicationReviewers.available,
    recruitmentCycleSummary:
    state.candidateApplicationReview.recruitmentCycleReviewSummary,
    hasReviewersBeenLoaded: state.applicationReviewers.hasReviewersBeenLoaded,
    cycleReference: state.applicationReviewers.cycleReference,
    cyclesHaveBeenLoaded: state.applicationReviewers.cyclesHaveBeenLoaded
});

const mapDispatchToProps = (dispatch) => ({
    getCycles: () => dispatch(getCycles()),
    getRecruitmentCycleReviewSummary: (cycleReference) =>
        dispatch(getRecruitmentCycleReviewSummary(cycleReference)),
    getApplicationReviewers: (cycleReference) =>
        dispatch(getApplicationReviewers(cycleReference)),
    searchApplicationReviewers: (cycleReference, searchKey) =>
        dispatch(searchApplicationReviewers(cycleReference, searchKey)),
    setCurrentApplicationReviewer: (reviewer) =>
        dispatch(setCurrentApplicationReviewer(reviewer)),
    setCycleReference: (cycleReference) => dispatch(setCycleReference(cycleReference)),
    setCyclesHaveBeenLoaded: (cyclesHaveBeenLoaded) =>
        dispatch(setCyclesHaveBeenLoaded(cyclesHaveBeenLoaded))
});

/**
 * The connected ApplicationReviewerManagement
 */
export const ApplicationReviewerManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ApplicationReviewerManagementComponent));
