import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ item }) => (
  <div className="rTableRow">
    {Object.keys(item).map((cell, index) => (
      <div key={index.toString()} className="rTableCell">
        <span>{item[cell]}</span>
      </div>
    ))}
  </div>
);
TableRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default TableRow;
