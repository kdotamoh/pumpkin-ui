import { DefaultLayout } from '../layouts/DefaultLayout';
import { LoginPage } from '../pages/LoginPage';
import App from '../App';
import { EmployeeManagement } from '../pages/Management/EmployeeManagement';
import { AlumniManagement } from '../pages/Management/AlumniManagement';
import ActivationPage from '../pages/ActivationPage';

export const authorized = [
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

export const unauthorized = [
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
    path: '/activate-account',
    component: ActivationPage,
  },
];
