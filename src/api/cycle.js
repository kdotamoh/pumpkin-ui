import { message } from 'antd';
import client from '../api';
import store from '../app/store';

let token;
if (store) {
  token = store.getState().user.userToken;
}

export async function createCycle(name) {
  try {
    const { data } = await client.post(
      '/recruitment-cycle/create',
      { name },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Recruitment cycle added successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot create recruitment cycle with name - ${name}: ${responseMessage}`
    );
  }
}

export async function getCycles() {
  try {
    const { data } = await client.get('/recruitment-cycle', {
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
    message.error(`Cannot get recruitment cycles: ${responseMessage}`);
  }
}

export async function deleteCycle(code) {
  try {
    const { data } = await client.delete(`/recruitment-cycle/delete/${code}`, {
      headers: {
        user_token: token,
      },
    });
    const { responseBody } = data;
    message.success('Recruitment cycle removed successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot remove recruitment cycle with code ${code}: ${responseMessage}`
    );
  }
}

export async function updateCycle(name, code) {
  try {
    const { data } = await client.put(
      '/recruitment-cycle/update',
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
      `Cannot update recruitment cycle with code ${code}: ${responseMessage}`
    );
  }
}
