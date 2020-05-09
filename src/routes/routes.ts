import { DefaultLayout } from '../layouts/DefaultLayout';
import { LoginPage } from 'pages/LoginPage';
import App from 'App';
import { ManagementScreen } from 'pages/ManagementPage';

// import PrivateRoute from 'hocs/PrivateRoute';

export default [
  {
    path: '/',
    exact: true,
    component: App,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/management',
    layout: DefaultLayout,
    component: ManagementScreen,
  },
];
