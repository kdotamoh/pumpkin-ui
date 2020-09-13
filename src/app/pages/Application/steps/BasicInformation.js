import React from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;
export const GetGenders = (disabled) => {
  const genders = useSelector((state) => state.applicationForm.genders);
  return genders.map((gender) => {
    return (
      <Option key={gender} value={gender} disabled={disabled}>
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
      onFinish={params.onFinish}
      // labelCol={{
      //   sm: {
      //     span: 3,
      //   },
      // }}
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
        <Input disabled={params.disabled} />
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
        <Input disabled={params.disabled} />
      </Form.Item>

      <small>Please use the calendar drop-down to the right</small>
      <Form.Item
        name="dateOfBirth"
        label="Date of birth "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="date" disabled={params.disabled} />
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
          {GetGenders(params.disabled)}
        </Select>
      </Form.Item>
      <Form.Item
        name="email"
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

      <small>Please include your country code (eg: 233243456789)</small>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" disabled={params.disabled} />
      </Form.Item>
      <Form.Item name="secondaryPhoneNumber" label="Other Phone Number">
        <Input type="number" disabled={params.disabled} />
      </Form.Item>
    </Form>
  );
};
