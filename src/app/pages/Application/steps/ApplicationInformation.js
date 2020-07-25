import React from 'react';
import { Form, Select, Input, Button, Upload, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { UploadOutlined } from '@ant-design/icons';
import { storeEssay } from 'app/store/actions/application-form-actions';
const { Option } = Select;

export const GetApplicationEssayQuestions = (disabled) => {
  const dispatch = useDispatch();
  const applicationEssayQuestions = useSelector(
    (state) => state.applicationForm.essayQuestions
  );
  const essays = useSelector((state) => state.applicationForm.essayResponse);
  const setFormattedContent = (text, limit, code) => {
    let words = text.split(' ');
    if (words.filter(Boolean).length > limit) {
      dispatch(
        storeEssay(code, text.split(' ').slice(0, limit).join(' '), limit)
      );
    } else {
      dispatch(storeEssay(code, text, words.filter(Boolean).length));
    }
  };
  if (applicationEssayQuestions.length > 0) {
    return applicationEssayQuestions.map((question) => {
      const currentEssay =
        essays.length > 0
          ? essays.find((essay) => essay.essayQuestionCode === question.code)
          : '';
      const content = currentEssay ? currentEssay.candidateResponse : '';
      console.log(content);
      const wordCount = currentEssay ? currentEssay.wordCount : 0;

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
                setFormattedContent(
                  event.target.value,
                  question.wordCount,
                  question.code
                )
              }
              allowClear
            />
          </Form.Item>
          <span> {`${wordCount} / ${question.wordCount}`}</span>
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
  const fileProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
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
            required: false,
          },
        ]}
      >
        <Upload
          {...fileProps}
          // beforeUpload={(file) => {
          //   console.log(file.type);
          //   const isAcceptedFileType =
          //     file.type === 'image/jpeg' || file.type === 'image/png';
          //   if (!isAcceptedFileType) {
          //     message.error('You can only upload JPG/PNG file!');
          //   }
          //   return isAcceptedFileType;
          // }}
        >
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="candidatePhoto"
        label="Photo"
        valuePropName="photo"
        extra="accepted file types (png, jpg)"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Upload
          {...fileProps}
          // beforeUpload={(file) => {
          //   const isJpgOrPng =
          //     file.type === 'image/jpeg' || file.type === 'image/png';
          //   if (!isJpgOrPng) {
          //     message.error('You can only upload JPG/PNG file!');
          //   }
          //   const isLt2M = file.size / 1024 / 1024 < 2;
          //   if (!isLt2M) {
          //     message.error('Image must smaller than 2MB!');
          //   }
          //   return isJpgOrPng && isLt2M;
          // }}
        >
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};
