import {message} from 'antd';
import client from '../api';
import store from '../app/store';

function getToken() {
    return store ? store.getState().user.userToken : undefined
}

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
                stage: searchKeys.stageCode,
                country: searchKeys.country,
                universityName: searchKeys.university,
                status: searchKeys.status,
                page: 0,
                size: 20,
            },
        });
        console.log(data);
        const {responseBody} = data;
        return responseBody;
    } catch (err) {
        const {
            data: {responseMessage},
        } = err.response;
        message.error(`Cannot get candidates: ${responseMessage}`);
    }
}

export const downloadFile = async (fileUrl, reference) => {
    const baseURL = `${process.env.REACT_APP_BASE_URL}/api/v1`;
    const url = `${baseURL}/candidate-application/download-file?applicationReference=${reference}&fileUrl=${fileUrl}&userToken=${getToken()}`;

    window.open(url, '_self');
}

