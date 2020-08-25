import { takeEvery, call, put } from 'redux-saga/effects';
import * as contentful from 'contentful';
import * as contentfulManagement from 'contentful-management';
import { tasksFetched, taskCreated, taskUpdated, taskRemoved } from '../actions';

const SPACE_ID = 'srlpekq85luo';
const ENVIRONMENT_ID = 'master';
const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';
const ACCESS_TOKEN_MANAGEMENT = 'CFPAT-WAjUteVc06b2IhNAw7_DXGQUXCmv0ZMc6_m9obcABag';
const CONTENT_TYPE = 'todo';

const client = contentful.createClient({
  space: SPACE_ID,
  environment: ENVIRONMENT_ID,
  accessToken: ACCESS_TOKEN,
});

const clientManagement = contentfulManagement.createClient({
  accessToken: ACCESS_TOKEN_MANAGEMENT,
});

export default function* watcherSaga() {
  yield takeEvery('FETCH_DATA', workerSaga);
  yield takeEvery('CREATE_TASK', workerSaga);
  yield takeEvery('UPDATE_TASK', workerSaga);
  yield takeEvery('REMOVE_TASK', workerSaga);
}

function* workerSaga(action) {
  try {
    switch (action.type) {
      case 'FETCH_DATA': {
        const data = yield call(getData);
        yield put(tasksFetched(data));
        break;
      }
      case 'CREATE_TASK': {
        const data = yield call(createTask, action);
        yield put(taskCreated(data));
        break;
      }
      case 'UPDATE_TASK': {
        const data = yield call(updateTask, action);
        yield put(taskUpdated(action.id, data));
        break;
      }
      case 'REMOVE_TASK': {
        yield call(removeTask, action);
        yield put(taskRemoved(action.id));
        break;
      }
      default:
        break;
    }
  } catch (e) {
    yield put({ type: 'API_ERRORED', payload: e });
  }
}

function getData() {
  return client
    .getEntries({
      content_type: CONTENT_TYPE,
    })
    .then(response => response.items)
    .then(response => dataTransformer(response))
    .catch(err => {
      console.error(err);
    });
}

function dataTransformer(data) {
  return data.map(({ fields, sys }) => ({
    ...fields,
    checked: fields.isCompleted,
    id: sys.id,
  }));
}

function createTask({ data }) {
  return clientManagement
    .getSpace(SPACE_ID)
    .then(space => space.getEnvironment(ENVIRONMENT_ID))
    .then(environment =>
      environment.createEntry(CONTENT_TYPE, {
        fields: {
          name: {
            'en-US': data.name,
          },
          type: {
            'en-US': data.type,
          },
          description: {
            'en-US': '',
          },
          isCompleted: {
            'en-US': false,
          },
        },
      }),
    )
    .then(entry => {
      /**
       * Entry will be added as a draft,
       * until we publish it
       */
      entry.publish();

      const task = {
        id: entry.sys.id,
        name: entry.fields.name['en-US'],
        checked: entry.fields.isCompleted['en-US'],
      };

      return task;
    })
    .catch(err => {
      console.error(err);
    });
}

function updateTask({ id, checked }) {
  return clientManagement
    .getSpace(SPACE_ID)
    .then(space => space.getEnvironment(ENVIRONMENT_ID))
    .then(environment => environment.getEntry(id))
    .then(entry => {
      // eslint-disable-next-line no-param-reassign
      entry.fields.isCompleted['en-US'] = checked;

      return entry.update();
    })
    .then(entry => {
      /**
       * Entry will be added as a draft,
       * until we publish it
       */
      entry.publish();

      const task = {
        id: entry.sys.id,
        checked: entry.fields.isCompleted['en-US'],
      };

      return task;
    })
    .catch(err => {
      console.error(err);
    });
}

function removeTask({ id }) {
  return clientManagement
    .getSpace(SPACE_ID)
    .then(space => space.getEnvironment(ENVIRONMENT_ID))
    .then(environment => environment.getEntry(id))
    .then(entry => entry.unpublish())
    .then(entry => entry.delete())
    .catch(error => {
      console.error(error);
    });
}
