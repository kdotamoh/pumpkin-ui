import { ApplicationSteps } from './ApplicationSteps';
import { useDispatch } from 'react-redux';
import { SecondaryForm } from './steps/SecondaryForm';
import { submitAdditionalEssay } from 'app/store/actions/application-form-actions';
export const SecondaryApplicationForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const questionCode = urlParams.get('questionCode');
  const dispatch = useDispatch();
  return ApplicationSteps({
    steps: [
      {
        title: 'Application Form',
        content: SecondaryForm,
      },
    ],
    onFinish: (values) => {
      delete values.fullName;
      values.essayQuestionCode = questionCode;
      console.log(values);
      dispatch(submitAdditionalEssay(values));
    },
  });
};
