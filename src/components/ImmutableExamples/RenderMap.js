import React from 'react';

const RenderMap = ({ dataMap }) => (
  <div style={{ flex: 1, marginRight: '75px' }}>
    <h3>Immutable.Map</h3>
    <p>
      <strong>ID:</strong> <span>{dataMap.get('id')}</span>
    </p>
    <p>
      <strong>Name:</strong> <span>{dataMap.get('name')}</span>
    </p>
    <p>
      <strong>Username:</strong> <span>{dataMap.get('username')}</span>
    </p>
  </div>
);

export default RenderMap;
