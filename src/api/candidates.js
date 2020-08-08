import { message } from 'antd';
import client from '../api';

export async function submitCandidateApplicationForm(reference, values) {
  try {
    const response = await client.post(
      `/candidate-application?cycleReference=${reference}`,
      values,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response);
  } catch (err) {
    // const {
    //   data: { responseMessage, requestSuccessful },
    // } = err.response;
    message.error(`An error occurred: ${err}`);
    return err;
  }
}
