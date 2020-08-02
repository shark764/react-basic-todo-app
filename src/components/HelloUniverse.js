import React from 'react';
import PropTypes from 'prop-types';

const HelloUniverse = props => (
  <div>
    <h1>{props.helloMessage}</h1>
    <p>{props.text}</p>
  </div>
);

HelloUniverse.propTypes = {
  helloMessage: PropTypes.string,
  text: PropTypes.string,
};

export default HelloUniverse;
