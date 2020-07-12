import { message } from 'antd';
import client from '../api';
import store from '../app/store';

let token;
if (store) {
  token = store.getState().user.userToken;
}

export async function createMajor(name, country) {
  try {
    const { data } = await client.post(
      '/course-of-study/create',
      { name, country },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Major added successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot create major with name - ${name}: ${responseMessage}`
    );
  }
}

export async function getMajors() {
  try {
    const { data } = await client.get('/course-of-study', {
      headers: {
        user_token: token,
      },
      params: {
        page: 0,
        size: 20,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get major: ${responseMessage}`);
  }
}

export async function deleteMajor(code) {
  try {
    const { data } = await client.delete(`/course-of-study/delete/${code}`, {
      headers: {
        user_token: token,
      },
    });
    const { responseBody } = data;
    message.success('Major removed successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot remove major with code ${code}: ${responseMessage}`);
  }
}

export async function updateMajor(name, code) {
  try {
    const { data } = await client.put(
      '/course-of-study/update',
      { name, code },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot update major with code ${code}: ${responseMessage}`);
  }
}
