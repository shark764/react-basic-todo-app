/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({ type = 'button', className = '', style = {}, label, ...rest }) => (
  <button type={type} className={className} style={style} {...rest}>
    {label}
  </button>
);

ButtonComponent.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  label: PropTypes.string,
};

export default ButtonComponent;
