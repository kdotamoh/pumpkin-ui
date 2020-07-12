import { message } from 'antd';
import client from '../api';
import store from '../app/store';

let token;
if (store) {
  token = store.getState().user.userToken;
}

export async function createUniversity(name, country) {
  try {
    const { data } = await client.post(
      '/universities/create',
      { name, country },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('University added successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot create university with name - ${name}: ${responseMessage}`
    );
  }
}

export async function getUniversities() {
  try {
    const { data } = await client.get('/universities', {
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
    message.error(`Cannot get university: ${responseMessage}`);
  }
}

export async function deleteUniversity(code) {
  try {
    const { data } = await client.delete(`/universities/delete/${code}`, {
      headers: {
        user_token: token,
      },
    });
    const { responseBody } = data;
    message.success('University removed successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot remove university with code ${code}: ${responseMessage}`
    );
  }
}

export async function updateUniversity(name, code) {
  try {
    const { data } = await client.put(
      '/universities/update',
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
    message.error(
      `Cannot update university with code ${code}: ${responseMessage}`
    );
  }
}