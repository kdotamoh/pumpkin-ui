import React from 'react';
import { Form, Select, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  storeEssay,
  storeCandidateCV,
  storeCandidatePhoto,
} from 'app/store/actions/application-form-actions';
const { Option } = Select;

export const GetApplicationEssayQuestions = (disabled) => {
  const dispatch = useDispatch();
  const applicationEssayQuestions = useSelector(
    (state) => state.applicationForm.essayQuestions
  );
  const essays = useSelector((state) => state.applicationForm.essayResponse);
  const setFormattedContent = (text, code) => {
    let words = text.split(' ');
    dispatch(storeEssay(code, text, words.filter(Boolean).length));
  };

  if (applicationEssayQuestions.length > 0) {
    return applicationEssayQuestions.map((question) => {
      const currentEssay =
        essays.length > 0
          ? essays.find((essay) => essay.essayQuestionCode === question.code)
          : '';
      const content = currentEssay ? currentEssay.candidateResponse : '';
      const wordCount = currentEssay ? currentEssay.wordCount : 0;
      const wordCountLimitReached = wordCount > question.wordCount;

      return (
        <Form.Item key={question.code}>
          <Form.Item
            label={question.question}
            name={question.code}
            key={question.code}
            rules={[
              {
                required: question.compulsoryQuestion,
              },
            ]}
          >
            <Input.TextArea
              disabled={disabled}
              autoSize={{ minRows: 10 }}
              value={content}
              onChange={(event) =>
                setFormattedContent(event.target.value, question.code)
              }
              allowClear
            />
          </Form.Item>
          <span
            className={
              wordCountLimitReached ? 'application-form__wordcount' : null
            }
          >
            {`${wordCount} / ${question.wordCount}`}
          </span>
        </Form.Item>
      );
    });
  }
};
const GetApplicationChoices = (disabled) => {
  const choices = useSelector((state) => state.applicationForm.tracks);
  return choices.map((choice) => {
    return (
      <Option key={choice.code} value={choice.code} disabled={disabled}>
        {choice.name}
      </Option>
    );
  });
};

export const ApplicationInformation = (params) => {
  const dispatch = useDispatch();
  const candidateCV = useSelector((state) => state.applicationForm.candidateCV);
  const candidatePhoto = useSelector(
    (state) => state.applicationForm.candidatePhoto
  );
  return (
    <Form
      layout={params.layout}
      form={params.form}
      name="application-information-form"
      size={params.size}
      labelCol={{
        sm: {
          span: params.layout === 'horizontal' ? 6 : 0,
        },
      }}
      labelAlign="left"
      onFinish={params.onFinish}
      disabled={params.disabled}
    >
      <Form.Item
        name="firstChoice"
        label="First Choice"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select your first choice" allowClear>
          {GetApplicationChoices(params.disabled)}
        </Select>
      </Form.Item>
      <Form.Item
        name="secondChoice"
        label="Second Choice"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select your second choice" allowClear>
          {GetApplicationChoices(params.disabled)}
        </Select>
      </Form.Item>
      {GetApplicationEssayQuestions(params.disabled)}
      <Form.Item
        name="candidateCV"
        label="Resume"
        valuePropName="resume"
        extra="accepted file types (pdf, doc, docx)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          type="file"
          accept=".pdf, .doc"
          // onChange={(e) => dispatch(storeCandidateCV(e.target.files))}
          disabled={params.disabled}
        />
      </Form.Item>

      <Form.Item
        name="candidatePhoto"
        label="Photo"
        valuePropName="photo"
        extra="accepted file types (png, jpg)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          type="file"
          accept="image/png, image/jpeg"
          // onChange={(e) => dispatch(storeCandidatePhoto(e.target.files))}
          disabled={params.disabled}
        />
      </Form.Item>
    </Form>
  );
};
