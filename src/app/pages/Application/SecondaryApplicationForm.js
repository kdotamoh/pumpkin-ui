import { ApplicationSteps } from './ApplicationSteps';
import { useDispatch, useSelector } from 'react-redux';
import { SecondaryForm } from './steps/SecondaryForm';
import {
  submitAdditionalEssay,
  validateEssayQuestion,
} from 'app/store/actions/application-form-actions';
import React from 'react';
import {
  formValidationError,
  formValidationLoading,
  formSubmissionSuccess,
  formSubmissionError,
} from './FormValidationHelper';

export const SecondaryApplicationForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const questionCode = urlParams.get('questionCode');
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(validateEssayQuestion(questionCode));
  }, []);
  const essayQuestionStatus = useSelector(
    (state) => state.applicationForm.essayQuestionStatus.valid
  );
  const formError = useSelector(
    (state) => state.applicationForm.essayQuestionStatus.error
  );
  const submissionResponse = useSelector(
    (state) => state.applicationForm.submissionStatus.submissionResponse
  );
  const submissionError = useSelector(
    (state) => state.applicationForm.submissionStatus.error
  );
  const wordCount = useSelector(
    (state) => state.applicationForm.additionalEssayWordCount
  );
  if (essayQuestionStatus) {
    if (submissionResponse === 'success') {
      return formSubmissionSuccess();
    }
    if (submissionResponse === 'failure') {
      return formSubmissionError(submissionError);
    }
    return (
      <ApplicationSteps
        key={'secondaryApplicationForm'}
        steps={[
          {
            title: 'Additional Essay',
            content: SecondaryForm,
          },
        ]}
        confirmation={'Additional Essay Confirmation'}
        onFinish={(values) => {
          delete values.fullName;
          values.essayQuestionCode = questionCode;
          values.wordCount = wordCount;
          dispatch(submitAdditionalEssay(values));
        }}
      />
    );
  } else if (essayQuestionStatus === false) {
    return formValidationError(formError);
  }
  return formValidationLoading();
};
