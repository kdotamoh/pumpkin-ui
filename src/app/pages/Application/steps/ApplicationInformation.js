import React from 'react';
import { Form, Input, Select, Button, Upload, message } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

const applicationEssayQuestions = [
  {
    name: 'firstEssay',
    label:
      'In 300 words or less, describe your interest in your first choice and how being selected as an SEO Africa intern fits into your personal and professional goals?',
    required: true,
    code: 'ques1',
  },
  {
    name: 'secondEssay',
    label:
      'In 200 words or less, describe a situation when you demonstrated initiative and leadership',
    required: true,
    code: 'ques2',
  },
  {
    name: 'thirdEssay',
    label:
      '[To be filled in ONLY if you have a Second Lower or a CGPA between 2.5 and 2.99]. In 250 words or less, describe the mitigating circumstances (e.g illness, death in the family etc) that resulted in you obtaining lower grades. Also include and empathise reasons you should be selected for the internship in spite of your GPA. Please be honest as you will be asked about this should you make it to the interview stage',
    required: false,
    code: 'ques3',
  },
];

const choices = [
  { name: 'choice1', code: 'C1' },
  { name: 'choice2', code: 'C2' },
  { name: 'choice3', code: 'C3' },
];
const getApplicationEssayQuestions = () => {
  return applicationEssayQuestions.map((question) => {
    return (
      <Form.Item
        name={question.code}
        key={question.name}
        label={question.label}
        rules={[
          {
            required: question.required,
          },
        ]}
      >
        <Input.TextArea autoSize={{ minRows: 10 }} allowClear />
      </Form.Item>
    );
  });
};

const getApplicationChoices = () => {
  return choices.map((choice) => {
    return (
      <Option key={choice.code} value={choice.code}>
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
          {getApplicationChoices()}
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
          {getApplicationChoices()}
        </Select>
      </Form.Item>
      {getApplicationEssayQuestions()}
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
