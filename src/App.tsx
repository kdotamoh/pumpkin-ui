import React, { FunctionComponent } from 'react';
import { Alert } from 'antd';
import { LoginPage } from 'pages/LoginPage';

const App: FunctionComponent = () => {
  return (
    <div>
      {/* <Alert message="Hi, I'm from Ant Design" type="success" banner closable /> */}
      <LoginPage />
    </div>
  );
};

export default App;
