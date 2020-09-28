import * as React from 'react';
import { Button, Steps, message, Form } from 'antd';
import { ApplicationConfirmation } from './steps/ApplicationConfirmation';
import { useHistory } from 'react-router-dom';
const { Step } = Steps;

export const ApplicationSteps = (params) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const formReference = sessionStorage.getItem('applicationFormReference');
  const next = () => {
    window.scrollTo(0, 0);
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else if (current === steps.length - 1) {
      message.success('Processing complete!');
    }
  };
  const stepInformation = {
    layout: 'vertical',
    form: form,
    size: 'middle',
    disabled: false,
  };
  const steps = params.steps.map((step) => {
    return {
      title: step.title,
      content: step.content(stepInformation),
    };
  });

  steps.push({
    title: params.confirmation
      ? params.confirmation
      : 'Application Confirmation',
    content: ApplicationConfirmation(params.steps, {
      ...stepInformation,
      layout: 'horizontal',
      onFinish: params.onFinish,
      disabled: true,
    }),
  });
  const onStepChange = (current) => {
    setCurrent(current);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      form.submit();
    } catch (err) {
      setIsSubmitting(false);
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Steps
        current={current}
        onChange={onStepChange}
        className="application-page-component__steps__header"
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form.Provider>
        <div className="application-page-component__steps__content">
          {steps[current].content}
        </div>
        <div className="application-page-component__steps__action">
          {current > 0 && (
            <Button onClick={() => setCurrent(current - 1)}>Previous</Button>
          )}
          {current === 0 && (
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => history.push(`/apply/?ref=${formReference}`)}
            >
              Back to Application
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </Form.Provider>
    </React.Fragment>
  );
};
