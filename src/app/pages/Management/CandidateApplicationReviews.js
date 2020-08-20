import React from 'react';
import { connect } from 'react-redux';
import ManagementComponent from './Management';
import PropTypes from 'prop-types';
import {
  getCandidateApplicationReviews,
  searchCandidateApplicationReviews,
  getApplicationReviewerSummary,
} from 'app/store/actions/candidate-review-actions';
import { withRouter, Link } from 'react-router-dom';
import { Modal, Menu, Dropdown, Button } from 'antd';
import SummaryBadgeComponent from './SummaryBadgeComponent';
import { EllipsisOutlined } from '@ant-design/icons';
import { makeFinalDecision } from '../../../api/candidate-review';
import * as moment from 'moment';

export class CandidateApplicationReviewsComponent extends React.Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'candidateName',
      key: 'candidateName',
    },
    {
      title: 'Stage',
      dataIndex: 'cycleStage',
      key: 'cycleStage',
    },
    {
      title: 'Review Type',
      dataIndex: 'reviewType',
      key: 'reviewType',
      render: (text) => <span>{(text || '').replace('_', ' ')}</span>,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      fixed: 'right',
      render: (text, record) => (
        <Link to="#" onClick={() => this.showReviewersNotes(record)}>
          view notes
        </Link>
      ),
    },
    {
      // eslint-disable-next-line
      title: "Reviewer's  decision",
      dataIndex: 'decision',
      key: 'decision',
      render: (text, record) =>
        this.decoratedDecisionStatusView(record.decision),
    },
    {
      // eslint-disable-next-line
      title: "SEO's  decision",
      dataIndex: 'seoDecision',
      key: 'seoDecision',
      render: (text, record) =>
        this.decoratedDecisionStatusView(record.seoDecision),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      render: (text, record) => this.actionMenuView(record),
    },
  ];

  componentDidMount() {
    this.props.getApplicationReviewerSummary(
      this.props.match.params.reviewerCode
    );
    this.props.getCandidateApplicationReviews(
      this.props.match.params.reviewerCode,
      this.state.seoDecision
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      seoDecision: undefined,
      isNotesModalVisible: false,
      isDecisionModalVisible: false,
      selectedCandidate: {},
      seoRemarks: '',
    };
  }

  render() {
    return (
      <div>
        <ManagementComponent
          headerTitle={this.getTitle()}
          columnDefs={this.columns}
          data={this.props.data}
          newEntityName="REVIEWERS"
          onSearch={this.onSearchCandidateApplicationReviews}
          subHeaderView={this.applicationReviewerSummaryView()}
          showShowBackButton={true}
        />

        <Modal
          title="Reviewer's notes"
          visible={this.state.isNotesModalVisible}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          onCancel={() => this.setState({ isNotesModalVisible: false })}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginRight: 8,
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                Applicant
              </p>
              <p>{this.state.selectedCandidate.candidateName}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                Reviewer
              </p>
              <p>{this.state.selectedCandidate.reviewerName}</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                Decision
              </p>
              <p>
                {this.decoratedDecisionStatusView(
                  this.state.selectedCandidate.decision || ''
                )}
              </p>
            </div>
          </div>
          <p
            style={{
              padding: 8,
              border: 'gainsboro 1px solid',
              borderRadius: 2,
              marginTop: 32,
            }}
          >
            {this.state.selectedCandidate.remarks}
          </p>
        </Modal>

        <Modal
          title="Application profile"
          visible={this.state.isDecisionModalVisible}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          onCancel={() =>
            this.setState({ isDecisionModalVisible: false, seoRemarks: '' })
          }
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginRight: 8,
            }}
          >
            <div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                  Applicant
                </p>
                <p>{this.state.selectedCandidate.candidateName}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                  Email
                </p>
                <p>{this.state.selectedCandidate.candidateEmail}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                  College
                </p>
                <p>{this.state.selectedCandidate.candidateUniversity}</p>
              </div>
            </div>
            <div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                  Decision
                </p>
                <p>
                  {this.decoratedDecisionStatusView(
                    this.state.selectedCandidate.decision || ''
                  )}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                  First Choice
                </p>
                <p>{this.state.selectedCandidate.firstChoice}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#a9a9a9' }}>
                  Graduation Year
                </p>
                <p>
                  {moment(this.state.selectedCandidate.graduationDate).format(
                    'MMMM YYYY'
                  )}
                </p>
              </div>
            </div>
          </div>
          <p
            style={{
              padding: 8,
              border: 'gainsboro 1px solid',
              borderRadius: 2,
              marginTop: 24,
            }}
          >
            {this.state.selectedCandidate.remarks}
          </p>
          <textarea
            type="text"
            name="remarks"
            style={{
              marginTop: 16,
              marginBottom: 16,
              borderRadius: 4,
              width: '100%',
              padding: 4,
            }}
            rows="3"
            placeholder="Final SEO Remarks"
            value={this.state.seoRemarks}
            onChange={(e) => this.setState({ seoRemarks: e.target.value })}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 48,
            }}
          >
            <Button
              style={{ marginRight: 12, width: 100 }}
              type="primary"
              disabled={!this.state.seoRemarks}
              onClick={() => this.makeSEODecision('APPROVED')}
            >
              Approve
            </Button>
            <Button
              style={{ marginRight: 12, width: 100 }}
              danger
              disabled={!this.state.seoRemarks}
              onClick={() => this.makeSEODecision('REJECTED')}
            >
              Reject
            </Button>
            <Button
              style={{ width: 100 }}
              disabled={!this.state.seoRemarks}
              onClick={() => this.makeSEODecision('MAYBE')}
            >
              Maybe
            </Button>
          </div>
        </Modal>
      </div>
    );
  }

  getTitle = () => {
    let title = 'REVIEWER';
    if (
      this.props.currentApplicationReviewer &&
      this.props.currentApplicationReviewer.name
    ) {
      title += ' - ' + this.props.currentApplicationReviewer.name;
    }
    return title;
  };

  onSearchCandidateApplicationReviews = async (searchKey) => {
    this.props.searchCandidateApplicationReviews(
      this.props.match.params.reviewerCode,
      this.state.seoDecision,
      searchKey
    );
  };

  decoratedDecisionStatusView = (decision) => {
    const decisionColorMap = {
      yes: '#52c41a',
      no: '#ff4d4f',
      approved: '#52c41a',
      rejected: '#ff4d4f',
    };
    const color = decisionColorMap[decision.toLowerCase()] || 'gray';
    return <span style={{ color }}>{decision}</span>;
  };

  makeSEODecision = async (decision) => {
    const request = {
      cycleStageCode: this.state.selectedCandidate.cycleStageCode,
      seoDecision: decision,
      seoRemarks: this.state.seoRemarks,
    };

    makeFinalDecision(
      this.state.selectedCandidate.applicationReference,
      request
    )
      .then(() => {
        this.setState({ isDecisionModalVisible: false });
        this.componentDidMount();
      })
      .catch(() => {
        this.setState({ isDecisionModalVisible: false });
        this.componentDidMount();
      });
  };

  showReviewersNotes = (record) => {
    this.setState({
      isNotesModalVisible: true,
      selectedCandidate: record,
    });
  };

  applicationReviewerSummaryView = () => {
    let showSummary = false;
    let total;
    let pending;
    let approved;
    let rejected;

    if (this.props.applicationReviewerSummary) {
      showSummary = true;
      total = this.props.applicationReviewerSummary.totalReviews;
      pending = this.props.applicationReviewerSummary.totalPendingSeoApproval;
      approved = this.props.applicationReviewerSummary.totalApprovedBySeo;
      rejected = this.props.applicationReviewerSummary.totalRejectedBySeo;
    }

    return (
      <>
        {showSummary && (
          <div style={{ marginLeft: 'auto' }}>
            <p className="management-component__subheader_title">
              SEO Decision
            </p>
            <div style={{ display: 'flex' }}>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => this.onRewiewerSummarySelected()}
              >
                <SummaryBadgeComponent
                  title="Total"
                  count={total}
                  type="primary"
                />
              </div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => this.onRewiewerSummarySelected('APPROVED')}
              >
                <SummaryBadgeComponent
                  title="Approved"
                  count={approved}
                  type="success"
                  isActive={this.state.seoDecision === 'APPROVED'}
                />
              </div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => this.onRewiewerSummarySelected('PENDING')}
              >
                <SummaryBadgeComponent
                  title="Pending"
                  count={pending}
                  type="warning"
                  isActive={this.state.seoDecision === 'PENDING'}
                />
              </div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => this.onRewiewerSummarySelected('REJECTED')}
              >
                <SummaryBadgeComponent
                  title="Rejected"
                  count={rejected}
                  type="danger"
                  isActive={this.state.seoDecision === 'REJECTED'}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  onRewiewerSummarySelected = (seoDecision) => {
    this.setState({ seoDecision: seoDecision });
    this.props.getCandidateApplicationReviews(
      this.props.match.params.reviewerCode,
      seoDecision
    );
  };

  actionMenuView = (record) => {
    return (
      <Dropdown
        placement="bottomCenter"
        overlay={
          <Menu>
            <Menu.Item>View applicant detail</Menu.Item>
            {record.seoDecision === 'PENDING' && (
              <Menu.Item
                onClick={() => {
                  this.setState({
                    selectedCandidate: record,
                    isDecisionModalVisible: true,
                  });
                }}
              >
                Make final decision
              </Menu.Item>
            )}
          </Menu>
        }
      >
        <EllipsisOutlined rotate={90} />
      </Dropdown>
    );
  };
}

