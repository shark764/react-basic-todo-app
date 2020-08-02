import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const RenderMap = ({ dataMap }) => (
  <div style={{ flex: 1, marginRight: '75px' }}>
    <h3>Immutable.Map</h3>
    <p>
      <strong>ID:</strong>
      <span>{dataMap.get('id')}</span>
    </p>
    <p>
      <strong>Name:</strong>
      <span>{dataMap.get('name')}</span>
    </p>
    <p>
      <strong>Username:</strong>
      <span>{dataMap.get('username')}</span>
    </p>
  </div>
);

RenderMap.propTypes = {
  dataMap: ImmutablePropTypes.contains({
    name: PropTypes.string,
    id: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default RenderMap;
