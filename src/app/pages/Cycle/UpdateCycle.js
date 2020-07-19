import React from 'react';

import Cycle from './Cycle';

const UpdateCycle = ({
  match: {
    params: { id },
  },
}) => {
  return <Cycle editMode id={id} />;
};

export default UpdateCycle;
