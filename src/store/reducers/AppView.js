export const changeAppView = (state,action) =>{
  const newAppView = (state.currentAppView ==="ChartView" )? "MapView" : "ChartView";
  return {
    ...state,
    currentAppView: newAppView,
  }
}