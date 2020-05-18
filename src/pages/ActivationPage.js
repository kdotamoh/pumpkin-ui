import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

import { validateEmployee, activateEmployee } from 'api/employee-management';

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
      const valid = await validateEmployee(ref);
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
    const success = await activateEmployee(ref, data);
    success ? setStatus('activated') : setStatus('failed');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'loaded') {
    return (
      <div>
        <div>validating reference...</div>
      </div>
    );
  }
  if (status === 'failed') {
    return (
      <div>
        <div>Looks like something went wrong</div>
      </div>
    );
  }
  if (status === 'success') {
    return (
      <div>
        <p>Enter your details to activate your account</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            name="firstName"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            name="phoneNumber"
            placeholder="Phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name="passwordConfirmation"
            placeholder="Re-enter password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  if (status === 'activated') {
    return (
      <div>
        <p>
          You have successfully activated your account. Please login{' '}
          <Link to="/login">here</Link>
        </p>
      </div>
    );
  }
};

export default ActivationPage;
