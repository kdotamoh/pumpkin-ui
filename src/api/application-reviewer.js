import { message } from 'antd';
import client from '.';
import store from '../app/store';

function getToken() {
  return store ? store.getState().user.userToken : undefined;
}

export async function getApplicationReviewers(cycleReference, currentPage) {
  try {
    const { data } = await client.get('/application-reviewer', {
      headers: {
        user_token: getToken(),
      },
      params: {
        page: currentPage,
        size: 10,
        cycleReference,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get application reviewers: ${responseMessage}`);
  }
}

export async function searchApplicationReviewers(cycleReference, searchKey) {
  try {
    const { data } = await client.get('/application-reviewer/search', {
      headers: {
        user_token: getToken(),
      },
      params: {
        page: 0,
        size: 10,
        cycleReference,
        searchKey,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get application reviewers: ${responseMessage}`);
  }
}
