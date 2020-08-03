import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ columns }) => (
  <div className="rTableHeading">
    {columns.map((cell, index) => (
      <div key={index.toString()} className="rTableHead">
        <span>{cell}</span>
      </div>
    ))}
  </div>
);
TableHead.propTypes = {
  columns: PropTypes.array,
};

export default TableHead;
