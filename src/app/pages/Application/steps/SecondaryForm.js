import React from 'react';
import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { storeAdditionalEssayWordCount } from 'app/store/actions/application-form-actions';

export const SecondaryForm = (params) => {
  const dispatch = useDispatch();
  const question = useSelector(
    (state) => state.applicationForm.essayQuestionStatus.questionDetails
  );
  const wordCount = useSelector(
    (state) => state.applicationForm.additionalEssayWordCount
  );
  const setFormattedContent = (content) => {
    let words = content.split(' ');
    dispatch(storeAdditionalEssayWordCount(words.filter(Boolean).length));
  };
  const wordCountLimitReached = wordCount > question.wordCount;
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
      <Form.Item key={question.code}>
        <Form.Item
          name="candidateResponse"
          label={question.question}
          rules={[
            {
              required: question.compulsoryQuestion,
            },
          ]}
        >
          <Input.TextArea
            disabled={params.disabled}
            autoSize={{ minRows: 10 }}
            onChange={(event) => setFormattedContent(event.target.value)}
            allowClear
          />
        </Form.Item>
        <span
          className={
            wordCountLimitReached ? 'additional-essay__wordcount' : null
          }
        >
          {`${wordCount} / ${question.wordCount}`}
        </span>
      </Form.Item>
    </Form>
  );
};
