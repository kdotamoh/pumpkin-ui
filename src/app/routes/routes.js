import { DefaultLayout } from '../layouts/DefaultLayout';
import { ApplicationLayout } from '../layouts/ApplicationLayout';
import { LoginPage } from '../pages/LoginPage';
import { EmployeeManagement } from '../pages/Management/EmployeeManagement';
import { AlumManagement } from '../pages/Management/AlumManagement';
import { ApplicationTrackManagement } from '../pages/Management/ApplicationTrackManagement';
import { ApplicationPage } from '../pages/Application/ApplicationPage';
import ActivationPage from '../pages/ActivationPage';
import { ApplicationSteps } from 'app/pages/Application/ApplicationSteps';
import { RecruitmentCycleManagement } from 'app/pages/Management/CycleManagement';
import { UniversitySetupManagement } from 'app/pages/Management/UniversitySetupManagement';
import { MajorManagement } from 'app/pages/Management/MajorManagement';
import AddCycle from 'app/pages/AddCycle';

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
    path: '/cycles/add-new',
    layout: DefaultLayout,
    component: AddCycle,
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
