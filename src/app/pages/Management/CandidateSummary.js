import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {
    getCandidateApplicationSummary,
    getRecruitmentCycleDetails,
    getReviewTypes
} from '../../store/actions/candidate-application-actions';
import '../../../style/candidate-application.css';
import {Tabs, Button, Modal, Select, Input} from 'antd';
import CandidateApplicationDetails from './Components/CandidateApplicationDetails';
import CandidateApplicationEssays from './Components/CandidateApplicationEssays';
import CandidateApplicationDocuments from './Components/CandidateApplicationDocuments';
import CandidateApplicationReviews from './Components/CandidateApplicationReviews';
import * as CandidateApplicationService from '../../../api/candidate-application';

const {TextArea} = Input;
const {TabPane} = Tabs;

export class CandidateApplicationSummaryComponent extends React.Component {

    componentDidMount() {
        this.resetModal();
        this.props.getCandidateApplicationSummary(this.props.match.params.reference).then((data) => {
            this.setState({pageLoading: false});
            this.loadDetailsForReviewModal();
        })
    }

    loadDetailsForReviewModal = () => {
        const cycleReference = this.props.candidateApplicationSummary.recruitmentCycleCode;
        this.setState({cycleReference})
        this.props.getReviewTypes();
        this.props.getRecruitmentCycleDetails(cycleReference);
    }

    defaultState = {
        modalVisible: false,
        alumReview: {
            remarks: '',
            reviewType: '',
            applicationReference: this.props.match.params.reference
        },
        cycleStageCode: '',
        seoRemark: '',
        cycleReference: '',
        applicationReadingInputs: {
            attentionToDetails: {value: '', name: 'Attention to Details', maxScore: 2},
            writing: {value: '', name: 'Writing', maxScore: 2},
            leadership: {value: '', name: 'Leadership', maxScore: 2},
            interestInSeo: {value: '', name: 'Interest in SEO', maxScore: 1},
            workExperience: {value: '', name: 'Work Experience', maxScore: 1},
            academics: {value: '', name: 'Academics', maxScore: 2}
        },
        individualInterviewInputs: {
            drive: {value: '', name: 'Drive', maxScore: 5},
            mentalAgility: {value: '', name: 'Mental Agility', maxScore: 5}
        },
        finalScore: 0,
        grade: {value: '', maxScore: 5},
        comments: ''
    }

    showModal = () => {
        this.setState({modalVisible: true})
    }

    hideModal = () => {
        this.setState({modalVisible: false})
    }

    constructor(props) {
        super(props);
        this.state = {
            pageLoading: true,
            ...this.defaultState
        }
    }

    onReviewTypeSelected = (code, target) => {
        let alumReview = {...this.state.alumReview};
        alumReview[target] = code;
        this.setState({alumReview, finalScore: 0, comments: ''});
    }

    onCycleStageCodeChanged = (cycleStageCode, dropdownData) => {
        this.setState({cycleStageCode});
    }

    onAddReview = async (decision) => {
        try {
            const {alumReview, finalScore, individualInterviewInputs, applicationReadingInputs, comments} = this.state;
            const {reviewType} = alumReview;
            let request = {...alumReview, decision, cycleStageCode: this.state.cycleStageCode};

            if (reviewType === 'APPLICATION_READING') {
                const applicationReadingGrades = Object.values(applicationReadingInputs);
                const applicationReviewDetails = this.buildGradesRequestFromInputs(applicationReadingGrades);
                request = {...request, finalScore, applicationReviewDetails, remarks: comments}
            } else if (reviewType === 'INDIVIDUAL_INTERVIEW') {
                const individualInterviewGrades = Object.values(individualInterviewInputs);
                const applicationReviewDetails = this.buildGradesRequestFromInputs(individualInterviewGrades);
                request = {...request, finalScore, applicationReviewDetails, remarks: comments}
            } else {
                const {grade} = this.state;
                request = {...request, finalScore: `${grade.value}/${grade.maxScore}`}
            }

            CandidateApplicationService.addReview(request).then(res => {
                if (!res) {
                    this.componentDidMount();
                }
            });
        } catch (e) {

        }
    }

