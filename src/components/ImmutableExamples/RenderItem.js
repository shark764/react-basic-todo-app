import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const RenderItem = ({ item }) => (
  <div className="rTableRow">
    <div className="rTableCell">
      <span>{item.get('id')}</span>
    </div>
    <div className="rTableCell">
      <span>{item.get('name')}</span>
    </div>
  </div>
);

RenderItem.propTypes = {
  item: ImmutablePropTypes.contains({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default RenderItem;
