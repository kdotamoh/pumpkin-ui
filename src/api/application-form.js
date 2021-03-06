import { message } from 'antd';
import client from '../api';

export async function validateForm(reference) {
  try {
    const { data } = await client.get(
      `/application-form/validate?formReference=${reference}`
    );
    const { requestSuccessful, responseBody } = data;
    return { requestSuccessful, responseBody };
  } catch (err) {
    const {
      data: { responseMessage, requestSuccessful },
    } = err.response;
    return { requestSuccessful, responseMessage };
  }
}

export async function getCountries() {
  try {
    const { data } = await client.get('/application-form/countries');
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get countries: ${responseMessage}`);
  }
}

export async function getAcademicStandings() {
  try {
    const { data } = await client.get('/application-form/academic-standings');
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get academic standings: ${responseMessage}`);
  }
}

export async function getGenders() {
  try {
    const { data } = await client.get('/application-form/genders');
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get genders: ${responseMessage}`);
  }
}

export async function getApplicationTracks(cycleReference) {
  try {
    const { data } = await client.get(
      `/application-form/tracks?cycleReference=${cycleReference}`
    );
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get application tracks: ${responseMessage}`);
  }
}

export async function getApplicationEssayQuestions(cycleReference) {
  try {
    const { data } = await client.get(
      `/application-form/essay-questions?cycleReference=${cycleReference}`
    );
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get application essay questions: ${responseMessage}`);
  }
}

export async function validateEssayQuestion(questionCode) {
  try {
    const { data } = await client.get(
      `/essay-questions/validate?essayQuestionCode=${questionCode}`
    );
    const { requestSuccessful, responseBody } = data;
    return { requestSuccessful, responseBody };
  } catch (err) {
    const {
      data: { responseMessage, requestSuccessful },
    } = err.response;
    message.error(`An error occurred: ${responseMessage}`);
    return { requestSuccessful, responseMessage };
  }
}

export async function submitAdditionalEssay(values) {
  try {
    const { data } = await client.post(
      '/essay-questions/additional-essay/submit',
      values
    );
    const { requestSuccessful, responseMessage } = data;
    return { requestSuccessful, responseMessage };
  } catch (err) {
    const {
      data: { responseMessage, requestSuccessful },
    } = err.response;
    return { requestSuccessful, responseMessage };
  }
}

export async function getUniversities(country) {
  try {
    const { data } = await client.get(
      `/application-form/universities?country=${country}`
    );
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get university: ${responseMessage}`);
  }
}

export async function getMajors() {
  try {
    const { data } = await client.get('/application-form/university-majors');
    const { responseBody } = data;
    return responseBody;
  } catch (err) {
    const {
      data: { responseMessage },
    } = err.response;
    message.error(`Cannot get major: ${responseMessage}`);
  }
}
