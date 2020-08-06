import { takeEvery, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as contentful from 'contentful';
import * as contentfulManagement from 'contentful-management';

import * as ACTIONS from '../constants';
import { storeRetrievedItems, storeAddedItem, storeUpdatedItem, removedItem } from '../actions';

const SPACE_ID = 'srlpekq85luo';
const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';
const ACCESS_TOKEN_MANAGEMENT = 'CFPAT-WAjUteVc06b2IhNAw7_DXGQUXCmv0ZMc6_m9obcABag';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const clientManagement = contentfulManagement.createClient({
  accessToken: ACCESS_TOKEN_MANAGEMENT,
});

export default function* watcherSaga() {
  yield takeEvery(ACTIONS.RETRIEVE_ITEMS, retrieveDataSaga);
  yield takeEvery(ACTIONS.ADD_ITEM, addItemSaga);
  yield takeEvery(ACTIONS.UPDATE_ITEM, updateItemSaga);
  yield takeEvery(ACTIONS.REMOVE_ITEM, removeItemSaga);
}

/**
 * GET DATA
 */
function* retrieveDataSaga() {
  try {
    const payload = yield call(getData);
    yield put(storeRetrievedItems(payload));
  } catch (e) {
    yield put({ type: 'API_ERRORED', payload: e });
  }
}

function getData() {
  return client
    .getEntries({
      content_type: 'todo',
    })
    .then(({ items }) => {
      /**
       * Transforming contentful data into array of objects
       * with {id, name, type, description, createdAt}
       */
      const todos = items.map(item => ({
        ...item.fields,
        id: item.sys.id,
        createdAt: new Date(item.sys.createdAt).getTime(),
      }));
      console.log(`%cEntries fetched from space...${SPACE_ID}`, 'background: #d7dae0; color: #282c34;', todos);
      return fromJS(todos);
    })
    .catch(err => {
      console.error(err);
    });
}

/**
 * ADD ITEM
 */
function* addItemSaga(action) {
  try {
    const payload = yield call(createItem, action);
    yield put(storeAddedItem(payload));
  } catch (e) {
    yield put({ type: 'API_ERRORED', payload: e });
  }
}

function createItem({ payload }) {
  return clientManagement.getSpace(SPACE_ID).then(space =>
    space
      .createEntry('todo', {
        fields: {
          name: {
            'en-US': payload.name,
          },
          type: {
            'en-US': payload.type,
          },
          description: {
            'en-US': payload.description,
          },
          isCompleted: {
            'en-US': false,
          },
        },
      })
      .then(entry => {
        /**
         * Entry will be added as a draft,
         * until we publish it
         */
        entry.publish();

        const todo = {
          id: entry.sys.id,
          createdAt: new Date(entry.sys.createdAt).getTime(),
        };
        /**
         * Transforming contentful new entry into
         * object with {id, name, type, description, createdAt}
         */
        Object.entries(entry.fields).forEach(([key, value]) => {
          todo[key] = value['en-US'];
        });

        console.log(`%cEntry ${entry.sys.id} created.`, 'background: #d7dae0; color: #282c34;', todo);
        return fromJS(todo);
      })
      .catch(error => {
        console.log('Error occurred while creating Entry');
        console.error(error);
      }),
  );
}

/**
 * UPDATE ITEM
 */
function* updateItemSaga(action) {
  try {
    const payload = yield call(updateItem, action);
    yield put(storeUpdatedItem(action.id, payload));
  } catch (e) {
    yield put({ type: 'API_ERRORED', payload: e });
  }
}

function updateItem({ id, payload }) {
  return clientManagement
    .getSpace(SPACE_ID)
    .then(space => space.getEntry(id))
    .then(entry => {
      // eslint-disable-next-line no-param-reassign
      delete payload.id;
      // eslint-disable-next-line no-param-reassign
      delete payload.createdAt;
      Object.entries(payload).forEach(([key, value]) => {
        // eslint-disable-next-line no-param-reassign
        entry.fields[key]['en-US'] = value;
      });
      return entry.update();
    })
    .then(entry => {
      /**
       * Entry will be added as a draft,
       * until we publish it
       */
      entry.publish();

      const todo = {
        id: entry.sys.id,
      };
      Object.entries(entry.fields).forEach(([key, value]) => {
        todo[key] = value['en-US'];
      });

      console.log(`%cEntry ${entry.sys.id} updated.`, 'background: #d7dae0; color: #282c34;', todo);
      return fromJS(todo);
    })
    .catch(error => {
      console.log('Error occurred while updating Entry');
      console.error(error);
    });
}

/**
 * DELETE ITEM
 */
function* removeItemSaga(action) {
  try {
    yield call(removeItem, action);
    yield put(removedItem(action.id));
  } catch (e) {
    yield put({ type: 'API_ERRORED', payload: e });
  }
}

function removeItem({ id }) {
  return clientManagement
    .getSpace(SPACE_ID)
    .then(space => space.getEntry(id))
    .then(entry => entry.unpublish())
    .then(entry => {
      console.log(`Entry ${entry.sys.id} unpublished.`);
      return entry;
    })
    .then(entry => entry.delete())
    .then(() => {
      console.log(`%cEntry ${id} removed.`, 'background: #d7dae0; color: #282c34;');
    })
    .catch(error => {
      console.log('Error occurred while removing Entry');
      console.error(error);
    });
}
