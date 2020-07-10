import { message } from 'antd';
import client from '../api';
import store from '../app/store';

let token;
if (store) {
  token = store.getState().user.userToken;
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
    message.error(`Cannot get universities: ${responseMessage}`);
  }
}

export async function addUniversity(name, country) {
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
    message.error(`Cannot add university: ${responseMessage}`);
  }
}

export async function updateUniversity(code, name, country) {
  try {
    const { data } = await client.put(
      '/universities/update',
      { code, name, country },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('University updated successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot update university: ${responseMessage}`);
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
    message.error(`Cannot remove university: ${responseMessage}`);
  }
}

export async function activateUniversity(code) {
  try {
    const { data } = await client.put(`/universities/activate/${code}`, {
      headers: {
        user_token: token,
      },
    });
    const { responseBody } = data;
    message.success('University activated successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot activate university: ${responseMessage}`);
  }
}

export async function getUniversityMajors() {
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
    message.error(`Cannot get university majors: ${responseMessage}`);
  }
}

export async function addUniversityMajor(name, country) {
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
    message.success('University major added successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot add university major: ${responseMessage}`);
  }
}

export async function updateUniversityMajor(code, name) {
  try {
    const { data } = await client.put(
      '/course-of-study/update',
      { code, name },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('University major updated successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot update university major: ${responseMessage}`);
  }
}

export async function deleteUniversityMajor(code) {
  try {
    const { data } = await client.delete(`/course-of-study/delete/${code}`, {
      headers: {
        user_token: token,
      },
    });
    const { responseBody } = data;
    message.success('University major removed successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot remove university major: ${responseMessage}`);
  }
}

export async function activateUniversityMajor(code) {
  try {
    const { data } = await client.put(`/course-of-study/activate/${code}`, {
      headers: {
        user_token: token,
      },
    });
    const { responseBody } = data;
    message.success('University major activated successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot activate university major: ${responseMessage}`);
  }
}
