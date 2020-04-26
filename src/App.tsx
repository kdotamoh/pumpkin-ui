import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';

const AuthedApp: FunctionComponent = () => {
  return (
    <div>
      <div>App goes here</div>
    </div>
  );
};

const UnauthedApp: FunctionComponent = () => {
  return (
    <Router>
      <LoginPage />
    </Router>
  );
};

const App: FunctionComponent = () => {
  const [token] = React.useState(false); // bootleg auth
  return <Router>{token ? <AuthedApp /> : <UnauthedApp />}</Router>;
};

export default App;
