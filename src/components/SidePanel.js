import React from 'react';
import PropTypes from 'prop-types';

const SidePanel = props => {
  const { handleClose, children } = props;
  return (
    <div className="App-sidepanel">
      <button type="button" className="close-panel" onClick={handleClose}>
        X
      </button>
      {children}
    </div>
  );
};
SidePanel.propTypes = {
  children: PropTypes.shape({}),
  handleClose: PropTypes.func,
};

export default SidePanel;
