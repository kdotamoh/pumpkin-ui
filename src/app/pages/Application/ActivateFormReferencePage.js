import React from 'react';
import { validateApplicationForm } from '../../store/actions/application-form-actions';
import { useHistory } from 'react-router-dom';
import { Spin, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

const ActivateFormReferencePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const validateRef = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('ref');
    sessionStorage.setItem('applicationFormReference', reference);
    dispatch(validateApplicationForm(reference));
  };

  React.useEffect(() => {
    validateRef();
  }, []);
  const formStatus = useSelector(
    (state) => state.applicationForm.formStatus.valid
  );
  const cycleDetails = useSelector(
    (state) => state.applicationForm.formStatus.cycleDetails
  );

  if (formStatus) {
    return (
      <React.Fragment>
        <div className="application-page-component__body">
          <div className="application-page-component__track-name">
            {`${cycleDetails.year} ${cycleDetails.name} Application`}
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
          onClick={() => history.push('/application-form')}
          className="application-page-component__primary"
        >
          Start
        </Button>
      </React.Fragment>
    );
  }

  return (
    <div className="center-all">
      <Spin />
      <div style={{ marginLeft: '1rem' }}>
        Validating application form reference...
      </div>
    </div>
  );
};

export default ActivateFormReferencePage;
