import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Spin, Form, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { changePassword } from '../../api/user-management/user';

import '../../style/activation-page.css';
import pumpkin from 'assets/logo-large.png';

const ActivationPage = () => {
  const [status, setStatus] = React.useState('success');
  const [submitting, setSubmitting] = React.useState(false);
  const [form] = Form.useForm();

  const roundSpinIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: 'white' }} spin />
  );

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const res = await changePassword(values);
    res.requestSuccessful
      ? setStatus('requestSuccess')
      : message.error('Oops, something went wrong. Please try again');
    setSubmitting(false);
    form.resetFields();
  };

  if (status === 'loading') {
    return (
      <div className="center-all activation-page--min-height">
        <Spin />
        <div style={{ marginLeft: '1rem' }}>Loading...</div>
      </div>
    );
  }
  if (status === 'loaded') {
    return (
      <div className="center-all activation-page--min-height">
        <Spin />
        <div style={{ marginLeft: '1rem' }}>Validating reference...</div>
      </div>
    );
  }

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  if (status === 'success') {
    return (
      <div className="activation-page">
        <div className="activation-page__side" />
        <div className="activation-page__main">
          <div className="login-page__navigation">
            <figure style={{ maxHeight: '10rem' }}>
              <img
                src={pumpkin}
                style={{ height: '100%', width: 'auto' }}
                alt=""
              />
            </figure>
          </div>
          <Form
            name="changePassword"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            className="activation-form"
            scrollToFirstError
            form={form}
          >
            <h1 className="login-form__h1">CHANGE PASSWORD</h1>
            <p className="activation-form__header">Enter your email:</p>

            <label className="form__label">Email</label>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input a valid email address',
                },
              ]}
            >
              <Input
                className="form__input"
                name="username"
                placeholder="Email"
              />
            </Form.Item>

            <label className="form__label">Current password</label>
            <Form.Item
              name="currentPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Password is required.',
                },
                { min: 8, message: 'Must be at least 8 characters long.' },
                {
                  pattern: new RegExp(/\d+/g),
                  message: 'Must contain at least one number.',
                },
                {
                  pattern: new RegExp(/[A-Z]/g),
                  message: 'Must contain at least one uppercase character.',
                },
                {
                  pattern: new RegExp(/[\W_]+/g), // TODO: match a specific set of characters. this allows '.' for instance, which the server rejects
                  message: 'Must contain at least one special character.',
                },
              ]}
            >
              <Input.Password
                className="form__input"
                name="email"
                placeholder="Current password"
              />
            </Form.Item>

            <label className="form__label">New password</label>
            <Form.Item
              name="newPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Password is required.',
                },
                { min: 8, message: 'Must be at least 8 characters long.' },
                {
                  pattern: new RegExp(/\d+/g),
                  message: 'Must contain at least one number.',
                },
                {
                  pattern: new RegExp(/[A-Z]/g),
                  message: 'Must contain at least one uppercase character.',
                },
                {
                  pattern: new RegExp(/[\W_]+/g), // TODO: match a specific set of characters. this allows '.' for instance, which the server rejects
                  message: 'Must contain at least one special character.',
                },
              ]}
            >
              <Input.Password
                className="form__input"
                name="email"
                placeholder="New password"
              />
            </Form.Item>

            <label className="form__label">Confirm new password</label>
            <Form.Item
              name="newPasswordConfirmation"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },

                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('Passwords do not match');
                  },
                }),
              ]}
            >
              <Input.Password
                className="form__input"
                name="email"
                placeholder="New password confirmation"
              />
            </Form.Item>

            <button
              className="button button--primary login-form__button"
              type="submit"
            >
              {submitting ? (
                <Spin indicator={roundSpinIcon} size="small" />
              ) : (
                'Submit'
              )}
            </button>
          </Form>
        </div>
      </div>
    );
  }
  if (status === 'requestSuccess') {
    return (
      <div className="center-all activation-page--min-height">
        <p>
          You have successfully changed your password. Please login{' '}
          <Link to="/login">here</Link>
        </p>
      </div>
    );
  }
};

export default ActivationPage;
