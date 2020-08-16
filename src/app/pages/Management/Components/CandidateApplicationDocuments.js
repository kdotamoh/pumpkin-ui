import {downloadFile} from "../../../../api/candidate-application";
import React from "react";
import {Skeleton} from "antd";
import Picture from "../../../../assets/svg/picture 1.svg" ;
import Paper from "../../../../assets/svg/paper 1.svg" ;
import Download from "../../../../assets/svg/download 1.svg";

const CandidateApplicationDocuments = ({candidateApplicationSummary, applicationReference, pageLoading}) => (
    pageLoading ?
        <Skeleton paragraph={{rows: 2}}/> :
        <React.Fragment>
            <div className="document_row">
                <div className="image_container">
                    <img src={Paper} alt="Paper" />
                </div>
                <div>
                    <p>Applicant Resume - PDF</p>
                    <button className="btn"
                            type="submit"
                            onClick={() => downloadFile(candidateApplicationSummary.linkToCv, applicationReference)}>
                        Download
                    </button>
                    <img src={Download} alt="Download"/>
                </div>
            </div>

            <div className="document_row">
                <div className="image_container">
                    <img src={Picture} alt="Paper" />
                </div>
                <div>
                    <p>Applicant Passport - JPEG</p>
                    <button className="btn"
                            type="submit"
                            onClick={() => downloadFile(candidateApplicationSummary.linkToHeadShot, applicationReference)}>
                        Applicant Passport - JPEG
                    </button>
                    <img src={Download} alt="Download"/>
                </div>
            </div>

        </React.Fragment>
)

export default CandidateApplicationDocuments;