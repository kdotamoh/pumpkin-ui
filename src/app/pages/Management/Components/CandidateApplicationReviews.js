import React, {useState} from 'react';
import {Collapse, Skeleton, Tag, Button, Modal} from 'antd';
import * as CandidateApplicationService from '../../../../api/candidate-application';

const {Panel} = Collapse;
const CandidateApplicationReviews = ({candidateApplicationSummary, pageLoading}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [extraReviewDetails, setExtraReviewDetails] = useState({});

    const onSeeMoreDetails = async (reviewCode) => {
        try {
            CandidateApplicationService.seeMoreReviewDetails(reviewCode).then(data => {
                console.log(data);
                setExtraReviewDetails({
                    details: [
                        {title: 'Attention to Details', grade: '1/2'},
                        {title: 'Attention to Details', grade: '1/2'},
                        {title: 'Attention to Details', grade: '1/2'},
                        {title: 'Attention to Details', grade: '1/2'}],
                    comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.',
                    finalScore: 6
                });
                setModalVisible(true);
            });
        } catch (e) {

        }
    }

    return (pageLoading ?
            <Skeleton paragraph={{rows: 2}}/> :
            <React.Fragment>
                <div className='sub-content-header'>Stages</div>
                {candidateApplicationSummary.reviewsGroupedByStage?.length > 0 ?
                    candidateApplicationSummary.reviewsGroupedByStage?.map(reviewsPerStage => {
                            const {reviews} = reviewsPerStage;
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
                                            <Tag color='blue' style={{borderRadius: '15px', marginLeft: '30px'}}>Reviews
                                                - {reviews.length}</Tag>
                                            <Tag style={{borderRadius: '15px', marginLeft: '10px'}}>No
                                                - {numberOfNos}</Tag>
                                            <Tag style={{borderRadius: '15px', marginLeft: '10px'}}>Maybe
                                                - {numberOfMaybes}</Tag>
                                            <Tag style={{borderRadius: '15px', marginLeft: '10px'}}>Yes
                                                - {numberOfYes}</Tag>
                                        </div>} key='1'>
                                            <div>
                                                <div className='sub-content'>
                                                    <div className='sub-content-header'>SEO'S DECISION</div>
                                                    <div className='flex-1'>Decision
                                                        - <span
                                                            style={seoDecisionStyle}>{reviewsPerStage.seoDecision}</span> by {reviewsPerStage.seoDecisionMadeBy}
                                                    </div>
                                                    <div>
                                                        {reviewsPerStage.seoRemarks && <div>
                                                            <div>Remark - {reviewsPerStage.seoRemarks}</div>
                                                        </div>}
                                                    </div>
                                                </div>

                                                <div className='sub-content-header'>ALUMNAE Review</div>
                                                {reviews.map(review => {
                                                    const decisionStyle = {};
                                                    if (review.decision.includes('YES')) {
                                                        decisionStyle.color = 'green';
                                                    } else if (review.decision.includes('NO')) {
                                                        decisionStyle.color = 'red';
                                                    } else {
                                                        decisionStyle.color = 'orange';
                                                    }
                                                    return (
                                                        <div style={{marginBottom: '40px'}}>
                                                            <div className='data-row'>
                                                                <div className='flex-1'>Reviewer's Name
                                                                    - {review.reviewerName}</div>
                                                                <div className='flex-1'>SEO YEAR
                                                                    - {review.reviewerSeoYear || 'N/A'}</div>
                                                            </div>
                                                            <div className='data-row'>
                                                                <div className='flex-1'>Review Type
                                                                    - {review.reviewType}</div>
                                                                <div className='flex-1'>Reviewer's
                                                                    Decision
                                                                    - <span
                                                                        style={decisionStyle}>{review.decision}</span>
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
                                                                {!review.hasMoreDetails && <div>
                                                                    <Button className='btn'
                                                                            onClick={() => onSeeMoreDetails(review.code)}>See
                                                                        details</Button>
                                                                </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Panel>
                                    </Collapse>
                                </div>

                            )
                        }
                    ) : 'NO REVIEWS FOUND'}

                <Modal
                    visible={modalVisible}
                    title='Review Details'
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                >
                    <div>
                        <div className='margin-bottom-20'>
                            {extraReviewDetails.details?.map(review => {
                                return (
                                    <div className='flex space-between'>
                                        <p className='semi-bold'>{review.title}</p>
                                        <p className='semi-bold'>Grade: {review.grade}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <p className='semi-bold'>Final Remark/comment</p>
                            <p>{extraReviewDetails.comment}</p>
                        </div>
                        <div>
                            <p className='semi-bold'>Final Score: {extraReviewDetails.finalScore}</p>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
    );
}


export default CandidateApplicationReviews;
