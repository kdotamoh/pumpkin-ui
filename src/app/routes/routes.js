import { DefaultLayout } from '../layouts/DefaultLayout';
import { LoginPage } from '../pages/LoginPage';
import { EmployeeManagement } from '../pages/Management/EmployeeManagement';
import { AlumManagement } from '../pages/Management/AlumManagement';
import { ApplicationTrackManagement } from '../pages/Management/ApplicationTrackManagement';
import ActivationPage from '../pages/ActivationPage';
import { RecruitmentCycleManagement } from 'app/pages/Management/CycleManagement';
import { UniversitySetupManagement } from 'app/pages/Management/UniversitySetupManagement';
import { MajorManagement } from 'app/pages/Management/MajorManagement';

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
  {
    path: '/cycles',
    layout: DefaultLayout,
    component: RecruitmentCycleManagement,
  },
  {
    path: '/university-majors',
    layout: DefaultLayout,
    component: MajorManagement,
  },
  {
    path: '/university-setup',
    layout: DefaultLayout,
    component: UniversitySetupManagement,
  },
];

export const unauthorized = [
  {
    path: '/',
    exact: true,
    component: LoginPage,
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
