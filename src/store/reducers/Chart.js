
export const newTabSelected = (state,action) => {
  return {
    ...state,
    currentTab: action.data,
  }
}
export const changeChartData = (state,action) =>{
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