import { message } from 'antd';
import client from '../api';
import store from '../app/store';

let token;
if (store) {
  token = store.getState().user.userToken;
}

export async function createCycle(cycle) {
  try {
    const { data } = await client.post(
      '/recruitment/cycle/create',
      { ...cycle },
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
      `Cannot create recruitment cycle with name - ${cycle.recruitmentCycleName}: ${responseMessage}`
    );
  }
}

export async function getCycles() {
  try {
    const { data } = await client.get('/recruitment/cycle/all', {
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
    const { data } = await client.delete(`/recruitment/cycle/delete/${code}`, {
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

export async function getCycleByCode(code) {
  try {
    const { data } = await client.get(`/recruitment/cycle/${code}`, {
      headers: {
        user_token: token,
      },
    });
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot get recruitment cycle with code ${code}: ${responseMessage}`
    );
  }
}

export async function updateCycle(details, code) {
  try {
    const { data } = await client.put(
      '/recruitment/cycle/update',
      { ...details, code },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Update success');
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

export async function updateCycleStage(details, code) {
  try {
    const { data } = await client.put(
      `/recruitment/cycle/${code}/update/stage`,
      { ...details },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Update success');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot update recruitment cycle stage: ${responseMessage}`);
  }
}

export async function deleteCycleStage(stageCode, code) {
  try {
    const { data } = await client.delete(
      `/recruitment/cycle/${code}/delete/stage?stageCode=${stageCode}`,
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Stage deleted');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot delete recruitment cycle stage: ${responseMessage}`);
  }
}

export async function addCycleStage(details, code) {
  try {
    const { data } = await client.post(
      `/recruitment/cycle/${code}/add/stage`,
      { ...details },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Stage added to cycle');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot add recruitment cycle stage: ${responseMessage}`);
  }
}

export async function deactivateCycle(code) {
  try {
    const { data } = await client.patch(
      `/recruitment/cycle/deactivate/${code}`,
      null,
      {
        headers: {
          user_token: store.getState().user.userToken,
        },
      }
    );
    const { responseBody } = data;
    message.success('Cycle deactivated');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot deactivate recruitment cycle with code ${code}: ${responseMessage}`
    );
  }
}

export async function reactivateCycle(code) {
  try {
    const { data } = await client.delete(
      `/recruitment/cycle/reactivate/${code}`,
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
      `Cannot reactivate recruitment cycle with code ${code}: ${responseMessage}`
    );
  }
}

export async function addCycleForm(code, form) {
  try {
    const { data } = await client.post(
      `/recruitment/cycle/${code}/add/form`,
      { form },
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
    message.error(`Cannot add recruitment cycle form: ${responseMessage}`);
  }
}

export async function updateCycleForm(code, form) {
  try {
    const { data } = await client.put(
      `/recruitment/cycle/${code}/update/form`,
      { form },
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
    message.error(`Cannot update recruitment cycle form: ${responseMessage}`);
  }
}

export async function deleteCycleForm(code, formCode) {
  try {
    const { data } = await client.delete(
      `/recruitment/cycle/${code}/delete/form?formCode=${formCode}`,
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
    message.error(`Cannot delete recruitment cycle form: ${responseMessage}`);
  }
}

export async function deactivateCycleForm(code, formCode) {
  try {
    const { data } = await client.patch(
      `/recruitment/cycle/${code}/deactivate/form?formCode=${formCode}`,
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
      `Cannot deactivate recruitment cycle form: ${responseMessage}`
    );
  }
}

export async function addCycleEssayQuestion(question, code) {
  try {
    const { data } = await client.post(
      `/recruitment/cycle/${code}/add/essay-question`,
      { ...question },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Update success');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot add recruitment cycle question: ${responseMessage}`);
  }
}

export async function updateCycleEssayQuestion(details, code) {
  try {
    const { data } = await client.put(
      `/recruitment/cycle/${code}/update/essay-question`,
      { ...details },
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Update success');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot update recruitment cycle question: ${responseMessage}`
    );
  }
}

export async function deleteCycleEssayQuestion(essayCode, code) {
  try {
    const { data } = await client.delete(
      `/recruitment/cycle/${code}/delete/essay-question?essayCode=${essayCode}`,
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Delete success');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(
      `Cannot delete recruitment cycle question: ${responseMessage}`
    );
  }
}

export async function addCycleTrack(trackCode, code) {
  try {
    const { data } = await client.post(
      `/recruitment/cycle/${code}/add/track?trackCode=${trackCode}`,
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Track add to cycle');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot add recruitment cycle track: ${responseMessage}`);
  }
}

export async function deleteCycleTrack(trackCode, code) {
  try {
    const { data } = await client.delete(
      `/recruitment/cycle/${code}/delete/track?trackCode=${trackCode}`,
      {
        headers: {
          user_token: token,
        },
      }
    );
    const { responseBody } = data;
    message.success('Track removed from cycle');
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot delete recruitment cycle track: ${responseMessage}`);
  }
}
