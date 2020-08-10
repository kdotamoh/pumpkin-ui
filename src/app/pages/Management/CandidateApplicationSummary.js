import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {getCandidateApplicationSummary} from "../../store/actions/candidate-application-actions";
import "../../../style/candidate-application-summary.css";
import { Tabs} from "antd";
import CandidateApplicationDetails from "./Components/CandidateApplicationDetails";
import CandidateApplicationEssays from "./Components/CandidateApplicationEssays";
import CandidateApplicationDocuments from "./Components/CandidateApplicationDocuments";
import CandidateApplicationReviews from "./Components/CandidateApplicationReviews";

const {TabPane} = Tabs;

export class CandidateApplicationSummaryComponent extends React.Component {

    componentDidMount() {
        this.props.getCandidateApplicationSummary(this.props.match.params.reference);
    }

    constructor(props) {
        super(props);
    }

    render() {
        const headerTitle = this.getTitle();
        const isSuperAdmin = this.props.user.roles.includes('SUPER_ADMIN');
        const isAdmin = this.props.user.roles.includes('ADMIN');
        const {candidateApplicationSummary} = this.props;
        const applicationReference = this.props.match.params.reference;

        return (
            <div className="management-component__container candidate_application_container">
                <div className="management-component__header" style={{paddingLeft: "0px"}}>
                    <div style={{display: 'flex'}}>
                        <ArrowLeftOutlined
                            style={{marginRight: 24, marginTop: 4}}
                            onClick={() => this.props.history.goBack()}/>
                        <h4 className="management-component__h4">{headerTitle}</h4>
                    </div>
                </div>

                <Tabs type="card" className="tab-container">
                    <TabPane tab="Application Details" key="1">
                        <CandidateApplicationDetails candidateApplicationSummary={candidateApplicationSummary}/>
                    </TabPane>
                    <TabPane tab="Essays" key="2">
                        <CandidateApplicationEssays candidateApplicationSummary={candidateApplicationSummary}/>
                    </TabPane>

                    <TabPane tab="Uploaded Documents" key="3">
                        <CandidateApplicationDocuments
                            candidateApplicationSummary={candidateApplicationSummary}
                            applicationReference={applicationReference}/>
                    </TabPane>
                    {(isSuperAdmin || isAdmin) && <TabPane tab="Reviews" key="4">
                        <CandidateApplicationReviews candidateApplicationSummary={candidateApplicationSummary}/>
                    </TabPane>}
                </Tabs>
            </div>

        );
    }

    getTitle = () => {
        let title = 'APPLICANT';
        const {currentCandidate, candidateApplicationSummary} = this.props;
        if (currentCandidate && currentCandidate.firstName && currentCandidate.lastName) {
            const {firstName, lastName} = currentCandidate;
            title += ' - ' + firstName + ' ' + lastName;
        } else if (candidateApplicationSummary && candidateApplicationSummary.firstName && candidateApplicationSummary.lastName) {
            const {firstName, lastName} = candidateApplicationSummary;
            title += ' - ' + firstName + ' ' + lastName;
        }
        return title;
    };

}

CandidateApplicationSummaryComponent.propTypes = {
    getCandidateApplicationSummary: PropTypes.func.isRequired,
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
    currentCandidate: state.candidateApplications.current,
    candidateApplicationSummary: state.candidateApplications.candidateApplicationSummary,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    getCandidateApplicationSummary: (reference) => dispatch(getCandidateApplicationSummary(reference)),
});

/**
 * The connected CandidateApplicationSummaryManagement
 */
export const CandidateApplicationSummary = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CandidateApplicationSummaryComponent));
