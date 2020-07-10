import React from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;
export const GetGenders = () => {
  const genders = useSelector((state) => state.applicationForm.genders);
  return genders.map((gender) => {
    return (
      <Option key={gender} value={gender}>
        {gender}
      </Option>
    );
  });
};

export const BasicInformation = (params) => {
  return (
    <Form
      layout={params.layout}
      form={params.form}
      name="basic-information-form"
      size={params.size}
      labelCol={{
        sm: {
          span: 3,
        },
      }}
      labelAlign="left"
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select your gender" allowClear>
          {GetGenders()}
        </Select>
      </Form.Item>
      <Form.Item
        name="emailAddress"
        label="Email Address"
        rules={[
          {
            required: true,
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNum"
        label="Phone Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="otherNum" label="Other Phone Number">
        <Input type="number" />
      </Form.Item>
    </Form>
  );
};
