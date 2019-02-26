import * as actions from "../actions";

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

const toF = c => (c * 9) / 5 + 32;

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const weatherIDReceived = (state, action) => {
  return { ...state, weatherId: action.id };
};

const weatherDataRecevied = (state, action) => {
  const { data } = action;
  if (!data["consolidated_weather"]) return state;
  const weather = data.consolidated_weather[0];
  const { weather_state_name, the_temp } = weather;
  const { latt_long, title: name } = data;
  const [latitude, longitude] = latt_long.split(",");
  
  return {
    ...state,
    loading: false,
    latitude,
    longitude,
    temperatureinCelsius: the_temp,
    temperatureinFahrenheit: toF(the_temp),
    weather_state_name,
    name,
    data: action.data,
  };
};

const mapWeatherDataRecevied = (state, action) => {
  const { data } = action;
  return {
    ...state,
    mapDataLoading:false,
    mapData:data,
  };
};

const newTabSelected = (state,action) => {
  return {
    ...state,
    currentTab: action.data,
  }
}
const changeChartData = (state,action) =>{
  //action should have the details about the type of weather as its data.
  const dayNames=["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
  const typeOfWeather = action.data === undefined ? state.currentTab :action.data; 
  const chartData = state.data.consolidated_weather.map(
              (perDayWeather,index) => {
                const point = [dayNames[new Date(perDayWeather["applicable_date"]).getDay()],perDayWeather[typeOfWeather]];
                return point;
              });
  return {
    ...state,
    chartData:[{label:typeOfWeather,data:chartData}],
  }
}
const changePinPoint = (state,action) =>{
  //action should have the details about the type of weather as its data.
  let mod = state.mapData.length <= 0 ? 1:state.mapData.data.length;
  const newPinPointIndex = (state.currentPinPointIndex + 1 )% mod;
  return {
    ...state,
    currentPinPointIndex:newPinPointIndex,
  }
}
const changeAppView = (state,action) =>{
  const newAppView = (state.currentAppView ==="ChartView" )? "MapView" : "ChartView";
  return {
    ...state,
    currentAppView: newAppView,
  }
}
const initializePinPoint = (state,action) =>{
  
  return {
    ...state,
    currentPinPointIndex: 0,
  }
}
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
