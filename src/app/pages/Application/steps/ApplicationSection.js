import React from 'react';

export const ApplicationSection = (sectionName, component) => {
  return (
    <React.Fragment>
      <div className="application-section__header">
        <div className="application-section__section-name">
          <h3>{sectionName}</h3>
        </div>
      </div>
      {component}
    </React.Fragment>
  );
};
