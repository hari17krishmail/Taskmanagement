import { all } from 'redux-saga/effects';

import watchTaskSagas from './taskSagas';

export default function* rootSaga() {
  yield all([
    watchTaskSagas(),
  ]);
}