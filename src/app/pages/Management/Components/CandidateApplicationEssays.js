import React from "react";

const CandidateApplicationEssays = ({candidateApplicationSummary}) => (
    candidateApplicationSummary.essays?.map(essay => (
        <div className="sub-content">
            <div
                className="sub-content-header">{essay.essayQuestion} [{essay.essayQuestionWordCount} words]
            </div>
            <div>
                <div className="data-row">
                    <div className="flex-1">University
                        - {essay.candidateResponse}</div>
                </div>
            </div>
            <div
                className={`word_count_row ${essay.responseWordCount >= essay.essayQuestionWordCount / 2 ? "text-green" : "text-red"}`}>
                Word Count: {essay.wordCount} words
            </div>
        </div>
    ))
);

export default CandidateApplicationEssays;