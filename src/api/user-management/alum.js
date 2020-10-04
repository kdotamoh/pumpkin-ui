import { message } from 'antd';
import client from '../../api';
import store from '../../app/store';

function getToken() {
  return store ? store.getState().user.userToken : undefined;
}

export async function inviteAlum(email, seoGraduationYear) {
  try {
    const { data } = await client.post(
      '/seo-alum/create',
      { email, seoGraduationYear },
      {
        headers: {
          user_token: getToken(),
        },
      }
    );
    const { responseBody } = data;
    message.success('Alumnus added successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot invite alumus with email - ${email}: ${responseMessage}`
    );
  }
}

export async function getAlumni(currentPage) {
  try {
    const { data } = await client.get('/seo-alum', {
      headers: {
        user_token: getToken(),
      },
      params: {
        page: currentPage,
        size: 10,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get alumni: ${responseMessage}`);
  }
}

export async function searchAlumni(searchKey) {
  try {
    const { data } = await client.get('/seo-alum/search', {
      headers: {
        user_token: getToken(),
      },
      params: {
        page: 0,
        size: 20,
        searchKey,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot search alumni: ${responseMessage}`);
  }
}

export async function deleteAlum(email) {
  try {
    const { data } = await client.delete(`/seo-alum/delete/${email}`, {
      headers: {
        user_token: getToken(),
      },
    });
    const { responseBody } = data;
    message.success('Alumnus removed successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot remove alumus with email ${email}: ${responseMessage}`
    );
  }
}
