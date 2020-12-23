import React from 'react';
import PropTypes from 'prop-types';

import Cycle from './Cycle';

const UpdateCycle = ({
  match: {
    params: { id },
  },
}) => {
  return <Cycle editMode id={id} />;
};

UpdateCycle.propTypes = {
  match: PropTypes.object,
};

export default UpdateCycle;
