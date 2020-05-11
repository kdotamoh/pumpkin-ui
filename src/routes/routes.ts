import { DefaultLayout } from '../layouts/DefaultLayout';
import { LoginPage } from 'pages/LoginPage';
import App from 'App';
import { EmployeeManagement } from 'pages/EmployeeManagement';
import { AlumniManagement } from 'pages/AlumniManagement';

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
    path: '/employees',
    layout: DefaultLayout,
    component: EmployeeManagement,
  },
  {
    path: '/alumni',
    layout: DefaultLayout,
    component: AlumniManagement,
  },
];
