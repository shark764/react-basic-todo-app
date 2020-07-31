import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { humanize } from '../../utils';
function Layout(props) {
  const {
    item,
    name,
    isCompleted,
    onRemoveItem,
    handleChange,
    handleBlur,
    handleKeyDown,
    handleCheck,
    handleEdit,
  } = props;

  return (
    <div className="rTableRow">
      <div className="rTableCell">
        <span>{item.get('id')}</span>
      </div>
      <div className="rTableCell">
        <span>
          {isCompleted ? (
            <span className="item-completed">{item.get('name')}</span>
          ) : (
            <input
              type="text"
              name="name"
              placeholder="Enter a task name..."
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          )}
        </span>
      </div>
      <div className="rTableCell">
        <span>{humanize(item.get('type'))}</span>
      </div>
      <div className="rTableCell">
        <span>{item.get('description')}</span>
      </div>
      <div className="rTableCell">
        <span>{moment(item.get('createdAt')).format('lll')}</span>
      </div>
      <div className="rTableCell rTableAction">
        <span>
          <input type="checkbox" name="isCompleted" checked={isCompleted} onChange={handleCheck} />
        </span>
      </div>
      <div className="rTableCell rTableAction">
        <button type="button" onClick={() => handleEdit(item.get('id'))}>
          Edit
        </button>
        <button type="button" onClick={() => onRemoveItem(item.get('id'))}>
          X
        </button>
      </div>
    </div>
  );
}

Layout.propTypes = {
  item: ImmutablePropTypes.contains({
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    createdAt: PropTypes.number,
    id: PropTypes.string,
  }),
  name: PropTypes.string,
  isCompleted: PropTypes.bool,
  onRemoveItem: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleKeyDown: PropTypes.func,
  handleCheck: PropTypes.func,
  handleEdit: PropTypes.func,
};

export default Layout;
