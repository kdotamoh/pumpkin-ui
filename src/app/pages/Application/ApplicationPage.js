import * as React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const ApplicationPage = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <div className="application-page-component__body">
        <div className="application-page-component__track-name">
          2020 Goldman Sachs Spring Application
        </div>
        <p>
          Thank you for considering applying for this position. Note that your
          application cannot be saved and will need to be submitted immediately
          once started. If you have any questions, send an email to{' '}
          <a href="mailto:info@seo-africa.org"> info@seo-africa.org</a>
        </p>
      </div>
      <Button
        type="primary"
        onClick={() => history.push('application-form')}
        className="application-page-component__primary"
      >
        Start
      </Button>
    </React.Fragment>
  );
};
