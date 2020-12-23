import React, { useState } from 'react';
import { Collapse, Skeleton, Tag, Button, Modal, Divider } from 'antd';
import * as CandidateApplicationService from '../../../../api/candidate-application';

const { Panel } = Collapse;
const CandidateApplicationReviews = ({ candidateApplicationSummary, pageLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewDetails, setReviewDetails] = useState({});
  const [reviewDetailsLoaded, setReviewDetailsLoaded] = useState(false);

  const onSeeMoreDetails = async (reviewCode, comment, finalScore) => {
    setModalVisible(true);
    try {
      CandidateApplicationService.seeMoreReviewDetails(reviewCode).then(data => {
        setReviewDetails({
          details: data,
          comment,
          finalScore
        });
        setReviewDetailsLoaded(true);
      });
    } catch (e) {

    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setReviewDetailsLoaded(false);
    }, 400);
  };

  return (pageLoading ?
      <Skeleton paragraph={{ rows: 2 }} /> :
      <React.Fragment>
        <div className='sub-content-header'>Stages</div>
        {candidateApplicationSummary.reviewsGroupedByStage?.length > 0 ?
          candidateApplicationSummary.reviewsGroupedByStage?.map(reviewsPerStage => {
              const { reviews } = reviewsPerStage;
              const numberOfNos = reviews.filter(review => review.decision?.includes('NO')).length;
              const numberOfYes = reviews.filter(review => review.decision?.includes('YES')).length;
              const numberOfMaybes = reviews.filter(review => review.decision?.includes('MAYBE')).length;

              const seoDecisionStyle = {};
              if (reviewsPerStage.seoDecision.includes('APPROVED')) {
                seoDecisionStyle.color = 'green';
              } else if (reviewsPerStage.seoDecision.includes('REJECTED')) {
                seoDecisionStyle.color = 'red';
              } else {
                seoDecisionStyle.color = 'orange';
              }

              return (
                <div className='tab-container'>
                  <Collapse expandIconPosition='right'>
                    <Panel header={<div>
                      {reviewsPerStage.stageName}
                      <Tag color='blue' style={{ borderRadius: '15px', marginLeft: '30px' }}>Reviews
                        - {reviews.length}</Tag>
                      <Tag style={{ borderRadius: '15px', marginLeft: '10px' }}>No
                        - {numberOfNos}</Tag>
                      <Tag style={{ borderRadius: '15px', marginLeft: '10px' }}>Maybe
                        - {numberOfMaybes}</Tag>
                      <Tag style={{ borderRadius: '15px', marginLeft: '10px' }}>Yes
                        - {numberOfYes}</Tag>
                    </div>} key='1'>
                      <div>
                        <div className='sub-content'>
                          <div className='sub-content-header'>SEO'S DECISION</div>
                          <div className='flex-1'>Decision
                            - <span
                              style={seoDecisionStyle}>{reviewsPerStage.seoDecision}</span> by {reviewsPerStage.seoDecisionMadeBy || 'N/A'}
                          </div>
                          <div>
                            {reviewsPerStage.seoRemarks && <div>
                              <div>Remark - {reviewsPerStage.seoRemarks}</div>
                            </div>}
                          </div>
                        </div>

                        <div className='sub-content-header'>ALUMNAE Review</div>
                        {reviews.map((review, index) => {
                          const decisionStyle = {};
                          if (review.decision.includes('YES')) {
                            decisionStyle.color = 'green';
                          } else if (review.decision.includes('NO')) {
                            decisionStyle.color = 'red';
                          } else {
                            decisionStyle.color = 'orange';
                          }
                          return (
                            <div style={{ marginBottom: '40px' }}>
                              <div className='data-row'>
                                <div className='flex-1'>Reviewer's Name
                                  - {review.reviewerName}</div>
                                <div className='flex-1'>SEO YEAR
                                  - {review.reviewerSeoYear || 'N/A'}</div>
                                <div className='flex-1 bold'>Total Grade
                                  - {review.finalScore || 'N/A'}</div>
                              </div>
                              <div className='data-row'>
                                <div className='flex-1'>Review Type
                                  - {review.reviewType}</div>
                                <div className='flex-1'>Reviewer's
                                  Decision
                                  - <span
                                    style={decisionStyle}>{review.decision}</span>
                                </div>
                                <div className="flex-1">
                                  Review Date
                                  - <span>{review.reviewDate}</span>
                                </div>
                              </div>
                              <div>
                                {review.remarks && <div>
                                  <div>Remark</div>
                                  <div>
                                    {review.remarks}
                                  </div>
                                </div>}
                              </div>
                              <div>
                                {review.hasMoreDetails && <div>
                                  <Button className='btn'
                                          onClick={() => onSeeMoreDetails(review.code, review.remarks, review.finalScore)}>See
                                    details</Button>
                                </div>
                                }
                              </div>
                              {index + 1 < reviews.length && <Divider />}
                            </div>
                          );
                        })}
                      </div>
                    </Panel>
                  </Collapse>
                </div>

              );
            }
          ) : 'NO REVIEWS FOUND'}

        <Modal
          visible={modalVisible}
          title='Review Details'
          onCancel={() => closeModal()}
          footer={[
            <Button key='ok'
                    type="primary"
                    onClick={() => closeModal()}>
              Ok
            </Button>]}
        >
          <div>
            {reviewDetailsLoaded ?
              <div>
                <div className='margin-bottom-20'>
                  {reviewDetails.details?.map(review => {
                    return (
                      <div className='flex'>
                        <p className='semi-bold' style={{ width: '82%' }}>{review.name}</p>
                        <div className='semi-bold flex space-between flex-1'>
                          <span style={{marginRight: 1}}>{`Grade: ` }</span>
                          <span>{review.grade}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <p className='semi-bold'>Final Remark/comment</p>
                  <p>{reviewDetails.comment}</p>
                </div>
                <div>
                  <p className='bold'>Final Score: {reviewDetails.finalScore}</p>
                </div>
              </div> :
              <div>
                <Skeleton />
                <Skeleton />
              </div>
            }
          </div>
        </Modal>
      </React.Fragment>
  );
};


export default CandidateApplicationReviews;