    buildGradesRequestFromInputs = (grades) => {
        let data = [];
        for (let grade of grades) {
            data.push({name: grade.name, grade: `${grade.value}/${grade.maxScore}`});
        }
        return data;
    }

    onMakeSeoDecision = async (seoDecision) => {
        try {
            const request = {
                cycleStageCode: this.state.cycleStageCode,
                seoRemarks: this.state.seoRemark,
                seoDecision
            }

            CandidateApplicationService.makeFinalDecision(this.props.match.params.reference, request).then(res => {
                if (!res) {
                    this.resetModal();
                    this.componentDidMount();
                }
            });
        } catch (e) {

        }
    }

    resetModal = () => {
        this.setState({...this.defaultState})
    }

    onApplicationReadingInputsChanged = (e, target) => {
        let applicationReadingInputs = {...this.state.applicationReadingInputs};
        applicationReadingInputs[target].value = e.target.value;
        const finalScore = this.getFinalScore(applicationReadingInputs);
        this.setState({applicationReadingInputs, finalScore});
    }

    onIndividualInterviewInputsChanged = (e, target) => {
        let individualInterviewInputs = {...this.state.individualInterviewInputs};
        individualInterviewInputs[target].value = e.target.value;
        const finalScore = this.getFinalScore(individualInterviewInputs);
        this.setState({individualInterviewInputs, finalScore})
    }

    onCommentChange = (e) => {
        this.setState({comments: e.target.value});
    }

    getFinalScore = (inputs) => {
        return Object.values(inputs).reduce((acc, data) => {
            return Number(acc) + Number(data.value)
        }, 0);
    }

