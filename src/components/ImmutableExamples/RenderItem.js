import React from 'react';

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

export default RenderItem;
