import { take, race, takeEvery, call, put, cancel, all } from "redux-saga/effects";
import {delay} from "redux-saga";
import API from "../api";
import * as actions from "../actions";


function* pollSagaWorkerMap(action) {
  while (true) {
    try 
    {
      console.log("POLLING: map weather every 4s");
      const { data } = yield call(API.findWeatherUsingDrone);
      yield put({ type: actions.MAP_WEATHER_DATA_RECEIVED, data });
      yield put({ type: actions.CHANGE_MAP_PIN_POINT });
      yield call(delay, 4000);
    } 
    catch (error) 
    {
      yield put({ type: actions.API_ERROR, code: error.code });
      yield put({ type: actions.POLL_STOP_MAP});
      yield cancel();
      return;
    }
  }
}

function* pollSagaWatcherMap(action) {
  while (true) {
    //yield take(actions.POLL_START_MAP);
    yield race([
      call(pollSagaWorkerMap, action),
      take(actions.POLL_STOP_MAP)
    ]);
  }
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.POLL_START_MAP,pollSagaWatcherMap),
  ]);
}

export default [watchAppLoad];
