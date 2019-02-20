import { take, race, takeEvery, call, put, cancel, all } from "redux-saga/effects";
import {delay} from "redux-saga";
import API from "../api";
import * as actions from "../actions";

/*
  1. The weather service requires us to make a search by lat/lng to find its
  weather ID.
  2. We then use that weather ID to get the weather.

  This process is pretty well defined here with a saga.

  call invokes a method
  put dispatches an action
  takeEvery watches actions and executes a function

  Also -- the `*` in function is important; turns it into a "generator"

*/
function* pollSagaWorker(action) {
  const id = action.id;
  while (true) {
    try 
    {
      console.log("polling every 4s");
      const { data } = yield call(API.findWeatherbyId, id);
      yield put({ type: actions.WEATHER_DATA_RECEIVED, data });
      yield call(delay, 4000);
    } 
    catch (error) 
    {
      yield put({ type: actions.API_ERROR, code: error.code });
      yield put({ type: actions.POLL_STOP});
      yield cancel();
      return;
    }
  }
}

function* pollSagaWatcher(action) {
  //const {id} = action;
  while (true) {
    yield take(actions.POLL_START);
    yield race([
      call(pollSagaWorker, action),
      take(actions.POLL_STOP)
    ]);
  }
}

function* watchWeatherIdReceived(action) {
  const id = action.id;
  try{
    const {data } = yield call(API.findWeatherbyId, id);
    yield put({ type: actions.WEATHER_DATA_RECEIVED, data });
    yield put({type:actions.CHANGE_CHART_DATA});
  }
  catch(error)
  {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
}

function* watchFetchWeather(action) {
  const { latitude, longitude } = action;
  const { error, data } = yield call(
    API.findLocationByLatLng,
    latitude,
    longitude
  );
  if (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  const location = data[0] ? data[0].woeid : false;
  if (!location) {
    yield put({ type: actions.API_ERROR });
    yield cancel();
    return;
  }
  yield put({type:actions.POLL_START, id:location}); 
  yield put({ type: actions.WEATHER_ID_RECEIVED, id: location });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_WEATHER, watchFetchWeather),
    takeEvery(actions.WEATHER_ID_RECEIVED, watchWeatherIdReceived),
    takeEvery(actions.POLL_START,pollSagaWatcher),
  ]);
}

export default [watchAppLoad];
