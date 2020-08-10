import client from '../api';

export async function submitCandidateApplicationForm(reference, values) {
  let formData = new FormData();
  for (const key in values) {
    if (key == 'essays') {
      values[key].forEach((val, index) => {
        for (const v in val) {
          formData.append(`${key}[${index}].${v}`, val[v]);
        }
      });
      continue;
    }
    if (key == 'dateOfBirth' || key == 'graduationDate') {
      values[key] = values[key] + ' 00:00:00';
    }
    if (key == 'candidateCV' || key == 'candidatePhoto') {
      values[key] = values[key].file;
    }
    formData.append(key, values[key]);
  }

  try {
    const { data } = await client.post(
      `/candidate-application?cycleReference=${reference}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const { requestSuccessful, responseMessage } = data;
    return { requestSuccessful, responseMessage };
  } catch (err) {
    const {
      data: { responseMessage, requestSuccessful },
    } = err.response;
    return { responseMessage, requestSuccessful };
  }
}
