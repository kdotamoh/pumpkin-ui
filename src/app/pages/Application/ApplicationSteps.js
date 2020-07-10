import * as React from 'react';
import { Button, Steps, message, Form } from 'antd';
import { BasicInformation } from './steps/BasicInformation';
import { EducationalBackground } from './steps/EducationalBackground';
import { ApplicationInformation } from './steps/ApplicationInformation';
import { ApplicationConfirmation } from './steps/ApplicationConfirmation';
import { useHistory } from 'react-router-dom';
const { Step } = Steps;
export const ApplicationSteps = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState(0);
  const next = () => {
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
  };
  const steps = [
    {
      title: 'Basic Information',
      content: BasicInformation({ ...stepInformation }),
    },
    {
      title: 'Educational Background',
      content: EducationalBackground({ ...stepInformation }),
    },
    {
      title: 'Application Information',
      content: ApplicationInformation({ ...stepInformation }),
    },
    {
      title: 'Application Confirmation',
      content: ApplicationConfirmation({
        ...stepInformation,
        layout: 'horizontal',
      }),
    },
  ];

  return (
    <React.Fragment>
      <Steps
        current={current}
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
              onClick={() => history.push('/apply')}
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
            <Button type="primary" onClick={form.submit}>
              Done
            </Button>
          )}
        </div>
      </Form.Provider>
    </React.Fragment>
  );
};
