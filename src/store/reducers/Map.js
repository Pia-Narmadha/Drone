
export const changePinPoint = (state,action) =>{
  //action should have the details about the type of weather as its data.
  let mod = state.mapData.length <= 0 ? 1:state.mapData.data.length;
  const newPinPointIndex = (state.currentPinPointIndex + 1 )% mod;
  return {
    ...state,
    currentPinPointIndex:newPinPointIndex,
  }
}

export const initializePinPoint = (state,action) =>{
  
  return {
    ...state,
    currentPinPointIndex: 0,
  }
}
