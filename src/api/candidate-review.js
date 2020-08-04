import { message } from 'antd';
import client from '.';
import store from '../app/store';

function getToken() {
  return store ? store.getState().user.userToken : undefined
}

export async function getRecruitmentCycleReviewSummary(cycleReference) {
  try {
    const { data } = await client.get('/candidate-review/cycle-summary', {
      headers: {
        user_token: getToken(),
      },
      params: {
        cycleReference,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get recruitment cycle review summary: ${responseMessage}`);
  }
}

export async function getApplicationReviewerSummary(reviewerCode) {
  try {
    const { data } = await client.get('/candidate-review/reviewer-summary', {
      headers: {
        user_token: getToken(),
      },
      params: {
        reviewerCode,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get application reviewer summary: ${responseMessage}`);
  }
}

export async function getCandidateApplicationReviews(reviewerCode, seoDecision) {
  try {
    const { data } = await client.get('/candidate-review', {
      headers: {
        user_token: getToken(),
      },
      params: {
        page: 0,
        size: 20,
        reviewerCode,
        seoDecision,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get candidate application reviews summary: ${responseMessage}`);
  }
}

export async function searchCandidateApplicationReviews(reviewerCode, seoDecision, searchKey) {
  try {
    const { data } = await client.get('/candidate-review/search', {
      headers: {
        user_token: getToken(),
      },
      params: {
        page: 0,
        size: 20,
        reviewerCode,
        seoDecision,
        searchKey,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get candidate application reviews summary: ${responseMessage}`);
  }
}

export async function makeFinalDecision(applicationReference, seoDecision) {
  try {
    const { data } = await client.put(`/candidate-review/approve/${applicationReference}`,
      seoDecision,
      {
        headers: {
          user_token: getToken(),
        },

      });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot make SEO decision on candidate: ${responseMessage}`);
  }
}