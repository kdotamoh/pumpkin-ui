import { message } from 'antd';
import client from '../../api';
import store from '../../app/store';

function getToken() {
  return store ? store.getState().user.userToken : undefined
}

export async function inviteEmployee(email, employeeId) {
  try {
    const { data } = await client.post(
      '/seo-employee/create',
      { email, employeeId },
      {
        headers: {
          user_token: getToken(),
        },
      }
    );
    const { responseBody } = data;
    message.success('Employee added successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot invite employee with email - ${email}: ${responseMessage}`
    );
  }
}

export async function getEmployees() {
  try {
    const { data } = await client.get('/seo-employee', {
      headers: {
        user_token: getToken(),
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
    message.error(`Cannot get employees: ${responseMessage}`);
  }
}

export async function searchEmployees(searchKey) {
  try {
    const { data } = await client.get('/seo-employee/search', {
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
    message.error(`Cannot search employees: ${responseMessage}`);
  }
}

export async function deleteEmployee(email) {
  try {
    const { data } = await client.delete(`/seo-employee/delete/${email}`, {
      headers: {
        user_token: getToken(),
      },
    });
    const { responseBody } = data;
    message.success('Employee removed successfully');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot remove employee with email ${email}: ${responseMessage}`
    );
  }
}
