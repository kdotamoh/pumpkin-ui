import {downloadCandidateDocument} from '../../../../api/candidate-application';
import React from 'react';
import {Skeleton} from 'antd';
import Picture from '../../../../assets/svg/picture 1.svg' ;
import Paper from '../../../../assets/svg/paper 1.svg' ;
import Download from '../../../../assets/svg/download 1.svg';

const CandidateApplicationDocuments = ({candidateApplicationSummary, applicationReference, pageLoading}) => (
    pageLoading ?
        <Skeleton paragraph={{rows: 2}}/> :
        <React.Fragment>
            <div className="document_row">
                <div className="image_container">
                    <img src={Paper} alt="Paper" />
                </div>
                <div>
                    <p>Applicant Resume</p>
                    <button className="btn"
                            type="submit"
                            onClick={() => downloadCandidateDocument(candidateApplicationSummary.linkToCv, applicationReference)}>
                        Download <img src={Download} alt="Download"/>
                    </button>
                </div>
            </div>

            <div className="document_row">
                <div className="image_container">
                    <img src={Picture} alt="Paper" />
                </div>
                <div>
                    <p>Applicant Photograph</p>
                    <button className="btn"
                            type="submit"
                            onClick={() => downloadCandidateDocument(candidateApplicationSummary.linkToHeadShot, applicationReference)}>
                        Download <img src={Download} alt="Download"/>
                    </button>
                </div>
            </div>

        </React.Fragment>
)

export default CandidateApplicationDocuments;