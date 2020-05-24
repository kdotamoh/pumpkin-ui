import React from 'react';
import { LoginPage } from './pages/LoginPage';
import { EmployeeManagement } from './pages/Management/EmployeeManagement';
import { DefaultLayout } from './layouts/DefaultLayout';

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
