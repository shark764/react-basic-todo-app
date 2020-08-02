import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import RenderItem from './RenderItem';

const RenderList = ({ items }) => (
  <div style={{ flex: 1, marginRight: '75px' }}>
    <h3>Immutable.List</h3>
    <div className="rTable">
      <div className="rTableHeading">
        <div className="rTableHead">
          <span>ID</span>
        </div>
        <div className="rTableHead">
          <span>Name</span>
        </div>
      </div>

      <div className="rTableBody">
        {items.map(item => (
          <RenderItem key={item.get('id')} item={item} />
        ))}
      </div>
    </div>
  </div>
);

RenderList.propTypes = {
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
};

export default RenderList;
