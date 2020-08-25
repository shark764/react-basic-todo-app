import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { setFetchedData } from '../actions';

const API_URL = 'https://cdn.contentful.com';
const SPACE_ID = 'srlpekq85luo';
const ENVIRONMENT_ID = 'master';
const ACCESS_TOKEN = 'evMFF1eK--2PX6Qqrlq8glrKOurVH1pdvaI-FRgmufU';
const CONTENT_TYPE = 'todo';

export default function* watcherSaga() {
  yield takeEvery('FETCH_DATA', workerSaga);
}

function* workerSaga() {
  try {
    const data = yield call(getData);
    yield put(setFetchedData(data));
  } catch (e) {
    yield put({ type: 'API_ERRORED', payload: e });
  }
}

function getData() {
  return axios
    .get(
      `${API_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}`,
    )
    .then(response => response.data.items)
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
