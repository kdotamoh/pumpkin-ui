import { DefaultLayout } from '../layouts/DefaultLayout';
import { LoginPage } from '../pages/LoginPage';
import App from '../../App';
import { EmployeeManagement } from '../pages/Management/EmployeeManagement';
import { AlumManagement } from '../pages/Management/AlumManagement';
import { ApplicationTrackManagement } from '../pages/Management/ApplicationTrackManagement';
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
    component: AlumManagement,
  },
  {
    path: '/tracks',
    layout: DefaultLayout,
    component: ApplicationTrackManagement,
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
