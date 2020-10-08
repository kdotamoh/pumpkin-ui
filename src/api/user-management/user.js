import { message } from 'antd';
import client from '../../api';
import store from '../../app/store';

function getToken() {
  return store ? store.getState().user.userToken : undefined;
}

export async function validateUser(reference) {
  try {
    const { data } = await client.get(`/activate/${reference}`);
    const { requestSuccessful } = data;
    return requestSuccessful;
  } catch (err) {
    const {
      data: { responseMessage, requestSuccessful },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
    return requestSuccessful;
  }
}

export async function activateUser(reference, data) {
  try {
    const { data: res } = await client.post(`/activate/${reference}`, data);
    const { requestSuccessful, responseMessage } = res;
    return { requestSuccessful, responseMessage };
  } catch (err) {
    const {
      data: { requestSuccessful, responseMessage },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
    return { requestSuccessful, responseMessage };
  }
}

export async function resetPassword(email) {
  try {
    const { data } = await client.put(
      `/users/reset-password?username=${email}`
    );
    const { requestSuccessful } = data;
    return requestSuccessful;
  } catch (err) {
    const {
      data: { requestSuccessful, responseMessage },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
    return { requestSuccessful, responseMessage };
  }
}

export async function changePassword(values) {
  try {
    const { data } = await client.put(
      '/users/change-password',
      { ...values },
      {
        headers: {
          user_token: getToken(),
        },
      }
    );
    return data;
  } catch (err) {
    const {
      data: { requestSuccessful, responseMessage },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
    return { requestSuccessful, responseMessage };
  }
}
