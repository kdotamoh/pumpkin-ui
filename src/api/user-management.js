import { message } from 'antd';
import client from 'api';
import store from 'store';

export const baseURL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

// export interface Credentials {
//   email: string;
//   employeeId: string;
// }

// type Reference = string;

const token = store.getState().user.userToken;

export async function inviteEmployee(credentials) {
  try {
    const { data } = await client.post('/seo-employee/create', credentials, {
      headers: {
        // eslint-disable-next-line
        user_token: token,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
  }
}

export async function inviteAlum(credentials) {
  try {
    const { data } = await client.post('/seo-alum/create', credentials, {
      headers: {
        // eslint-disable-next-line
        user_token: token,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
  }
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
    const { requestSuccessful } = res;
    return requestSuccessful;
  } catch (err) {
    const {
      data: { responseMessage, requestSuccessful },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
    return { requestSuccessful, responseMessage };
  }
}
