import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Spin, Form, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { resetPassword } from '../../api/user-management/user';

import '../../style/activation-page.css';
import pumpkin from 'assets/logo-large.png';

const ActivationPage = () => {
  // const [status, setStatus] = React.useState('loading');
  const [status, setStatus] = React.useState('success');
  const [submitting, setSubmitting] = React.useState(false);
  const [form] = Form.useForm();
  // const [countryCode, setCountryCode] = React.useState(233);

  const roundSpinIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: 'white' }} spin />
  );

  // React.useEffect(() => {
  //   const validateRef = async () => {
  //     const valid = await validateUser(ref);
  //     if (valid) {
  //       setStatus('success');
  //     } else {
  //       setStatus('failed');
  //     }
  //   };

  //   getRef();
  //   if (ref) {
  //     validateRef();
  //   }
  // }, [ref]);

  // const validationMessage = {
  //   required: '${label} is required!',
  //   types: {
  //     email: '${label} is not validate email!',
  //   },
  // };

  const handleSubmit = async (values) => {
    // const data = { ...values };
    const email = values.email;
    setSubmitting(true);
    // setStatus('loading');
    const requestSuccessful = await resetPassword(email);
    requestSuccessful
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
  // if (status === 'failed') {
  //   return (
  //     <div className="center-all activation-page--min-height">
  //       <div>
  //         Oops! Something went wrong. Please{' '}
  //         <a href="#/" onClick={() => window.location.reload()}>
  //           refresh
  //         </a>{' '}
  //         and try again.
  //       </div>
  //     </div>
  //   );
  // }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
            name="resetPassword"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            className="activation-form"
            scrollToFirstError
            form={form}
            // validateMessages={validationMessage}
          >
            <h1 className="login-form__h1">PASSWORD RESET</h1>
            <p className="activation-form__header">Enter your email:</p>

            <Form.Item
              // type="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input a valid email address',
                  type: 'email',
                },
              ]}
            >
              <Input className="form__input" name="email" placeholder="Email" />
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
          A temporary password has been sent to your email.
          <br />
          Please check your email, then login to your account{' '}
          <Link to="/login">here</Link>
        </p>
      </div>
    );
  }
};

export default ActivationPage;
