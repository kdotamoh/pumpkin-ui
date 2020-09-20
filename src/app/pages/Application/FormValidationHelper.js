import React from 'react';
import { Result, Typography, Spin } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;
export const formValidationError = (error) => {
  return (
    <Result
      status="error"
      title="Form validation failed"
      subTitle="Please check that you have provided the correct link to the application and try again."
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The link you supplied has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
          {error}
        </Paragraph>
      </div>
    </Result>
  );
};

export const formValidationLoading = () => {
  return (
    <div className="center-all">
      <Spin />
      <div style={{ marginLeft: '1rem' }}>
        Validating application form reference...
      </div>
    </div>
  );
};

export const formSubmissionError = (error) => {
  return (
    <Result
      status="error"
      title="Form submission failed"
      subTitle="Please check that you have provided the correct application details according to the error message and try again. If the error persists, please reach out to your SEO Africa contact."
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The application page gave the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
          {error}
        </Paragraph>
      </div>
    </Result>
  );
};

export const formSubmissionSuccess = () => {
  return (
    <Result
      status="success"
      title="Form submission successful"
      subTitle="Congratulations! You've successfully submitted your application. You'll receive a confirmation email shortly. Be sure to check your junk mail/spam folder as well."
    />
  );
};
