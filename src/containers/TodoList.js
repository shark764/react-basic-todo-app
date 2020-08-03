import React from 'react';
import TableRow from '../components/Table/TableRow';
import TableHead from '../components/Table/TableHead';

const columns = ['ID', 'Name', 'Type', 'Description', 'Created At', 'Completed?'];
const items = [
  {
    id: '7d25c77e-d5aa-11ea-87d0-0242ac130003',
    name: 'Wash the dishes',
    type: 'daily-tasks',
    description: 'Take the dishes, and put them in the sink',
    createdAt: 1596474005000,
    completed: 'no',
  },
  {
    id: 'd5da048c-d5ac-11ea-87d0-0242ac130003',
    name: 'Learn Javascript',
    type: 'development-tasks',
    description: 'Open Google... then type "How to Javascript?"',
    createdAt: 1596474082000,
    completed: 'yes',
  },
];

const TodoList = () => (
  <div className="App-main">
    <div className="App-list">
      <h3>List of todos</h3>
      <div className="rTable-container">
        <div className="rTable">
          <TableHead columns={columns} />

          <div className="rTableBody">
            {items.map(item => (
              <TableRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TodoList;
