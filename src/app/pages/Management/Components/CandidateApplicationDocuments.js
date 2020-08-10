import {downloadFile} from "../../../../api/candidate-application";
import React from "react";

const CandidateApplicationDocuments = ({candidateApplicationSummary, applicationReference}) => (
    <>
        <div>
            <button className="btn"
                    type="submit"
                    onClick={() => downloadFile(candidateApplicationSummary.linkToCv, applicationReference)}>
                Resume
            </button>
        </div>
        <div>
            <button className="btn"
                    type="submit"
                    onClick={() => downloadFile(candidateApplicationSummary.linkToHeadShot, applicationReference)}>
                Applicant Passport
            </button>
        </div>
    </>
)

export default CandidateApplicationDocuments;