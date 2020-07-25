import { message } from 'antd';
import client from '../api';

export async function submitCandidateApplicationForm(reference, values) {
  try {
    const { data } = await client.post(
      `/candidate-application?cycleReference=${reference}`,
      values,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const { requestSuccessful, responseBody } = data;
    return { requestSuccessful, responseBody };
  } catch (err) {
    const {
      data: { responseMessage, requestSuccessful },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
    return requestSuccessful;
  }
}
