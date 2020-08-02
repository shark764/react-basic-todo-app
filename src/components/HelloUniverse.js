import React from 'react';

const HelloUniverse = props => {
  return (
    <div>
      <h1>{props.helloMessage}</h1>
      <p>{props.text}</p>
    </div>
  );
};

export default HelloUniverse;
