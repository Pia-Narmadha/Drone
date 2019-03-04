
export const toF = c => (c * 9) / 5 + 32;

export const startLoading = (state, action) => {
  return { ...state, loading: true };
};

export const weatherIDReceived = (state, action) => {
  return { ...state, weatherId: action.id };
};

export const weatherDataRecevied = (state, action) => {
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



