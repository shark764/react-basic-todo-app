import React from 'react';
import TableRow from '../components/Table/TableRow';
import TableHead from '../components/Table/TableHead';

const columns = ['ID', 'Name', 'Quantity', 'Description', 'Branch'];
const items = [
  {
    id: 'c6c1e018-d5a8-11ea-87d0-0242ac130003',
    name: 'Desktop Computer',
    quantity: 6,
    description: 'A computer that is.... desktop',
    branch: 'Dell',
  },
  {
    id: 'eaaeba46-d5a8-11ea-87d0-0242ac130003',
    name: 'Personal Laptop Computer',
    quantity: 6,
    description: 'A computer that is.... laptop and personal',
    branch: 'Toshiba',
  },
];

const ArticleList = () => (
  <div className="App-main">
    <div className="App-list">
      <h3>List of articles</h3>
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

export default ArticleList;
