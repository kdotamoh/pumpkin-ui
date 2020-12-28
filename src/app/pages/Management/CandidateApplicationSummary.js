import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  getCandidateApplicationSummary,
  getRecruitmentCycleDetails,
  getReviewTypes,
} from '../../store/actions/candidate-application-actions';
import '../../../style/candidate-application.css';
import { Tabs, Button, Modal, Select, Input, message } from 'antd';
import CandidateApplicationDetails from './Components/CandidateApplicationDetails';
import CandidateApplicationEssays from './Components/CandidateApplicationEssays';
import CandidateApplicationDocuments from './Components/CandidateApplicationDocuments';
import CandidateApplicationReviews from './Components/CandidateApplicationReviews';
import * as CandidateApplicationService from '../../../api/candidate-application';
import { Radio } from 'antd';

const { TextArea } = Input;
const { TabPane } = Tabs;

export class CandidateApplicationSummaryComponent extends React.Component {
  componentDidMount() {
    this.resetModal();
    this.props
      .getCandidateApplicationSummary(this.props.match.params.reference)
      .then((data) => {
        this.setState({ pageLoading: false });
        this.loadDetailsForReviewModal();
      });
  }

  loadDetailsForReviewModal = () => {
    const cycleReference = this.props.candidateApplicationSummary
      .recruitmentCycleCode;
    this.setState({ cycleReference });
    this.props.getReviewTypes();
    this.props.getRecruitmentCycleDetails(cycleReference);
  };

  applicationReadingInputsDefaultState = {
    attentionToDetails: {
      value: '',
      name: 'Attention to Details',
      maxScore: 2,
      type: 'text',
    },
    writing: { value: '', name: 'Writing', maxScore: 2, type: 'text' },
    leadership: { value: '', name: 'Leadership', maxScore: 2, type: 'text' },
    interestInSeo: {
      value: '',
      name: 'Interest in SEO',
      maxScore: 2,
      type: 'text',
    },
    workExperience: {
      value: '',
      name: 'Work Experience',
      maxScore: 1,
      type: 'text',
    },
    academics: {
      value: '',
      name: 'Academics',
      maxScore: 1,
      type: 'text',
    },
  };

  individualInterviewInputsDefaultState = {
    drive: {
      value: '',
      name: 'Drive',
      maxScore: 5,
      type: 'text',
      positiveComments: '',
      negativeComments: '',
    },
    mentalAgility: {
      value: '',
      name: 'Mental Agility',
      maxScore: 5,
      type: 'text',
      positiveComments: '',
      negativeComments: '',
    },
    personalImpact: {
      value: '',
      name: 'Personal Impact',
      type: 'option',
      positiveComments: '',
      negativeComments: '',
    },
  };

  gradeDefaultState = { value: '', maxScore: 5, type: 'text' };

