import React from "react";
import {Collapse, Skeleton, Tag} from "antd";

const {Panel} = Collapse;
const CandidateApplicationReviews = ({candidateApplicationSummary, pageLoading}) => (
    pageLoading ?
        <Skeleton paragraph={{rows: 2}}/> :
        <React.Fragment>
            <div className="sub-content-header">Stages</div>
            {candidateApplicationSummary.reviewsGroupedByStage?.length > 0 ?
                candidateApplicationSummary.reviewsGroupedByStage?.map(reviewsPerStage => {
                        const {reviews} = reviewsPerStage;
                        const numberOfNos = reviews.filter(review => review.decision?.includes('NO')).length;
                        const numberOfYes = reviews.filter(review => review.decision?.includes('YES')).length;
                        const numberOfMaybes = reviews.filter(review => review.decision?.includes('MAYBE')).length;

                        const seoDecisionStyle = {};
                        if (reviewsPerStage.seoDecision.includes("APPROVED")) {
                            seoDecisionStyle.color = "green";
                        } else if (reviewsPerStage.seoDecision.includes("REJECTED")) {
                            seoDecisionStyle.color = "red";
                        } else {
                            seoDecisionStyle.color = "orange";
                        }

                        return (
                            <Collapse expandIconPosition="right">
                                <Panel header={<div>
                                    {reviewsPerStage.stageName}
                                    <Tag color="blue" style={{borderRadius: "15px", marginLeft: "30px"}}>Reviews
                                        - {reviews.length}</Tag>
                                    <Tag style={{borderRadius: "15px", marginLeft: "10px"}}>No
                                        - {numberOfNos}</Tag>
                                    <Tag style={{borderRadius: "15px", marginLeft: "10px"}}>Maybe
                                        - {numberOfMaybes}</Tag>
                                    <Tag style={{borderRadius: "15px", marginLeft: "10px"}}>Yes
                                        - {numberOfYes}</Tag>
                                </div>} key="1">
                                    <div>
                                        <div className="sub-content">
                                            <div className="sub-content-header">SEO'S DECISION</div>
                                            <div className="flex-1">Decision
                                                - <span
                                                    style={seoDecisionStyle}>{reviewsPerStage.seoDecision}</span> by {reviewsPerStage.seoDecisionMadeBy}
                                            </div>
                                            <div>
                                                {reviewsPerStage.seoRemarks && <div>
                                                    <div>Remark - {reviewsPerStage.seoRemarks}</div>
                                                </div>}
                                            </div>
                                        </div>


                                        <div className="sub-content-header">ALUMNIS' Review</div>
                                        {reviews.map(review => {
                                            const decisionStyle = {};
                                            if (review.decision.includes("YES")) {
                                                decisionStyle.color = "green";
                                            } else if (review.decision.includes("NO")) {
                                                decisionStyle.color = "red";
                                            } else {
                                                decisionStyle.color = "orange";
                                            }
                                            return (
                                                <div style={{marginBottom: "40px"}}>
                                                    <div className="data-row">
                                                        <div className="flex-1">Reviewer's Name
                                                            - {review.reviewerName}</div>
                                                        <div className="flex-1">SEO YEAR
                                                            - {review.reviewerSeoYear || "N/A"}</div>
                                                    </div>
                                                    <div className="data-row">
                                                        <div className="flex-1">Review Type
                                                            - {review.reviewType}</div>
                                                        <div className="flex-1">Reviewer's
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
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Panel>
                            </Collapse>
                        )
                    }
                ) : "NO REVIEWS FOUND"}
        </React.Fragment>
);

export default CandidateApplicationReviews;