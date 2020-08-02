import React from 'react';
import PropTypes from 'prop-types';

const HelloWorld = props => (
  <div>
    <h1>{props.helloMessage}</h1>
    <p>{props.text}</p>
  </div>
);

HelloWorld.propTypes = {
  helloMessage: PropTypes.string,
  text: PropTypes.string,
};

export default HelloWorld;
