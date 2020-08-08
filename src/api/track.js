import { message } from 'antd';
import client from '../api';
import store from '../app/store';

function getToken() {
  return store ? store.getState().user.userToken : undefined;
}

export async function createTrack(name) {
  try {
    const { data } = await client.post(
      '/application-track/create',
      { name },
      {
        headers: {
          user_token: getToken(),
        },
      }
    );
    const { responseBody } = data;
    message.success('Application track added successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot create application track with name - ${name}: ${responseMessage}`
    );
  }
}

export async function getTracks() {
  try {
    const { data } = await client.get('/application-track', {
      headers: {
        user_token: getToken(),
      },
      params: {
        page: 0,
        size: 50,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get application tracks: ${responseMessage}`);
  }
}

export async function deleteTrack(code) {
  try {
    const { data } = await client.delete(`/application-track/delete/${code}`, {
      headers: {
        user_token: getToken(),
      },
    });
    const { responseBody } = data;
    message.success('Application track removed successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot remove application track with code ${code}: ${responseMessage}`
    );
  }
}

export async function updateTrack(name, code) {
  try {
    const { data } = await client.put(
      '/application-track/update',
      { name, code },
      {
        headers: {
          user_token: getToken(),
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
      `Cannot update application track with code ${code}: ${responseMessage}`
    );
  }
}
