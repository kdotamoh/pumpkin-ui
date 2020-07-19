import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Spin, Form } from 'antd';

import { validateUser, activateUser } from '../../api/user-management/user';

import '../../style/activation-page.css';
import pumpkin from 'assets/logo-large.png';

const ActivationPage = () => {
  const [ref, setRef] = React.useState('');
  const [status, setStatus] = React.useState('loading');
  const [countryCode, setCountryCode] = React.useState(233);

  const getRef = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('ref');
    await setRef(reference);
    setStatus('success');
  };

  React.useEffect(() => {
    const validateRef = async () => {
      const valid = await validateUser(ref);
      if (valid) {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    };

    getRef();
    if (ref) {
      validateRef();
    }
  }, [ref]);

  const handleSubmit = async (values) => {
    const data = { ...values, phoneNumber: countryCode + values.phoneNumber };
    console.log(data);
    setStatus('loading');
    const { requestSuccessful } = await activateUser(ref, data);
    requestSuccessful ? setStatus('activated') : setStatus('failed');
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
  if (status === 'failed') {
    return (
      <div className="center-all activation-page--min-height">
        <div>
          Oops! Something went wrong. Please{' '}
          <a href="#/" onClick={() => window.location.reload()}>
            refresh
          </a>{' '}
          and try again.
        </div>
      </div>
    );
  }

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
            name="activation"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            className="activation-form"
            scrollToFirstError
          >
            <h1 className="login-form__h1">ACCOUNT ACTIVATION</h1>
            <p className="activation-form__header">
              Enter your details to activate your account:
            </p>
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Please input your first name',
                },
              ]}
            >
              <Input
                className="form__input"
                name="firstName"
                placeholder="First Name"
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Please input your last name',
                },
              ]}
            >
              <Input
                className="form__input"
                name="lastName"
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number',
                },
              ]}
            >
              <label className="form__input" style={{ display: 'flex' }}>
                <select
                  style={{ WebkitAppearance: 'none', border: 'transparent' }}
                  onChange={(e) => setCountryCode(e.target.value)}
                  value={countryCode}
                >
                  <option value="233">+233</option>
                  <option value="234">+234</option>
                </select>

                <Input
                  style={{ border: 'transparent' }}
                  type="number"
                  inputmode="numeric"
                  name="phoneNumber"
                  placeholder="Phone number"
                />
              </label>
            </Form.Item>
            <Form.Item
              name="password"
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
                  pattern: new RegExp(/\W/g), // TODO: match a specific set of characters. this allows '.' for instance, which the server rejects
                  message: 'Must contain at least one special character.',
                },
              ]}
            >
              <Input.Password
                className="form__input"
                name="password"
                placeholder="Password"
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="passwordConfirmation"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },

                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('Passwords do not match');
                  },
                }),
              ]}
            >
              <Input.Password
                className="form__input"
                name="passwordConfirmation"
                placeholder="Re-enter password"
                type="password"
              />
            </Form.Item>
            <button
              className="button button--primary login-form__button"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    );
  }
  if (status === 'activated') {
    return (
      <div className="center-all activation-page--min-height">
        <p>
          You have successfully activated your account. Please login{' '}
          <Link to="/login">here</Link>
        </p>
      </div>
    );
  }
};

export default ActivationPage;
