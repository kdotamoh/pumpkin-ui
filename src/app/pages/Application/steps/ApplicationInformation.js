import React, { useState } from 'react';
import { Form, Select, Input, Upload, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
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
  const [fileListState, updateFileListState] = useState(null);
  const [fileState, updateFileState] = useState(null);
  const [photoFileListState, updatePhotoFileListState] = useState(null);
  const [photoFileState, updatePhotoFileState] = useState(null);

  const handleFileChange = (file) => {
    let fileList = [...file.fileList];

    if (!!fileList.length === false) {
      return;
    }

    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    const isDocOrPdf =
      fileList[0].type === 'application/pdf' ||
      fileList[0].type === 'application/doc' ||
      fileList[0].type === 'application/docx';

    if (!isDocOrPdf) {
      message.error('Please upload only pdf/doc/docx file');
      return;
    }

    const isLt2M = fileList[0].size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('Please upload only documents smaller than 1MB');
      return;
    }

    if (fileList.length > 1) {
      message.error('You can only upload one document');
      return;
    }
    const newFileFile = {
      lastModified: file.file.lastModified,
      name: file.file.name,
      size: file.file.size,
      type: file.file.type,
      uid: file.file.uid,
      webkitRelativePath: file.file.webkitRelativePath,
    };

    dispatch(storeCandidateCV(newFileFile));

    updateFileListState(fileList);
    updateFileState(file.file);
  };
  const handlePhotoFileChange = (file) => {
    let fileList = [...file.fileList];

    if (!!fileList.length === false) {
      return;
    }

    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    const isJpgOrPng =
      fileList[0].type === 'image/jpeg' || fileList[0].type === 'image/png';

    if (!isJpgOrPng) {
      message.error('Please upload only JPG/PNG file');
      return;
    }

    const isLt2M = fileList[0].size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('Please upload only documents smaller than 1MB');
      return;
    }

    if (fileList.length > 1) {
      message.error('You can only upload one document');
      return;
    }
    const newFileFile = {
      lastModified: file.file.lastModified,
      lastModifiedDate:
        'Thu Jul 30 2020 15:30:18 GMT+0100 (West Africa Standard Time) {}',
      name: file.file.name,
      size: file.file.size,
      type: file.file.type,
      uid: file.file.uid,
      webkitRelativePath: file.file.webkitRelativePath,
    };

    dispatch(storeCandidatePhoto(newFileFile));

    updatePhotoFileListState(fileList);
    updatePhotoFileState(file.file);
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
        extra={
          !params.disabled
            ? 'accepted file types (pdf, doc, docx)'
            : candidateCV && candidateCV.name
        }
        rules={[
          {
            required: true,
          },
        ]}
        className={params.disabled ? 'application-form__file_input' : null}
      >
        <Upload
          onChange={handleFileChange}
          beforeUpload={(file, fileList) => false}
          fileList={fileListState}
          onRemove={() => updateFileListState(null)}
        >
          <Button>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="candidatePhoto"
        label="Photo"
        valuePropName="photo"
        extra={
          !params.disabled
            ? 'accepted file types (png, jpg)'
            : candidatePhoto && candidatePhoto.name
        }
        rules={[
          {
            required: true,
          },
        ]}
        className={params.disabled ? 'application-form__file_input' : null}
      >
        <Upload
          onChange={handlePhotoFileChange}
          beforeUpload={(file, fileList) => false}
          fileList={photoFileListState}
          onRemove={() => updatePhotoFileListState(null)}
        >
          <Button>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};
