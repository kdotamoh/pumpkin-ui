import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {
    getCandidateApplicationSummary,
    getRecruitmentCycleDetails,
    getReviewTypes
} from "../../store/actions/candidate-application-actions";
import "../../../style/candidate-application.css";
import {Tabs, Button, Modal, Select} from "antd";
import CandidateApplicationDetails from "./Components/CandidateApplicationDetails";
import CandidateApplicationEssays from "./Components/CandidateApplicationEssays";
import CandidateApplicationDocuments from "./Components/CandidateApplicationDocuments";
import CandidateApplicationReviews from "./Components/CandidateApplicationReviews";
import TextArea from "antd/es/input/TextArea";
import {addReview, makeFinalDecision} from "../../../api/candidate-application";


const {TabPane} = Tabs;

export class CandidateApplicationSummaryComponent extends React.Component {

    componentDidMount() {
        this.props.getCandidateApplicationSummary(this.props.match.params.reference).then(() => {
            this.setState({pageLoading: false});
            this.loadDetailsForReviewModal();
        })
    }

    loadDetailsForReviewModal = () => {
        const cycleReference = this.props.location.search.split("=")[1];
        this.setState({cycleReference})
        this.props.getReviewTypes();
        this.props.getRecruitmentCycleDetails(cycleReference);
    }

    constructor(props) {
        super(props);
        this.state = {
            pageLoading: true,
            modalVisible: false,
            alumReview: {
                remarks: '',
                reviewType: '',
                cycleStageCode: '',
                applicationReference: this.props.match.params.reference
            },
            seoRemark: '',
            cycleReference: ''
        }
    }

    onDropDownSelected = (code, target) => {
        let alumReview = {...this.state.alumReview};
        alumReview[target] = code;
        this.setState({alumReview});
    }

    // TODO: MAKE THIS REQUEST AT THE MIDDLEWARE
    onAddReview = async (decision) => {
        try {
            const alumReview = this.state.alumReview;
            alumReview['decision'] = decision;
            await addReview(alumReview).then();
        } catch (e) {

        } finally {

        }
    }

    onMakeSeoDecision = async (seoDecision) => {
        try {
            const request = {
                cycleStageCode: this.state.alumReview.cycleStageCode,
                seoRemarks: this.state.seoRemark,
                seoDecision
            }
            await makeFinalDecision(this.props.match.params.reference, request).then();
        } catch (e) {

        } finally {

        }
    }

    render() {
        const headerTitle = this.getTitle();
        const isSuperAdmin = this.props.user.roles.includes('SUPER_ADMIN');
        const isAdmin = this.props.user.roles.includes('ADMIN');
        const {candidateApplicationSummary} = this.props;
        const applicationReference = this.props.match.params.reference;
        const {pageLoading} = this.state;
        const adminActions = this.getAdminFinalDecisionActions();
        const alumniActions = this.getAlumReviewActions();

        return (
            <div>
                <div className="management-component__container candidate_application_container">
                    <div className="management-component__header" style={{paddingLeft: "0px"}}>
                        <div style={{display: 'flex'}}>
                            <ArrowLeftOutlined
                                style={{marginRight: 24, marginTop: 4}}
                                onClick={() => this.props.history.goBack()}/>
                            <h4 className="management-component__h4">{headerTitle}</h4>
                        </div>
                    </div>

                    <div className="management-component__header" style={{paddingLeft: "0px"}}>
                        <div className="displayed_reference_row">
                            <p>Reference - {this.props.match.params.reference}</p>
                            <Button onClick={() => this.setState({modalVisible: true})}
                                    className={`${isSuperAdmin || isAdmin ? 'green_bordered_button' : 'blue_bordered_button'}`}>
                                {(isSuperAdmin || isAdmin) ? "Make Final Decision" : "Review"}
                            </Button>
                        </div>
                    </div>

                    <Tabs type="card" className="tab-container">
                        <TabPane tab="Application Details" key="1">
                            <CandidateApplicationDetails
                                candidateApplicationSummary={candidateApplicationSummary}
                                pageLoading={pageLoading}/>
                        </TabPane>
                        <TabPane tab="Essays" key="2">
                            <CandidateApplicationEssays
                                candidateApplicationSummary={candidateApplicationSummary}
                                pageLoading={pageLoading}/>
                        </TabPane>

                        <TabPane tab="Uploaded Documents" key="3">
                            <CandidateApplicationDocuments
                                candidateApplicationSummary={candidateApplicationSummary}
                                applicationReference={applicationReference}
                                pageLoading={pageLoading}/>
                        </TabPane>

                        {(isSuperAdmin || isAdmin) && <TabPane tab="Reviews" key="4">
                            <CandidateApplicationReviews
                                candidateApplicationSummary={candidateApplicationSummary}
                                pageLoading={pageLoading}/>
                        </TabPane>}
                    </Tabs>
                </div>

                <Modal
                    visible={this.state.modalVisible}
                    title={(isAdmin || isSuperAdmin) ? "Final Decision" : "Add Review"}
                    onCancel={() => this.setState({modalVisible: false})}
                    footer={(isAdmin || isSuperAdmin) ? adminActions : alumniActions}
                >
                    {this.modalContent()}
                </Modal>
            </div>

        );
    }

