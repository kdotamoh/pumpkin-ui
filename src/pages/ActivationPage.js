import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Spin } from 'antd';

import { validateUser, activateUser } from '../api/user-management/user';

import '../style/activation-page.css';

const ActivationPage = () => {
  const [ref, setRef] = React.useState('');
  const [status, setStatus] = React.useState('loading');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

  const getRef = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('ref');
    await setRef(reference);
    setStatus('loaded');
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

  const handleSubmit = async () => {
    const data = {
      firstName,
      lastName,
      phoneNumber,
      password,
      passwordConfirmation,
    };
    setStatus('loading');
    const success = await activateUser(ref, data);
    success ? setStatus('activated') : setStatus('failed');
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
        <div>Oops! Something went wrong. Please try again.</div>
      </div>
    );
  }
  if (status === 'success') {
    return (
      <div className="activation-page">
        <div className="activation-page__side" />
        <div className="activation-page__main">
          <form
            className="activation-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <p className="activation-form__header">
              Enter your details to activate your account:
            </p>
            <Input
              className="login-form__input"
              name="firstName"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              className="login-form__input"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              className="login-form__input"
              name="phoneNumber"
              placeholder="Phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              className="login-form__input"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              className="login-form__input"
              name="passwordConfirmation"
              placeholder="Re-enter password"
              type="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button
              className="button button--primary login-form__button"
              type="submit"
            >
              Submit
            </button>
          </form>
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
