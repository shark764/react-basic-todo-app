/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const FieldComponent = ({ component = 'input', type = 'text', className = '', style = {}, ...rest }) => {
  switch (component) {
    case 'input':
      return <input type={type} className={className} style={style} {...rest} />;

    case 'textarea':
      return <textarea className={className} style={style} {...rest} />;

    case 'select': {
      const { required, placeholder, options, ...restSelect } = rest;
      return (
        <select className={className} style={style} {...restSelect}>
          {!required && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    default:
      return null;
  }
};

FieldComponent.propTypes = {
  component: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

export default FieldComponent;
