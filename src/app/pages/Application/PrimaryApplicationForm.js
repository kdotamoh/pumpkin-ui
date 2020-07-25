import { ApplicationSteps } from './ApplicationSteps';
import { useSelector, useDispatch } from 'react-redux';
import { submitCandidateApplicationForm } from 'app/store/actions/candidate-actions';
import { BasicInformation } from './steps/BasicInformation';
import { EducationalBackground } from './steps/EducationalBackground';
import { ApplicationInformation } from './steps/ApplicationInformation';
export const PrimaryApplicationForm = () => {
  const dispatch = useDispatch();
  const essays = useSelector((state) => state.applicationForm.essayResponse);
  return ApplicationSteps({
    steps: [
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
    ],
    onFinish: (values) => {
      const essayToSbumit = [...essays];
      essayToSbumit.map((essay) => {
        delete essay.wordCount;
        delete values[essay.essayQuestionCode];
      });
      values.essays = essayToSbumit;

      console.log('done', values);
      const cycleReference = sessionStorage.getItem('cycleReference');
      dispatch(submitCandidateApplicationForm(cycleReference, values));
    },
  });
};
