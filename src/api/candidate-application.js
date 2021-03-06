import { message } from 'antd';
import client, { baseURL } from '../api';
import store from '../app/store';
import { downloadFile } from '../app/utils/download-util';

function getToken() {
  return store ? store.getState().user.userToken : undefined;
}

export const getCandidates = async (cycleReference, currentPage) => {
  try {
    const { data } = await client.get('/candidate-application/all', {
      headers: {
        user_token: getToken()
      },
      params: {
        cycleReference,
        page: currentPage,
        size: 10
      }
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Cannot get candidates: ${responseMessage}`);
  }
};

export const getCandidateSummary = async (reference) => {
  try {
    const { data } = await client.get(`/candidate-application/${reference}`, {
      headers: {
        user_token: getToken()
      }
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Cannot get candidates: ${responseMessage}`);
  }
};

export const getCountriesForSearch = async () => {
  try {
    const { data } = await client.get(
      '/candidate-application/search/countries/',
      {
        headers: {
          user_token: getToken()
        }
      }
    );
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Cannot get countries for search: ${responseMessage}`);
  }
};

export const getRecruitmentCycleDetails = async (code) => {
  try {
    const { data } = await client.get(`/recruitment/cycle/${code}`, {
      headers: {
        user_token: getToken()
      }
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Cannot get recruitment cycle details: ${responseMessage}`);
  }
};

export const searchCandidateApplications = async (
  searchKeys,
  cycleReference
) => {
  try {
    const { data } = await client.get('/candidate-application/search', {
      headers: {
        user_token: getToken()
      },
      params: {
        recruitmentCycleCode: cycleReference,
        firstChoice: searchKeys.trackCode,
        currentStage: searchKeys.stageCode,
        country: searchKeys.country,
        universityName: searchKeys.university,
        status: searchKeys.status,
        searchKey: searchKeys.searchKey,
        page: 0,
        size: 10
      }
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Cannot get candidates: ${responseMessage}`);
  }
};

export const getReviewTypes = async () => {
  try {
    const { data } = await client.get('/candidate-review/review-types', {
      headers: {
        user_token: getToken()
      }
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Cannot load review types: ${responseMessage}`);
  }
};

export const getApplicationStages = async () => {
  try {
    const { data } = await client.get('/candidate-application/search', {
      headers: {
        user_token: getToken()
      }
    });
    return data;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Cannot load application stages: ${responseMessage}`);
  }
};

export const addReview = async (review) => {
  try {
    const { data } = await client.post('/candidate-review', review, {
      headers: {
        user_token: getToken()
      }
    });
    message.success('Review added successfully');
    return data;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;

    message.error(`Cannot add Review: ${responseMessage}`);
    return 'error';
  }
};

export const makeFinalDecision = async (applicationReference, seoDecision) => {
  try {
    const { data } = await client.put(
      `/candidate-review/approve/${applicationReference}`,
      seoDecision,
      {
        headers: {
          user_token: getToken()
        }
      }
    );
    message.success('Decision added');
    return data;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Cannot make final decision: ${responseMessage}`);
    return 'error';
  }
};

export const seeMoreReviewDetails = async (reviewCode) => {
  try {
    const { data } = await client.get('/candidate-review/details', {
      headers: {
        user_token: getToken()
      },
      params: {
        reviewCode
      }
    });
    return data.responseBody;
  } catch (err) {
    const {
      data: { responseMessage }
    } = err.response;
    message.error(`Could not view more details: ${responseMessage}`);
    return 'error';
  }
};

export const exportCandidates = async (searchKeys) => {
  searchKeys.firstChoice = searchKeys.trackCode;
  searchKeys.currentStage = searchKeys.stageCode;
  searchKeys.universityName = searchKeys.university;

  let url = `${baseURL}/candidate-application/export`;

  const keys = Object.keys(searchKeys);
  let query = '';

  keys.forEach((key) => {
    if (searchKeys[key]) {
      query += key + '=' + searchKeys[key] + '&';
    } else {
      query += key + '=&';
    }
  });

  url = url + '?' + query;
  if (url.endsWith('&')) url = url.substring(0, url.length - 1);
  downloadFile(
    url,
    { user_token: getToken() },
    `Candidate Applications - ${searchKeys.recruitmentCycleCode}`,
    'csv'
  );
};

export const downloadCandidateDocument = (fileUrl, reference) => {
  const url = `${baseURL}/candidate-application/download-file?applicationReference=${reference}&fileUrl=${fileUrl}&userToken=${getToken()}`;
  const fileFullPath = fileUrl.split('/').pop();

  let fileName = '';
  let fileType = '';
  for (let i = fileFullPath.length; i > 0; i--) {
    if (fileFullPath[i] === '.') {
      fileName = fileFullPath.substring(0, i);
      fileType = fileFullPath.substring(i + 1, fileFullPath.length);
      break;
    }
  }

  downloadFile(url, {}, fileName, fileType);
};
