import React from 'react';
import PropTypes from 'prop-types';

import List from '../List';
import Create from '../Create';
import Edit from '../Edit';
import SidePanel from '../../components/SidePanel';

function Layout(props) {
  const {
    name,
    handleInputChange,
    handleSubmit,
    renderCreate,
    renderEdit,
    selectedItemId,
    onClearList,
    onClosePanel,
    onOpenCreatePanel,
  } = props;

  return (
    <div className="App-main">
      <div className="App-list">
        <header>
          <form onSubmit={handleSubmit} className="form-inline" autoComplete="off">
            <input type="text" name="name" placeholder="Enter a text..." value={name} onChange={handleInputChange} />
            <input type="submit" value="Add" />

            <button type="button" onClick={onOpenCreatePanel}>
              Create
            </button>

            <button type="button" onClick={onClearList}>
              Clear List
            </button>
          </form>
        </header>

        <div className="rTable-container">
          <List />
        </div>
      </div>

      {renderCreate && (
        <SidePanel handleClose={onClosePanel}>
          <Create mode="inline" />
        </SidePanel>
      )}
      {renderEdit && selectedItemId && (
        <SidePanel handleClose={onClosePanel}>
          <Edit key={selectedItemId} mode="inline" />
        </SidePanel>
      )}
    </div>
  );
}

Layout.propTypes = {
  renderCreate: PropTypes.bool,
  renderEdit: PropTypes.bool,
  selectedItemId: PropTypes.string,
  handleSubmit: PropTypes.func,
  name: PropTypes.string,
  handleInputChange: PropTypes.func,
  onClearList: PropTypes.func,
  onClosePanel: PropTypes.func,
  onOpenCreatePanel: PropTypes.func,
};

export default Layout;
