import React from "react";
import {Skeleton} from "antd";

const CandidateApplicationDetails = ({candidateApplicationSummary, pageLoading}) => {
    const stageStyle = {color: 'orange'};
    if (candidateApplicationSummary.decisionAtStage === 'YES') {
        stageStyle.color = 'green';
    } else if (candidateApplicationSummary.decisionAtStage === 'NO'){
        stageStyle.color = "red";
    }

    return (
        pageLoading ?
            <Skeleton paragraph={{rows: 7}}/> :
            <React.Fragment>
                <div className="sub-content">
                    <div className="sub-content-header">Personal Information</div>
                    <div>
                        <div className="data-row">
                            <div className="flex-1">First Name
                                - {candidateApplicationSummary.firstName}</div>
                            <div className="flex-1">Last Name - {candidateApplicationSummary.lastName}</div>
                        </div>
                        <div className="data-row">
                            <div className="flex-1">Date of Birth
                                - {candidateApplicationSummary.dateOfBirth?.substring(0, 10)}</div>
                            <div className="flex-1">Gender - {candidateApplicationSummary.gender}</div>
                        </div>
                        <div className="data-row">
                            <div className="flex-1">Phone Number
                                - {candidateApplicationSummary.phoneNumber}</div>
                            <div className="flex-1">Secondary Phone Number
                                - {candidateApplicationSummary.secondaryPhoneNumber || "N/A"}</div>
                        </div>
                        <div className="data-row">
                            <div className="flex-1">Email - {candidateApplicationSummary.email}</div>
                        </div>
                    </div>
                </div>

                <div className="sub-content">
                    <div className="sub-content-header">Application</div>
                    <div>
                        <div className="data-row">
                            <div className="flex-1">Initial Application Year
                                - {candidateApplicationSummary.initialApplicationYear}</div>
                            <div className="flex-1">Current Stage
                                - <span style={stageStyle}>{candidateApplicationSummary.applicationStage}</span>
                            </div>
                        </div>
                        <div className="data-row">
                            <div className="flex-1">First Choice
                                - {candidateApplicationSummary.firstChoice?.name}</div>
                            <div className="flex-1">Second Choice
                                - {candidateApplicationSummary.secondChoice?.name}</div>
                        </div>
                        <div className="data-row">
                            <div className="flex-1">Applied Using This Link
                                - {candidateApplicationSummary.applicationForm || "N/A"}</div>
                        </div>
                    </div>
                </div>

                <div className="sub-content">
                    <div className="sub-content-header">Education</div>
                    <div>
                        <div className="data-row">
                            <div className="flex-1">University
                                - {candidateApplicationSummary.university}</div>
                        </div>
                        <div className="data-row">
                            <div className="flex-1">Course of Study
                                - {candidateApplicationSummary.courseOfStudy}</div>
                            <div className="flex-1">Academic Standing
                                - {candidateApplicationSummary.academicStanding}</div>
                        </div>
                        <div className="data-row">
                            <div className="flex-1">Current GPA
                                - {candidateApplicationSummary.currentGpa}</div>
                            <div className="flex-1">Country of Study
                                - {candidateApplicationSummary.countryOfStudy}</div>
                        </div>

                        <div className="data-row">
                            <div className="flex-1">Graduation Date
                                - {candidateApplicationSummary.graduationDate?.substring(0, 10)}</div>
                            <div className="flex-1">High School Attended
                                - {candidateApplicationSummary.highSchoolAttended}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )
}


export default CandidateApplicationDetails;
