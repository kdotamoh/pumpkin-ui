import React from "react";
import {Skeleton} from "antd";

const CandidateApplicationEssays = ({candidateApplicationSummary, pageLoading}) => {
    return (
        pageLoading ?
            <Skeleton paragraph={{rows: 4}}/> :
            <React.Fragment>
                {candidateApplicationSummary.essays?.map(essay => (
                    <div className="sub-content">
                        <div
                            className="sub-content-header">{essay.essayQuestion} [{essay.essayQuestionWordCount} words]
                        </div>
                        <div>
                            <div className="data-row">
                                <div className="flex-1">
                                    {essay.candidateResponse.split('\n')
                                        .map(item => <p>{item}</p>)}</div>
                            </div>
                        </div>
                        <div
                            className={`word_count_row ${essay.responseWordCount >= essay.essayQuestionWordCount / 2 ? "text-green" : "text-red"}`}>
                            Word Count: {essay.responseWordCount} words
                        </div>
                    </div>
                ))}
            </React.Fragment>

    );
}

export default CandidateApplicationEssays;