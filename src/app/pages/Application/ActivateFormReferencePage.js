import React from 'react';
import { validateApplicationForm } from '../../store/actions/application-form-actions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import {
  formValidationError,
  formValidationLoading,
} from './FormValidationHelper';

export const validateRef = (dispatch) => {
  const urlParams = new URLSearchParams(window.location.search);
  const reference = urlParams.get('ref');
  sessionStorage.setItem('applicationFormReference', reference);
  dispatch(validateApplicationForm(reference));
};

const ActivateFormReferencePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    validateRef(dispatch);
  }, []);
  const formStatus = useSelector((state) => state.applicationForm.formStatus);

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
            immediately once started. If you have any questions, send an email
            to <a href="mailto:info@seo-africa.org"> info@seo-africa.org</a>
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
