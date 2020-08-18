import {message} from 'antd';
import client from '../api';
import store from '../app/store';

function getToken() {
    return store ? store.getState().user.userToken : undefined
}

const fileDownload = require('js-file-download');

export const getCandidates = async (cycleReference) => {
    try {
        const {data} = await client.get('/candidate-application/all', {
            headers: {
                user_token: getToken(),
            },
            params: {
                cycleReference,
                page: 0,
                size: 20,
            },
        });
        const {responseBody} = data;
        return responseBody;
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot get candidates: ${responseMessage}`);
    }
}

export const getCandidateSummary = async (reference) => {
    try {
        const {data} = await client.get(`/candidate-application/${reference}`, {
            headers: {
                user_token: getToken(),
            }
        });
        const {responseBody} = data;
        return responseBody;
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot get candidates: ${responseMessage}`);
    }
}

export const getCountriesForSearch = async () => {
    try {
        const {data} = await client.get(`/candidate-application/search/countries/`, {
            headers: {
                user_token: getToken(),
            }
        });
        const {responseBody} = data;
        return responseBody;
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot get countries for search: ${responseMessage}`);
    }
}


export const getRecruitmentCycleDetails = async (code) => {
    try {
        const {data} = await client.get(`/recruitment/cycle/${code}`, {
            headers: {
                user_token: getToken(),
            }
        });
        const {responseBody} = data;
        return responseBody;
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot get recruitment cycle details: ${responseMessage}`);
    }
}

export const searchCandidateApplications = async (searchKeys, cycleReference) => {
    try {
        const {data} = await client.get('/candidate-application/search', {
            headers: {
                user_token: getToken(),
            },
            params: {
                recruitmentCycleCode: cycleReference,
                firstChoice: searchKeys.trackCode,
                currentStage: searchKeys.stageCode,
                country: searchKeys.country,
                universityName: searchKeys.university,
                status: searchKeys.status,
                page: 0,
                size: 20,
            },
        });
        const {responseBody} = data;
        return responseBody;
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot get candidates: ${responseMessage}`);
    }
}

export const getReviewTypes = async () => {
    try {
        const {data} = await client.get('/candidate-review/review-types', {
            headers: {
                user_token: getToken(),
            }
        })
        const {responseBody} = data;
        return responseBody;
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot load review types: ${responseMessage}`);
    }

}

export const getApplicationStages = async () => {
    try {
        const {data} = await client.get('/candidate-application/search', {
            headers: {
                user_token: getToken(),
            },
            params: {
                // recruitmentCycleCode: cycleReference,
                // firstChoice: searchKeys.trackCode,
            }
        })
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot load application stages: ${responseMessage}`);
    }
}

export const addReview = async (review) => {
    console.log(review);
    try {
        const {data} = await client.post('/candidate-review', review, {
            headers: {
                user_token: getToken(),
            },
        });
        message.success("Review added successfully");
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot add Review: ${responseMessage}`);
    }
}

export const makeFinalDecision = async (applicationReference, seoDecision) => {
    console.log(applicationReference)
    console.log(seoDecision)
    try {
        const {data} = await client.put(`/candidate-review/approve/${applicationReference}`, seoDecision, {
            headers: {
                user_token: getToken(),
            },
        });
        message.success("Decision added");
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot make final decision: ${responseMessage}`);
    }
}

const showFile = (blob) => {

    var newBlob = new Blob([blob], {type: "image/png"})
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }     // For other browsers:    // Create a link pointing to the ObjectURL containing the blob. 
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = "file.png";
    link.click();
    setTimeout(function () {
        window.URL.revokeObjectURL(data);
    }, 100);
}

export const downloadFile = async (fileUrl, reference) => {
    const extensionMapper = {
        png: 'image/png', jpg: 'image/jpg', jpeg: 'image/jpeg', pdf: 'application/pdf', csv: 'text/csv'
    }
    console.log(fileUrl)
    const baseURL = `${process.env.REACT_APP_BASE_URL}/api/v1`;
    const url = `${baseURL}/candidate-application/download-file?applicationReference=${reference}&fileUrl=${fileUrl}&userToken=${getToken()}`;
    // const url = `${baseURL}/candidate-application/download-file?applicationReference=${reference}&fileUrl=${fileUrl}&userToken=${getToken()}`;
    // const url = `https://seo-pumpkin-service-staging.herokuapp.com/api/v1/candidate-application/download-file?applicationReference=H58UVFCHKD&fileUrl=gs://testing_env/Goldman_Spring_Programme/H58UVFCHKD/Untitled_Diagram.pdf&userToken=bc25393c004745c99103bd2d948551f31590490432596`;

    fetch(url)
        .then(res => {
            console.log(res);
            return res.blob()
        })
        .then(showFile)


    // .then(data => {
    //     fileDownload(data, "test.pdf");
    // }


    // const res = await client.get(url);
    // console.log(res);
    // fileDownload(res, "test.pdf");

    // window.open(url, '_self');
}