CandidateApplicationReviewsComponent.propTypes = {
  match: PropTypes.object.isRequired,
  currentApplicationReviewer: PropTypes.object.isRequired,
  getApplicationReviewerSummary: PropTypes.func.isRequired,
  applicationReviewerSummary: PropTypes.object.isRequired,
  getCandidateApplicationReviews: PropTypes.func.isRequired,
  searchCandidateApplicationReviews: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

/**
 * Redux
 */
const mapStateToProps = (state) => ({
  currentApplicationReviewer: state.applicationReviewers.current,
  applicationReviewerSummary:
    state.candidateApplicationReview.applicationReviewerSummary,
  data: state.candidateApplicationReview.available,
});

const mapDispatchToProps = (dispatch) => ({
  getApplicationReviewerSummary: (reviewerCode) =>
    dispatch(getApplicationReviewerSummary(reviewerCode)),
  getCandidateApplicationReviews: (reviewerCode, seoDecision) =>
    dispatch(getCandidateApplicationReviews(reviewerCode, seoDecision)),
  searchCandidateApplicationReviews: (reviewerCode, seoDecision, searchKey) =>
    dispatch(
      searchCandidateApplicationReviews(reviewerCode, seoDecision, searchKey)
    ),
});

/**
 * The connected ApplicationReviewerManagement
 */
export const CandidateApplicationReviews = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CandidateApplicationReviewsComponent));
