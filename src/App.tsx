import React, { FunctionComponent } from 'react';
import { LoginPage } from 'pages/LoginPage';
import { EmployeeManagement } from 'pages/Management/EmployeeManagement';
import { DefaultLayout } from 'layouts/DefaultLayout';

const AuthedApp: FunctionComponent = () => {
  return (
    <DefaultLayout>
      <EmployeeManagement />
    </DefaultLayout>
  );
};

const UnauthedApp: FunctionComponent = () => {
  return <LoginPage />;
};

const App: FunctionComponent = () => {
  const [token] = React.useState(false); // bootleg auth
  return token ? <AuthedApp /> : <UnauthedApp />;
};

export default App;
