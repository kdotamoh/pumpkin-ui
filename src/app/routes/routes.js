import { DefaultLayout } from '../layouts/DefaultLayout';
import { ApplicationLayout } from '../layouts/ApplicationLayout';
import { LoginPage } from '../pages/LoginPage';
import PasswordReset from 'app/pages/PasswordReset';
import ChangePassword from 'app/pages/ChangePassword';
import { ApplicationReviewerManagement } from '../pages/Management/ApplicationReviewerManagement';
import { CandidateApplicationReviews } from '../pages/Management/CandidateApplicationReviews';
import { EmployeeManagement } from '../pages/Management/EmployeeManagement';
import { AlumManagement } from '../pages/Management/AlumManagement';
import { ApplicationTrackManagement } from '../pages/Management/ApplicationTrackManagement';
import ActivationPage from '../pages/ActivationPage';
import { RecruitmentCycleManagement } from 'app/pages/Management/CycleManagement';
import { UniversitySetupManagement } from 'app/pages/Management/UniversitySetupManagement';
import { MajorManagement } from 'app/pages/Management/MajorManagement';
import ActivateFormReferencePage from 'app/pages/Application/ActivateFormReferencePage';
import { SecondaryApplicationForm } from 'app/pages/Application/SecondaryApplicationForm';
import { PrimaryApplicationForm } from 'app/pages/Application/PrimaryApplicationForm';
import AddCycle from 'app/pages/Cycle/AddCycle';
import UpdateCycle from 'app/pages/Cycle/UpdateCycle';
import { CandidateApplicationManagement } from '../pages/Management/CandidateApplicationManagement';
import { CandidateApplicationSummary } from '../pages/Management/CandidateApplicationSummary';

export const authorized = [
  {
    path: '/reviewers',
    layout: DefaultLayout,
    component: ApplicationReviewerManagement,
  },
  {
    path: '/application-review/:reviewerCode',
    layout: DefaultLayout,
    component: CandidateApplicationReviews,
  },
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
    path: '/cycles/new',
    layout: DefaultLayout,
    component: AddCycle,
  },
  {
    path: '/cycles/update/:id',
    layout: DefaultLayout,
    component: UpdateCycle,
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
  {
    path: '/applications',
    layout: DefaultLayout,
    component: CandidateApplicationManagement,
  },
  {
    path: '/application-summary/:reference',
    layout: DefaultLayout,
    component: CandidateApplicationSummary,
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
    path: '/password-reset',
    component: PasswordReset,
  },
  {
    path: '/change-password',
    component: ChangePassword,
  },
  {
    path: '/apply/additional-essay',
    layout: ApplicationLayout,
    component: SecondaryApplicationForm,
  },
  {
    path: '/apply/application-form',
    layout: ApplicationLayout,
    component: PrimaryApplicationForm,
  },
  {
    path: '/apply',
    layout: ApplicationLayout,
    component: ActivateFormReferencePage,
  },
  {
    path: '/application-form',
    layout: ApplicationLayout,
    component: PrimaryApplicationForm,
  },
];
