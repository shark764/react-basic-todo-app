import React from 'react';
import { Map, List, fromJS } from 'immutable';

import RenderMap from './RenderMap';
import RenderList from './RenderList';
import RenderFromJS from './RenderFromJS';

const HelloImmutable = () => {
  const dataMap = new Map({
    id: '0c040da0-d46d-11ea-87d0-0242ac130003',
    name: 'Bruce Banner',
    username: 'The powerless Hulk',
  });

  const items = new List([
    new Map({ id: '03f0c658-d48b-11ea-87d0-0242ac130003', name: 'Jimmy' }),
    new Map({ id: '0b48e4c6-d48b-11ea-87d0-0242ac130003', name: 'Kelly' }),
    new Map({ id: '16cf3854-d48b-11ea-87d0-0242ac130003', name: 'Billy' }),
  ]);

  const itemsJs = [
    { id: 'fc32adf0-f1ab-432e-85f9-df75589db70c', name: 'Sean' },
    { id: '081de183-9710-4bc9-aa7a-7f10b1dc7b7a', name: 'Stephen' },
    { id: '9b4032ff-bb9e-4aa5-b8ba-63034cda16e5', name: 'Maggie' },
  ];
  const itemsNoJs = fromJS(itemsJs);

  return (
    <>
      <RenderMap dataMap={dataMap} />

      <RenderList items={items} />

      <RenderFromJS items={itemsNoJs} />
    </>
  );
};

export default HelloImmutable;
