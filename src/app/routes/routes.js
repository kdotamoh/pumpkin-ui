import { DefaultLayout } from '../layouts/DefaultLayout';
import { ApplicationLayout } from '../layouts/ApplicationLayout';
import { LoginPage } from '../pages/LoginPage';
import App from '../../App';
import { EmployeeManagement } from '../pages/Management/EmployeeManagement';
import { AlumManagement } from '../pages/Management/AlumManagement';
import { ApplicationTrackManagement } from '../pages/Management/ApplicationTrackManagement';
import { ApplicationPage } from '../pages/Application/ApplicationPage';
import ActivationPage from '../pages/ActivationPage';
import { ApplicationSteps } from 'app/pages/Application/ApplicationSteps';

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
  {
    path: '/apply',
    layout: ApplicationLayout,
    component: ApplicationPage,
  },
  {
    path: '/application-form',
    layout: ApplicationLayout,
    component: ApplicationSteps,
  },
];
