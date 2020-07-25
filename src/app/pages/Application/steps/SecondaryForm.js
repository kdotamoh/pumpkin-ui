import React from 'react';
import { Form, Input } from 'antd';
import { validateEssayQuestion } from 'app/store/actions/application-form-actions';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

export const SecondaryForm = (params) => {
  const dispatch = useDispatch();
  const validateQuestionCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const questionCode = urlParams.get('questionCode');
    dispatch(validateEssayQuestion(questionCode));
  };

  React.useEffect(() => {
    validateQuestionCode();
  }, []);

  const essayQuestionStatus = useSelector(
    (state) => state.applicationForm.essayQuestionStatus.valid
  );
  const question = useSelector(
    (state) => state.applicationForm.essayQuestionStatus.questionDetails
  );

  if (essayQuestionStatus) {
    return (
      <Form
        layout={params.layout}
        form={params.form}
        name="secondary-form"
        size={params.size}
        onFinish={params.onFinish}
        labelCol={{
          sm: {
            span: 3,
          },
        }}
        labelAlign="left"
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={params.disabled} />
        </Form.Item>
        <Form.Item
          name="candidateEmail"
          label="Email Address"
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input disabled={params.disabled} />
        </Form.Item>
        <Form.Item
          name="candidateResponse"
          key={question.code}
          label={question.question}
          rules={[
            {
              required: question.compulsoryQuestion,
            },
          ]}
        >
          {/* {LimitedTextArea(question.wordCount, 0)} */}
          <Input.TextArea
            disabled={params.disabled}
            autoSize={{ minRows: 10 }}
            allowClear
          />
        </Form.Item>
      </Form>
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
