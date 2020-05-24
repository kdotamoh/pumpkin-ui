import { message } from 'antd';
import client from '../../api';

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
