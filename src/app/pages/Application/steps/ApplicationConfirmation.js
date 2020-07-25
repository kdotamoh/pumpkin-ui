import React from 'react';
import { ApplicationSection } from './ApplicationSection';

export const ApplicationConfirmation = (steps, params) => {
  return (
    <React.Fragment>
      {steps.map((step) => {
        return ApplicationSection(step.title, step.content(params));
      })}
    </React.Fragment>
  );
};
