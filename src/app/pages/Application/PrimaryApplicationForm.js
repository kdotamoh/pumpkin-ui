import { ApplicationSteps } from './ApplicationSteps';
import { useSelector, useDispatch } from 'react-redux';
import { submitCandidateApplicationForm } from 'app/store/actions/candidate-actions';
import { BasicInformation } from './steps/BasicInformation';
import { EducationalBackground } from './steps/EducationalBackground';
import { ApplicationInformation } from './steps/ApplicationInformation';
import React from 'react';
import { validateRef } from './ActivateFormReferencePage';
import {
  formValidationError,
  formValidationLoading,
  formSubmissionSuccess,
  formSubmissionError,
} from './FormValidationHelper';

export const PrimaryApplicationForm = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    validateRef(dispatch);
  }, []);
  const formValid = useSelector(
    (state) => state.applicationForm.formStatus.valid
  );
  const formError = useSelector(
    (state) => state.applicationForm.formStatus.error
  );
  const essays = useSelector((state) => state.applicationForm.essayResponse);
  const submissionResponse = useSelector(
    (state) => state.applicationForm.submissionStatus.submissionResponse
  );
  const submissionError = useSelector(
    (state) => state.applicationForm.submissionStatus.error
  );

  if (formValid) {
    if (submissionResponse === 'success') {
      return formSubmissionSuccess();
    }
    if (submissionResponse === 'failure') {
      return formSubmissionError(submissionError);
    }
    return (
      <ApplicationSteps
        steps={[
          {
            title: 'Basic Information',
            content: BasicInformation,
          },
          {
            title: 'Educational Background',
            content: EducationalBackground,
          },
          {
            title: 'Application Information',
            content: ApplicationInformation,
          },
        ]}
        onFinish={(values) => {
          const essayToSbumit = [...essays];
          essayToSbumit.map((essay) => {
            delete values[essay.essayQuestionCode];
          });
          values.essays = essayToSbumit;
          values.applicationFormReference = sessionStorage.getItem(
            'applicationFormReference'
          );

          const cycleReference = sessionStorage.getItem('cycleReference');
          dispatch(submitCandidateApplicationForm(cycleReference, values));
        }}
      />
    );
  } else if (formValid === false) {
    return formValidationError(formError);
  }
  return formValidationLoading();
};
