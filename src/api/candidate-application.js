import {message} from 'antd';
import client from '../api';
import store from '../app/store';

function getToken() {
    return store ? store.getState().user.userToken : undefined
}

export const getCandidates = async () => {
    try {
        const {data} = await client.get('/candidate-application/all', {
            headers: {
                user_token: getToken(),
            },
            params: {
                cycleReference: 'KRX8Y',
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

export const downloadFile = async (fileUrl, reference) => {


    console.log(`/candidate-application/download-file?applicationReference=${reference}&fileUrl=${fileUrl}`);
    const baseURL = `${process.env.REACT_APP_BASE_URL}/api/v1`;
    const url = `${baseURL}/candidate-application/download-file?applicationReference=${reference}&fileUrl=${fileUrl}&userToken=${getToken()}`;

    fetch(url)
        .then( res => res.blob() )
        .then( blob => {
            var file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        });

    // window.open(url, '_self');
}

