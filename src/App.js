import React from 'react';
import { LoginPage } from './app/pages/LoginPage';
import { EmployeeManagement } from './app/pages/Management/EmployeeManagement';
import { DefaultLayout } from './app/layouts/DefaultLayout';

const AuthedApp = () => {
  return (
    <DefaultLayout>
      <EmployeeManagement />
    </DefaultLayout>
  );
};

const UnauthedApp = () => {
  return <LoginPage />;
};

const App = () => {
  const [token] = React.useState(false); // bootleg auth
  return token ? <AuthedApp /> : <UnauthedApp />;
};

export default App;
