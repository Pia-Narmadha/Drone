

export const mapWeatherDataRecevied = (state, action) => {
  const { data } = action;
  return {
    ...state,
    mapDataLoading:false,
    mapData:data,
  };
}






