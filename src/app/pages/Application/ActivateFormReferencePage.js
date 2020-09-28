import React from 'react';
import {
  validateApplicationForm,
  getApplicationEssayQuestions,
} from '../../store/actions/application-form-actions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import {
  formValidationError,
  formValidationLoading,
} from './FormValidationHelper';

export const validateRef = async (dispatch) => {
  const urlParams = new URLSearchParams(window.location.search);
  const reference = urlParams.get('ref');
  sessionStorage.setItem('applicationFormReference', reference);
  dispatch(validateApplicationForm(reference));

  const cycleRef = urlParams.get('cycle');
  await dispatch(getApplicationEssayQuestions(cycleRef));
};

const ActivateFormReferencePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cycleRef = sessionStorage.getItem('cycleReference');
  React.useEffect(async () => {
    await validateRef(dispatch, cycleRef);
  }, []);
  const formStatus = useSelector((state) => state.applicationForm.formStatus);
  const questions = useSelector(
    (state) => state.applicationForm.essayQuestions
  );

  if (formStatus.valid) {
    return (
      <React.Fragment>
        <div className="application-page-component__body">
          <div className="application-page-component__track-name">
            {`${formStatus.cycleDetails.year} ${formStatus.cycleDetails.name} Application`}
          </div>
          <p>
            Thank you for considering applying for this position. Note that your
            application cannot be saved and will need to be submitted
            immediately once started. However, you can click through to see what
            is required before submitting.
          </p>
          <p>
            As part of your application you will be required to answer the
            following questions:
          </p>
          <ul>
            {questions.map((essay) => (
              <li key={essay.code}>{essay.question}</li>
            ))}
          </ul>
          <p>
            Additionally, you will be required to upload the following
            documents:
          </p>
          <ul>
            <li>Your CV</li>
            <li>A recent photograph of yourself</li>
          </ul>
          <p>
            This website works best in Chrome. Be sure to backup whatever
            information you submit.
          </p>
          <p>
            If you have any questions, send an email to{' '}
            <a href="mailto:info@seo-africa.org"> info@seo-africa.org</a>.
          </p>
        </div>
        <Button
          type="primary"
          onClick={() =>
            history.push(
              `/apply/application-form/?ref=${sessionStorage.getItem(
                'applicationFormReference'
              )}`
            )
          }
          className="application-page-component__primary"
        >
          Start
        </Button>
      </React.Fragment>
    );
  } else if (formStatus.valid === false) {
    return formValidationError(formStatus.error);
  }
  return formValidationLoading();
};

export default ActivateFormReferencePage;
