import * as actions from "../actions";
import {startLoading,weatherIDReceived,weatherDataRecevied} from './Weather.js'
import {changeAppView} from './AppView'
import {newTabSelected,changeChartData} from './Chart'
import {mapWeatherDataRecevied} from'./Drone.js'
import {changePinPoint,initializePinPoint} from './Map.js'


const initialState = {
  loading: false,
  weatherId: null,
  name: "",
  temperature: "",
  weather_state_name: "",
  latitude: null,
  longitude: null,
  data: {},
  chartVisibility : false,
  chartData: [],
  currentTab:"air_pressure",
  weatherArray:[],
  label:['air_pressure',
                            'humidity',
                            'max_temp',
                            'min_temp',
                            'the_temp',
                            'visibility',
                            'wind_speed'
                            ],
  displayLabel:['Air Pressure',
                            'Humidity',
                            'Max Temp',
                            'Min Temp',
                            'The Temp',
                            'Visibility',
                            'Wind speed'
                            ],
  currentPinPointIndex : 0,
  mapData : {data:[],},
  mapDataLoading:true,
  currentAppView:"ChartView"
};


const handlers = {
  [actions.FETCH_WEATHER]: startLoading,
  [actions.WEATHER_ID_RECEIVED]: weatherIDReceived,
  [actions.WEATHER_DATA_RECEIVED]: weatherDataRecevied,
  [actions.NEW_TAB_SELECTED]:newTabSelected,
  [actions.CHANGE_CHART_DATA]:changeChartData,
  [actions.MAP_WEATHER_DATA_RECEIVED]:mapWeatherDataRecevied,
  [actions.CHANGE_MAP_PIN_POINT]:changePinPoint,
  [actions.CHANGE_APP_VIEW]: changeAppView,
  [actions.INITIALIZE_PIN_POINT]:initializePinPoint,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
