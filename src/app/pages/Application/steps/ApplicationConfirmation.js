import React from 'react';
import { BasicInformation } from './BasicInformation';
import { ApplicationSection } from './ApplicationSection';
import { EducationalBackground } from './EducationalBackground';
import { ApplicationInformation } from './ApplicationInformation';

export const ApplicationConfirmation = (params) => {
  return (
    <React.Fragment>
      {ApplicationSection('Basic Information', BasicInformation(params))}
      {ApplicationSection(
        'Educational Background',
        EducationalBackground(params)
      )}
      {ApplicationSection(
        'Application Information',
        ApplicationInformation(params)
      )}
    </React.Fragment>
  );
};
