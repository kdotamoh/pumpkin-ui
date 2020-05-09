import client from 'api';

export interface Credentials {
  username: string;
  password: string;
}

export async function login(credentials: Credentials): Promise<any> {
  try {
    const { data } = await client.post('/auth/login', credentials);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