    onGradeChanged = (e) => {
        const grade = this.state.grade;
        grade.value = e.target.value;
        this.setState({grade})
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
                <div className='management-component__container candidate_application_container'>
                    <div className='management-component__header' style={{paddingLeft: '0px'}}>
                        <div style={{display: 'flex'}}>
                            <ArrowLeftOutlined
                                style={{marginRight: 24, marginTop: 4}}
                                onClick={() => this.props.history.goBack()}/>
                            <h4 className='management-component__h4'>{headerTitle}</h4>
                        </div>
                    </div>

                    <div className='management-component__header' style={{paddingLeft: '0px'}}>
                        <div className='displayed_reference_row'>
                            <p>Reference - {this.props.match.params.reference}</p>
                            <Button onClick={() => this.showModal()}
                                className={`${isSuperAdmin || isAdmin ? 'green_bordered_button' : 'blue_bordered_button'}`}>
                                {(isSuperAdmin || isAdmin) ? 'Make Final Decision' : 'Review'}
                            </Button>
                        </div>
                    </div>

                    <Tabs type='card' className='tab-container'>
                        <TabPane tab='Application Details' key='1'>
                            <CandidateApplicationDetails
                                candidateApplicationSummary={candidateApplicationSummary}
                                pageLoading={pageLoading}/>
                        </TabPane>
                        <TabPane tab='Essays' key='2'>
                            <CandidateApplicationEssays
                                candidateApplicationSummary={candidateApplicationSummary}
                                pageLoading={pageLoading}/>
                        </TabPane>

                        <TabPane tab='Uploaded Documents' key='3'>
                            <CandidateApplicationDocuments
                                candidateApplicationSummary={candidateApplicationSummary}
                                applicationReference={applicationReference}
                                pageLoading={pageLoading}/>
                        </TabPane>

                        {(isSuperAdmin || isAdmin) && <TabPane tab='Reviews' key='4'>
                            <CandidateApplicationReviews
                                candidateApplicationSummary={candidateApplicationSummary}
                                pageLoading={pageLoading}/>
                        </TabPane>}
                    </Tabs>
                </div>

                <Modal
                    visible={this.state.modalVisible}
                    title={(isAdmin || isSuperAdmin) ? 'Final Decision' : 'Add Review'}
                    onCancel={() => this.hideModal()}
                    footer={(isAdmin || isSuperAdmin) ? adminActions : alumniActions}
                >
                    <this.ModalContent />
                </Modal>
            </div>

        );
    }

    ApplicationReadingModalContent = () => {
        const {attentionToDetails, writing, leadership, interestInSeo, workExperience, academics} = this.state.applicationReadingInputs;
        const questions = [
            {
                title: 'A) Attention to details:',
                details: 'How well did s/he pay attention to details',
                value: attentionToDetails.value,
                name: 'attentionToDetails',
                maxScore: attentionToDetails.maxScore
            },
            {
                title: 'B) Writing:',
                details: 'How well did s/he pay attention to details',
                value: writing.value,
                name: 'writing',
                maxScore: writing.maxScore
            },
            {
                title: 'C) Leadership',
                details: 'How well did s/he pay attention to details',
                value: leadership.value,
                name: 'leadership',
                maxScore: leadership.maxScore
            },
            {
                title: 'D) Interest in SEO/Finance',
                details: 'How well did s/he pay attention to details',
                value: interestInSeo.value,
                name: 'interestInSeo',
                maxScore: interestInSeo.maxScore
            },
            {
                title: 'E) Work Experience',
                details: 'How well did s/he pay attention to details',
                value: workExperience.value,
                name: 'workExperience',
                maxScore: workExperience.maxScore
            },
            {
                title: 'F) Academics',
                details: 'How well did s/he pay attention to details',
                value: academics.value,
                name: 'academics',
                maxScore: academics.maxScore
            }
        ];
        return (
            <div>
                {questions.map(question => (
                    <div key={question.title} className='flex space-between margin-bottom-10'>
                        <div>
                            <p className='bold margin-0'>{question.title}</p>
                            <p>{question.details}</p>
                        </div>
                        <div>
                            <span>Grade: </span>
                            <input type='number' min={0} max={2} value={question.value} className='score-input'
                                   onChange={e => this.onApplicationReadingInputsChanged(e, question.name)}/>
                            <span>/{question.maxScore}</span>
                        </div>
                    </div>
                ))}

                <div className='flex'>
                    <span className='margin-right-10'>Comments</span>
                    <input style={{width: '200px'}}
                           className='single-line-text'
                           type='text'
                           value={this.state.comments}
                           onChange={this.onCommentChange}/>
                </div>
            </div>
        );
    }

    IndividualInterviewModalContent = () => {
        const {drive, mentalAgility} = this.state.individualInterviewInputs;

        const questions = [
            {
                title: 'A) Assess the candidate\'s DRIVE:',
                details: 'How well did s/he demonstrate drive towards goals, resilience, level of Preparation?',
                value: drive.value,
                name: 'drive',
                maxScore: drive.maxScore
            },
            {
                title: 'B) Assess the candidate\'s MENTAL AGILITY',
                details: 'How well did s/he pay demonstrate mental agility towards pro-activeness/Attention to Detail/Analytical Skills/Quick Study?',
                value: mentalAgility.value,
                name: 'mentalAgility',
                maxScore: mentalAgility.maxScore
            }
        ];
        return (
            <div>
                {questions.map(question => (
                    <div key={question.title} className='flex space-between margin-bottom-10'>
                        <div className='flex-1'>
                            <div>
                                <p className='bold margin-0'>{question.title}</p>
                                <p>{question.details}</p>
                            </div>
                            <div>
                                <p className='bold margin-0'>Support your ratings</p>
                                <p>Note the strongest piece of evidence and Opportunity missed or negative indication of
                                    DRIVE</p>
                            </div>
                        </div>
                        <div>
                            <span>Grade: </span>
                            <input type='number' min={0} max={5} value={question.value} className='score-input'
                                   onChange={e => this.onIndividualInterviewInputsChanged(e, question.name)}/>
                            <span>/{question.maxScore}</span>
                        </div>
                    </div>
                ))}

                <div className='flex'>
                    <span className='margin-right-10'>Comments</span>
                    <input style={{width: '200px'}}
                           className='single-line-text'
                           type='text'
                           value={this.state.comments}
                           onChange={this.onCommentChange}/>
                </div>
            </div>
        );
    }

    DefaultModalContent = () => {

        return (
            <div>
                <div style={{marginBottom: '20px'}}>
                    <span>Grade: </span>
                    <input type='number' min={0} max={5} value={this.state.grade.value} className='score-input'
                           onChange={this.onGradeChanged}/>
                    <span>/5</span>
                </div>
                <TextArea value={this.state.alumReview.remarks}
                          onChange={e => {
                              this.setState({alumReview: {...this.state.alumReview, remarks: e.target.value}})
                          }}
                          placeholder='Review'
                          rows={5}/>
            </div>

        );
    }
    getAlumReviewActions = () => {
        const finalScoreVisible = this.state.alumReview.reviewType === 'APPLICATION_READING' ||
            this.state.alumReview.reviewType === 'INDIVIDUAL_INTERVIEW';
        const footerStyle = {};

        if (!finalScoreVisible) {
            footerStyle['justifyContent'] = 'flex-end';
        }
        return [
            <div className='flex space-between' style={footerStyle}>
                {finalScoreVisible && <div className='margin-right-50'>
                    Final Score: {this.state.finalScore}
                </div>}

                <div>
                    <Button key='reject'
                            className='red_bordered_button'
                            onClick={() => this.onAddReview('NO')}>
                        No
                    </Button>,
                    <Button key='maybe'
                            className='orange_bordered_button'
                            onClick={() => this.onAddReview('MAYBE')}>
                        Maybe
                    </Button>,
                    <Button key='approve'
                            className='green_bordered_button'
                            onClick={() => this.onAddReview('YES')}>
                        Yes
                    </Button>
                </div>
            </div>


        ];
    }

    getAdminFinalDecisionActions = () => {
        return [
            <Button key='reject'
                    className='red_bordered_button'
                    onClick={() => this.onMakeSeoDecision('REJECTED')}>
                Reject
            </Button>,
            <Button key='maybe'
                    className='orange_bordered_button'
                    onClick={() => this.onMakeSeoDecision('MAYBE')}>
                Maybe
            </Button>,
            <Button key='approve'
                    className='green_bordered_button'
                    onClick={() => this.onMakeSeoDecision('APPROVED')}>
                Approve
            </Button>
        ];
    }

    // TODO: MAKE THE MODAL FOR EITHER ADMIN OR ALUM DIFFERENT
    ModalContent = () => {
        const isSuperAdmin = this.props.user.roles.includes('SUPER_ADMIN');
        const isAdmin = this.props.user.roles.includes('ADMIN');

        return <React.Fragment>
            {(isAdmin || isSuperAdmin) ?
                <div>
                    <p className='text-12'>Considering <span style={{color: 'blue'}}>ALL</span> reviews
                        give for this candidate's current stage, what is your final decision?</p>
                    <p className='text-12 text-red'>Note: Your final decision would determine if this
                        applicant would be
                        moving to the next stage</p>
                    <div style={{marginBottom: '20px'}}>
                        <Select defaultValue='Select application stage'
                                onSelect={(code, dropdownData) => this.onCycleStageCodeChanged(code, dropdownData)}>
                            {this.getDropdownChildren(this.props.stages)}
                        </Select>
                    </div>
                    <TextArea value={this.state.seoRemark}
                              onChange={e => this.setState({seoRemark: e.target.value})}
                              placeholder='Remark'
                              rows={5}/>
                </div> :

                <div>
                    <div style={{marginBottom: '20px'}}>
                        <Select defaultValue='Select application stage' style={{width: 200, marginLeft: 40}}
                                onSelect={(code, dropdownData) => this.onCycleStageCodeChanged(code, dropdownData)}>
                            {this.getDropdownChildren(this.props.stages)}
                        </Select>
                        <Select defaultValue='Select review type' style={{width: 200}}

                                onSelect={(code) => this.onReviewTypeSelected(code, 'reviewType')}>
                            {this.getDropdownChildren(this.props.reviewTypes)}
                        </Select>
                    </div>

                    {/*{this.state.alumReview.reviewType === 'APPLICATION_READING' &&*/}
                    {/*<this.ApplicationReadingModalContent/>}*/}
                    {/*{this.state.alumReview.reviewType === 'INDIVIDUAL_INTERVIEW' &&*/}
                    {/*<this.IndividualInterviewModalContent/>}*/}
                    {/*{this.state.alumReview.reviewType !== 'APPLICATION_READING' &&*/}
                    {/*this.state.alumReview.reviewType !== 'INDIVIDUAL_INTERVIEW' &&*/}
                    {/*<this.DefaultModalContent/>}*/}

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
export const CandidateSummary = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CandidateApplicationSummaryComponent));
