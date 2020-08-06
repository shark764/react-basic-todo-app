import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Item from '../Item';

const Layout = props => {
  const { items, checkedAll, handleCheck, ...rest } = props;
  return (
    <div className="rTable">
      <div className="rTableHeading">
        <div className="rTableHead">
          <span>ID</span>
        </div>
        <div className="rTableHead">
          <span>Name</span>
        </div>
        <div className="rTableHead">
          <span>Type</span>
        </div>
        <div className="rTableHead">
          <span>Description</span>
        </div>
        <div className="rTableHead">
          <span>Created at</span>
        </div>
        <div className="rTableHead">
          <span>
            Completed
            <input type="checkbox" name="checkedAll" checked={checkedAll} onChange={handleCheck} />
          </span>
        </div>
        <div className="rTableHead rTableAction">&nbsp;</div>
      </div>

      <div className="rTableBody">
        {items.map(item => (
          <Item key={item.get('id')} item={item} {...rest} />
        ))}
      </div>
    </div>
  );
};

Layout.propTypes = {
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
  checkedAll: PropTypes.bool,
  handleCheck: PropTypes.func,
};

export default Layout;