    getAlumReviewActions = () => {
        return [
            <Button key="reject" className="red_bordered_button" onClick={() => this.onAddReview('NO')}>
                No
            </Button>,
            <Button key="maybe" className="orange_bordered_button" onClick={() => this.onAddReview('MAYBE')}>
                Maybe
            </Button>,
            <Button key="approve" className="green_bordered_button" onClick={() => this.onAddReview('YES')}>
                yes
            </Button>
        ];
    }

    getAdminFinalDecisionActions = () => {
        return [
            <Button key="reject" className="red_bordered_button" onClick={() => this.onMakeSeoDecision('REJECTED')}>
                Reject
            </Button>,
            <Button key="maybe" className="orange_bordered_button" onClick={() => this.onMakeSeoDecision('MAYBE')}>
                Maybe
            </Button>,
            <Button key="approve" className="green_bordered_button" onClick={() => this.onMakeSeoDecision('APPROVED')}>
                Approve
            </Button>
        ];
    }

    modalContent = () => {
        const isSuperAdmin = this.props.user.roles.includes('SUPER_ADMIN');
        const isAdmin = this.props.user.roles.includes('ADMIN');
        return <React.Fragment>
            {(isAdmin || isSuperAdmin) ?
                <div>
                    <p className="text-12">Considering <span style={{color: "blue"}}>ALL</span> reviews
                        give for this candidate's current stage, what is your final decision?</p>
                    <p className="text-10 text-red">Note: Your final decision would determine if this
                        applicant would be
                        moving to the next stage</p>
                    <div style={{marginBottom: "20px"}}>
                        <Select defaultValue="Select review type" style={{width: 200}}

                                onSelect={(code) => this.onDropDownSelected(code, 'reviewType')}>
                            {this.getDropdownChildren(this.props.reviewTypes)}
                        </Select>
                        <Select defaultValue="Select application stage" style={{width: 200, marginLeft: 40}}
                                onSelect={(code) => this.onDropDownSelected(code, 'cycleStageCode')}>
                            {this.getDropdownChildren(this.props.stages)}
                        </Select>
                    </div>
                    <TextArea value={this.state.seoRemark}
                              onChange={e => this.setState({seoRemark: e.target.value})}
                              placeholder="Remark"
                              rows={5}/>
                </div> :

                <div>
                    <div style={{marginBottom: "20px"}}>
                        <Select defaultValue="Select review type" style={{width: 200}}

                                onSelect={(code) => this.onDropDownSelected(code, 'reviewType')}>
                            {this.getDropdownChildren(this.props.reviewTypes)}
                        </Select>
                        <Select defaultValue="Select application stage" style={{width: 200, marginLeft: 40}}
                                onSelect={(code) => this.onDropDownSelected(code, 'cycleStageCode')}>
                            {this.getDropdownChildren(this.props.stages)}
                        </Select>
                    </div>

                    <TextArea value={this.state.alumReview.remarks}
                              onChange={e => {
                                  this.setState({alumReview: {...this.state.alumReview, remarks: e.target.value}})
                              }}
                              placeholder="Review"
                              rows={5}/>
                </div>
            }
        </React.Fragment>
    }

    getDropdownChildren = (data) => {
        let children = [];
        for (let i of data) {
            children.push(
                <Select.Option key={i.code}>
                    {i.name}
                </Select.Option>
            );
        }
        return children;
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

const ReviewModalContent = ({isAdmin, review, setState}) => {

    return (
        isAdmin ?
            <div>


            </div> :
            <div>
                <p className="text-12">Review candidate</p>


                <TextArea value={this.state.review}
                          onChange={e => this.setState({review: e.target.value})}
                          rows={5}/>
            </div>
    );
}


CandidateApplicationSummaryComponent.propTypes = {
    getCandidateApplicationSummary: PropTypes.func.isRequired,
    getReviewTypes: PropTypes.func.isRequired,
    getApplicationStages: PropTypes.func.isRequired,
    getRecruitmentCycleDetails: PropTypes.func.isRequired
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
    currentCandidate: state.candidateApplications.current,
    candidateApplicationSummary: state.candidateApplications.candidateApplicationSummary,
    reviewTypes: state.candidateApplications.reviewTypes,
    stages: state.candidateApplications.stages,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    getCandidateApplicationSummary: (reference) => dispatch(getCandidateApplicationSummary(reference)),
    getReviewTypes: () => dispatch(getReviewTypes()),
    getApplicationStages: () => dispatch(getReviewTypes()),
    getRecruitmentCycleDetails: (cycleReference) => dispatch(getRecruitmentCycleDetails(cycleReference))
});

/**
 * The connected CandidateApplicationSummaryManagement
 */
export const CandidateApplicationSummary = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CandidateApplicationSummaryComponent));