  defaultState = {
    modalVisible: false,
    alumReview: {
      remarks: '',
      reviewType: '',
      applicationReference: this.props.match.params.reference,
    },
    cycleStageCode: '',
    seoRemark: '',
    cycleReference: '',
    applicationReadingInputs: this.applicationReadingInputsDefaultState,
    individualInterviewInputs: this.individualInterviewInputsDefaultState,
    finalScore: 0,
    grade: this.gradeDefaultState,
    comments: '',
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true,
      ...this.defaultState,
    };
  }

  onReviewTypeSelected = (code, target) => {
    let alumReview = { ...this.state.alumReview };
    alumReview[target] = code;
    this.setState({ alumReview, finalScore: 0, comments: '' });
    this.resetReviewInputs();
  };

  resetReviewInputs = () => {
    this.setState({
      applicationReadingInputs: this.applicationReadingInputsDefaultState,
      individualInterviewInputs: this.individualInterviewInputsDefaultState,
      grade: this.gradeDefaultState,
    });
  };

  onCycleStageCodeChanged = (cycleStageCode, dropdownData) => {
    this.setState({ cycleStageCode });
  };

  onAddReview = async (decision) => {
    try {
      const {
        alumReview,
        finalScore,
        individualInterviewInputs,
        applicationReadingInputs,
        comments,
      } = this.state;
      const { reviewType } = alumReview;
      let request = {
        ...alumReview,
        decision,
        cycleStageCode: this.state.cycleStageCode,
      };

      let currentReviewInputs = {};
      if (reviewType === 'APPLICATION_READING') {
        currentReviewInputs = applicationReadingInputs;
        const applicationReadingGrades = Object.values(
          applicationReadingInputs
        );
        const applicationReviewDetails = this.buildGradesRequestFromInputs(
          applicationReadingGrades
        );
        request = {
          ...request,
          finalScore,
          applicationReviewDetails,
          remarks: comments,
        };
      } else if (reviewType === 'INDIVIDUAL_INTERVIEW') {
        currentReviewInputs = individualInterviewInputs;
        const individualInterviewGrades = Object.values(
          individualInterviewInputs
        );
        const applicationReviewDetails = this.buildGradesRequestFromInputs(
          individualInterviewGrades
        );
        request = {
          ...request,
          finalScore,
          applicationReviewDetails,
          remarks: comments,
        };
      } else {
        const { grade } = this.state;
        currentReviewInputs = { grade };
        request = { ...request, finalScore: grade.value };
      }
      if (!this.isValidScoresEntered(currentReviewInputs)) {
        return message.error(`Cannot add Review: Ensure your inputs are valid`);
      }

      CandidateApplicationService.addReview(request).then((res) => {
        if (res && res.requestSuccessful) {
          this.componentDidMount();
        }
      });
    } catch (e) {}
  };

  isValidScoresEntered = (currentReviewInputs) => {
    const valuesArray = Object.values(currentReviewInputs);

    for (let obj of valuesArray) {
      if (obj.type === 'option' && !obj.value) {
        message.error(`Ensure you have selected an option`);
        return false;
      }
      if (
        obj.type !== 'option' &&
        (obj.value.trim() === '' ||
          isNaN(Number(obj.value)) ||
          Number(obj.value) > obj.maxScore)
      ) {
        return false;
      }
    }
    return true;
  };

  buildGradesRequestFromInputs = (grades) => {
    let data = [];
    for (let grade of grades) {
      data.push({
        name: grade.name,
        positiveComments: grade.positiveComments,
        negativeComments: grade.negativeComments,
        grade:
          grade.type === 'option'
            ? `${grade.value}`
            : `${grade.value}/${grade.maxScore}`,
      });
    }
    return data;
  };

  onMakeSeoDecision = async (seoDecision) => {
    try {
      const request = {
        cycleStageCode: this.state.cycleStageCode,
        seoRemarks: this.state.seoRemark,
        seoDecision,
      };

      CandidateApplicationService.makeFinalDecision(
        this.props.match.params.reference,
        request
      ).then((res) => {
        if (!res) {
          this.resetModal();
          this.componentDidMount();
        }
      });
    } catch (e) {}
  };

  resetModal = () => {
    this.setState({ ...this.defaultState });
  };

  onApplicationReadingInputsChanged = (e, target) => {
    let applicationReadingInputs = { ...this.state.applicationReadingInputs };
    applicationReadingInputs[target].value = e.target.value;
    const finalScore = this.getFinalScore(applicationReadingInputs);
    this.setState({ applicationReadingInputs, finalScore });
  };

  onIndividualInterviewInputsChanged = (e, type, target) => {
    let individualInterviewInputs = { ...this.state.individualInterviewInputs };
    individualInterviewInputs[target].value = e.target.value;
    if (type === 'option') {
      this.setState({ individualInterviewInputs });
    } else if (type === 'text') {
      const finalScore = this.getFinalScore(individualInterviewInputs);
      this.setState({ individualInterviewInputs, finalScore });
    }
  };

  onPositiveCommentChanged = (e, target) => {
    let individualInterviewInputs = { ...this.state.individualInterviewInputs };
    individualInterviewInputs[target].positiveComments = e.target.value;
    this.setState({ individualInterviewInputs });
  };

  onNegativeCommentChanged = (e, target) => {
    let individualInterviewInputs = { ...this.state.individualInterviewInputs };
    individualInterviewInputs[target].negativeComments = e.target.value;
    this.setState({ individualInterviewInputs });
  };

  onCommentChange = (e) => {
    this.setState({ comments: e.target.value });
  };

  getFinalScore = (inputs) => {
    return Object.values(inputs).reduce((acc, data) => {
      return Number(acc) + Number(data.value);
    }, 0);
  };

  onGradeChanged = (e) => {
    const grade = this.state.grade;
    grade.value = e.target.value;
    this.setState({ grade });
  };

  render() {
    const headerTitle = this.getTitle();
    const isSuperAdmin = this.props.user.roles.includes('SUPER_ADMIN');
    const isAdmin = this.props.user.roles.includes('ADMIN');
    const { candidateApplicationSummary } = this.props;
    const applicationReference = this.props.match.params.reference;
    const { pageLoading } = this.state;
    const adminActions = this.getAdminFinalDecisionActions();
    const alumniActions = this.getAlumReviewActions();

    return (
      <div>
        <div className="management-component__container candidate_application_container">
          <div
            className="management-component__header"
            style={{ paddingLeft: '0px' }}
          >
            <div style={{ display: 'flex' }}>
              <ArrowLeftOutlined
                style={{ marginRight: 24, marginTop: 4 }}
                onClick={() => this.props.history.goBack()}
              />
              <h4 className="management-component__h4">{headerTitle}</h4>
            </div>
          </div>

          <div
            className="management-component__header"
            style={{ paddingLeft: '0px' }}
          >
            <div className="displayed_reference_row">
              <p>Reference - {this.props.match.params.reference}</p>
              <Button
                onClick={() => this.showModal()}
                className={`${
                  isSuperAdmin || isAdmin
                    ? 'green_bordered_button'
                    : 'blue_bordered_button'
                }`}
              >
                {isSuperAdmin || isAdmin ? 'Make Final Decision' : 'Review'}
              </Button>
            </div>
          </div>

          <Tabs type="card" className="tab-container">
            <TabPane tab="Application Details" key="1">
              <CandidateApplicationDetails
                candidateApplicationSummary={candidateApplicationSummary}
                pageLoading={pageLoading}
              />
            </TabPane>
            <TabPane tab="Essays" key="2">
              <CandidateApplicationEssays
                candidateApplicationSummary={candidateApplicationSummary}
                pageLoading={pageLoading}
              />
            </TabPane>

            <TabPane tab="Uploaded Documents" key="3">
              <CandidateApplicationDocuments
                candidateApplicationSummary={candidateApplicationSummary}
                applicationReference={applicationReference}
                pageLoading={pageLoading}
              />
            </TabPane>

            {(isSuperAdmin || isAdmin) && (
              <TabPane tab="Reviews" key="4">
                <CandidateApplicationReviews
                  candidateApplicationSummary={candidateApplicationSummary}
                  pageLoading={pageLoading}
                />
              </TabPane>
            )}
          </Tabs>
        </div>

        <Modal
          visible={this.state.modalVisible}
          title={isAdmin || isSuperAdmin ? 'Final Decision' : 'Add Review'}
          onCancel={() => this.hideModal()}
          footer={isAdmin || isSuperAdmin ? adminActions : alumniActions}
          width={700}
        >
          {this.modalContent()}
        </Modal>
      </div>
    );
  }

  applicationReadingModalContent = () => {
    const {
      attentionToDetails,
      writing,
      leadership,
      interestInSeo,
      workExperience,
      academics,
    } = this.state.applicationReadingInputs;
    const questions = [
      {
        title: 'A) Attention to details:',
        details: 'How well did this applicant pay attention to details',
        value: attentionToDetails.value,
        name: 'attentionToDetails',
        maxScore: attentionToDetails.maxScore,
      },
      {
        title: 'B) Writing:',
        details: "What do you think about this applicant's writing skills?",
        value: writing.value,
        name: 'writing',
        maxScore: writing.maxScore,
      },
      {
        title: 'C) Leadership',
        details:
          'How well has this applicant displayed leadership through their CV and essay(s)?',
        value: leadership.value,
        name: 'leadership',
        maxScore: leadership.maxScore,
      },
      {
        title: 'D) Interest in SEO/Finance',
        details:
          'How interested is this applicant in this particular SEO opportunity?',
        value: interestInSeo.value,
        name: 'interestInSeo',
        maxScore: interestInSeo.maxScore,
      },
      {
        title: 'E) Work Experience',
        details: "How relevant/impressive is this applicant's work experience?",
        value: workExperience.value,
        name: 'workExperience',
        maxScore: workExperience.maxScore,
      },
      {
        title: 'F) Academics',
        details: 'First class 1 mark, Second-upper 0.5, Others 0',
        value: academics.value,
        name: 'academics',
        maxScore: academics.maxScore,
      },
    ];
    return (
      <div>
        {questions.map((question) => (
          <div
            key={question.title}
            className="flex space-between margin-bottom-10"
          >
            <div>
              <p className="bold margin-0">{question.title}</p>
              <p>{question.details}</p>
            </div>
            <div>
              <input
                type="number"
                min={0}
                max={question.maxScore}
                value={question.value}
                className={`score-input ${
                  question.value > question.maxScore ? 'red_border' : ''
                }`}
                onChange={(e) =>
                  this.onApplicationReadingInputsChanged(e, question.name)
                }
              />
              <span>/{question.maxScore}</span>
            </div>
          </div>
        ))}

        <div className="flex margin-top-50">
          <span className="margin-right-10">Overall/Final Comments</span>
          <input
            style={{ width: '200px' }}
            className="single-line-text"
            type="text"
            value={this.state.comments}
            onChange={this.onCommentChange}
          />
        </div>
      </div>
    );
  };

  individualInterviewModalContent = () => {
    const {
      drive,
      mentalAgility,
      personalImpact,
    } = this.state.individualInterviewInputs;

    const questions = [
      {
        title: "A) Assess the candidate's DRIVE:",
        details:
          'Did candidate demonstrate drive towards goals, resilience and high levels of preparation?',
        value: drive.value,
        name: 'drive',
        maxScore: drive.maxScore,
        type: 'text',
      },
      {
        title: "B) Assess the candidate's MENTAL AGILITY",
        details:
          'Did candidate demonstrate pro-activeness, attention to detail, analytical skills, finish study quickly?',
        value: mentalAgility.value,
        name: 'mentalAgility',
        maxScore: mentalAgility.maxScore,
        type: 'text',
      },
      {
        title: "C) Assess the candidate's PERSONAL IMPACT",
        details:
          'Did candidate demonstrate good body language, communication, report building, confidence? ',
        value: personalImpact.value,
        name: 'personalImpact',
        type: 'option',
      },
    ];
    return (
      <div>
        {questions.map((question) => (
          <div className="margin-bottom-20">
            <div
              key={question.title}
              className="flex space-between items-start"
            >
              <div className="flex-1">
                <div>
                  <p className="bold margin-0">{question.title}</p>
                  <p>{question.details}</p>
                </div>
              </div>
              {question.type === 'option' && (
                <div className="margin-bottom-10">
                  <Radio.Group
                    onChange={(e) =>
                      this.onIndividualInterviewInputsChanged(
                        e,
                        question.type,
                        question.name
                      )
                    }
                  >
                    <Radio value="Strong">Strong</Radio>
                    <Radio value="Average">Average</Radio>
                    <Radio value="Weak">Weak</Radio>
                  </Radio.Group>
                </div>
              )}
              {question.type === 'text' && (
                <div>
                  <span>Grade: </span>
                  <input
                    type="number"
                    min={0}
                    max={question.maxScore}
                    value={question.value}
                    className={`score-input ${
                      question.value > question.maxScore ? 'red_border' : ''
                    }`}
                    onChange={(e) =>
                      this.onIndividualInterviewInputsChanged(
                        e,
                        question.type,
                        question.name
                      )
                    }
                  />
                  <span>/{question.maxScore}</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex margin-bottom-10">
                <span className="margin-right-10">
                  If yes, provide evidence
                </span>
                <input
                  className="single-line-text flex flex-1"
                  type="text"
                  value={question.positiveComments}
                  onChange={(e) =>
                    this.onPositiveCommentChanged(e, question.name)
                  }
                />
              </div>
              <div className="flex">
                <span className="margin-right-10">
                  {`Else, note missed opportunities / negative indications of 
                    ${question.name
                      .replace(/([a-z])([A-Z])/g, '$1 $2')
                      .toLowerCase()}`}
                </span>
                <input
                  className="single-line-text flex flex-1"
                  type="text"
                  value={question.negativeComments}
                  onChange={(e) =>
                    this.onNegativeCommentChanged(e, question.name)
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex margin-top-50">
          <span className="margin-right-10">Overall/Final Comments</span>
          <input
            style={{ width: '200px' }}
            className="single-line-text"
            type="text"
            value={this.state.comments}
            onChange={this.onCommentChange}
          />
        </div>
      </div>
    );
  };

  defaultModalContent = () => {
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <span>Grade: </span>
          <input
            type="number"
            min={0}
            max={5}
            value={this.state.grade.value}
            className={`score-input ${
              this.state.grade.value > 5 ? 'red_border' : ''
            }`}
            onChange={this.onGradeChanged}
          />
          <span>/5</span>
        </div>
        <TextArea
          value={this.state.alumReview.remarks}
          onChange={(e) => {
            this.setState({
              alumReview: { ...this.state.alumReview, remarks: e.target.value },
            });
          }}
          placeholder="Review"
          rows={5}
        />
      </div>
    );
  };

  getAlumReviewActions = () => {
    const finalScoreVisible =
      this.state.alumReview.reviewType === 'APPLICATION_READING' ||
      this.state.alumReview.reviewType === 'INDIVIDUAL_INTERVIEW';
    const footerStyle = {};

    if (!finalScoreVisible) {
      footerStyle['justifyContent'] = 'flex-end';
    }
    return [
      <div className="flex space-between" style={footerStyle}>
        {finalScoreVisible && (
          <div className="margin-right-50 bold">
            Final Score: {this.state.finalScore}
          </div>
        )}

        <div>
          <Button
            key="reject"
            className="red_bordered_button"
            onClick={() => this.onAddReview('NO')}
          >
            No
          </Button>
          <Button
            key="maybe"
            className="orange_bordered_button"
            onClick={() => this.onAddReview('MAYBE')}
          >
            Maybe
          </Button>
          <Button
            key="approve"
            className="green_bordered_button"
            onClick={() => this.onAddReview('YES')}
          >
            Yes
          </Button>
        </div>
      </div>,
    ];
  };

  getAdminFinalDecisionActions = () => {
    return [
      <Button
        key="reject"
        className="red_bordered_button"
        onClick={() => this.onMakeSeoDecision('REJECTED')}
      >
        Reject
      </Button>,
      <Button
        key="maybe"
        className="orange_bordered_button"
        onClick={() => this.onMakeSeoDecision('MAYBE')}
      >
        Maybe
      </Button>,
      <Button
        key="approve"
        className="green_bordered_button"
        onClick={() => this.onMakeSeoDecision('APPROVED')}
      >
        Approve
      </Button>,
    ];
  };

  // TODO: MAKE THE MODAL FOR EITHER ADMIN OR ALUM DIFFERENT
  modalContent = () => {
    const isSuperAdmin = this.props.user.roles.includes('SUPER_ADMIN');
    const isAdmin = this.props.user.roles.includes('ADMIN');

    return (
      <React.Fragment>
        {isAdmin || isSuperAdmin ? (
          <div>
            <p className="text-12">
              Considering <span style={{ color: 'blue' }}>ALL</span> reviews
              give for this candidate's current stage, what is your final
              decision?
            </p>
            <p className="text-12 text-red">
              Note: Your final decision would determine if this applicant would
              be moving to the next stage
            </p>
            <div style={{ marginBottom: '20px' }}>
              <Select
                defaultValue="Select application stage"
                onSelect={(code, dropdownData) =>
                  this.onCycleStageCodeChanged(code, dropdownData)
                }
              >
                {this.getDropdownChildren(this.props.stages)}
              </Select>
            </div>
            <TextArea
              value={this.state.seoRemark}
              onChange={(e) => this.setState({ seoRemark: e.target.value })}
              placeholder="Remark"
              rows={5}
            />
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Select
                defaultValue="Select application stage"
                style={{ width: 200, marginLeft: 0, marginRight: 40 }}
                onSelect={(code, dropdownData) =>
                  this.onCycleStageCodeChanged(code, dropdownData)
                }
              >
                {this.getDropdownChildren(this.props.stages)}
              </Select>
              <Select
                defaultValue="Select review type"
                style={{ width: 200 }}
                onSelect={(code) =>
                  this.onReviewTypeSelected(code, 'reviewType')
                }
              >
                {this.getDropdownChildren(this.props.reviewTypes)}
              </Select>
            </div>
            {this.state.alumReview.reviewType === 'APPLICATION_READING'
              ? this.applicationReadingModalContent()
              : this.state.alumReview.reviewType === 'INDIVIDUAL_INTERVIEW'
              ? this.individualInterviewModalContent()
              : this.defaultModalContent()}
          </div>
        )}
      </React.Fragment>
    );
  };

  getDropdownChildren = (data) => {
    let children = [];
    for (let i of data) {
      children.push(<Select.Option key={i.code}>{i.name}</Select.Option>);
    }
    return children;
  };

  getTitle = () => {
    let title = 'APPLICANT';
    const { currentCandidate, candidateApplicationSummary } = this.props;
    if (
      currentCandidate &&
      currentCandidate.firstName &&
      currentCandidate.lastName
    ) {
      const { firstName, lastName } = currentCandidate;
      title += ' - ' + firstName + ' ' + lastName;
    } else if (
      candidateApplicationSummary &&
      candidateApplicationSummary.firstName &&
      candidateApplicationSummary.lastName
    ) {
      const { firstName, lastName } = candidateApplicationSummary;
      title += ' - ' + firstName + ' ' + lastName;
    }
    return title;
  };
}

CandidateApplicationSummaryComponent.propTypes = {
  getCandidateApplicationSummary: PropTypes.func.isRequired,
  getReviewTypes: PropTypes.func.isRequired,
  getApplicationStages: PropTypes.func.isRequired,
  getRecruitmentCycleDetails: PropTypes.func.isRequired,
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  currentCandidate: state.candidateApplications.current,
  candidateApplicationSummary:
    state.candidateApplications.candidateApplicationSummary,
  reviewTypes: state.candidateApplications.reviewTypes,
  stages: state.candidateApplications.stages,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getCandidateApplicationSummary: (reference) =>
    dispatch(getCandidateApplicationSummary(reference)),
  getReviewTypes: () => dispatch(getReviewTypes()),
  getApplicationStages: () => dispatch(getReviewTypes()),
  getRecruitmentCycleDetails: (cycleReference) =>
    dispatch(getRecruitmentCycleDetails(cycleReference)),
});

/**
 * The connected CandidateApplicationSummaryManagement
 */
export const CandidateApplicationSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CandidateApplicationSummaryComponent));
