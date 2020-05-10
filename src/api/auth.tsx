import { message } from 'antd';

import client from 'api';

export interface Credentials {
  username: string;
  password: string;
}

export async function login(credentials: Credentials): Promise<any> {
  try {
    const { data } = await client.post('/auth/login', credentials);
    const { responseBody } = data;
    const { userToken } = responseBody;
    sessionStorage.setItem('token', userToken);
    console.log(responseBody);
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
  }
}
