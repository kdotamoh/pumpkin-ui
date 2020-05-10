import React, { FunctionComponent } from 'react';
import { LoginPage } from 'pages/LoginPage';
import { ManagementScreen } from 'pages/ManagementPage';

const AuthedApp: FunctionComponent = () => {
  return <ManagementScreen />;
};

const UnauthedApp: FunctionComponent = () => {
  return <LoginPage />;
};

const App: FunctionComponent = () => {
  const [token] = React.useState(false); // bootleg auth
  return token ? <AuthedApp /> : <UnauthedApp />;
};

export default App;
