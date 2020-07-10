import React from 'react';
import { BasicInformation } from './BasicInformation';
import { ApplicationSection } from './ApplicationSection';
import { EducationalBackground } from './EducationalBackground';
import { ApplicationInformation } from './ApplicationInformation';

export const ApplicationConfirmation = (params) => {
  return (
    <React.Fragment>
      {ApplicationSection('Basic Information', BasicInformation(params), 0)}
      {ApplicationSection(
        'Educational Background',
        EducationalBackground(params),
        1
      )}
      {ApplicationSection(
        'Application Information',
        ApplicationInformation(params),
        2
      )}
    </React.Fragment>
  );
};
