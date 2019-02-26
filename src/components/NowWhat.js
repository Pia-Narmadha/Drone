import React from "react";
import ChartBoard from './ChartBoard';
import MapBoard from './MapBoard';
import * as actions from "../store/actions";
import { connect } from "react-redux";

class NowWhat extends React.Component{

 changeTab(val){
      switch(val){
        case "ChartView":
          this.props.stopPollingMap();
        break;
        case "MapView":
          this.props.stopPollingChart();
        break;
        default:
      }
      this.props.changeAppView();
  }
  render(){
    let tabs = [];
    let chartButtonVisibility=(this.props.currentAppView ==="ChartView")?true:false;
    let mapButtonVisibility = !chartButtonVisibility;
    tabs.push( <button key={"ChartView" } disabled={chartButtonVisibility} className={"btn "} onClick={()=>this.changeTab("ChartView") }> 
                       {"Chart View"} 
               </button>
             );
    tabs.push( <button key={"MapView" } disabled={mapButtonVisibility}className={"btn "}onClick={()=>this.changeTab("MapView") }> 
                       {"Map View"} 
               </button>
             );
             if(this.props.currentAppView === "ChartView")
             {
                  return(
                    <div className="chartBoard" style={{textAlign: "center"}}>
                      <div className="btn-group" >
                                  {tabs}
                      </div>
                    <ChartBoard />
                    </div>
                );
             }
             else{
                    return(
                        <div className="chartBoard" style={{textAlign: "center"}}>
                          <div className="btn-group" >
                                      {tabs}
                          </div>
                        <MapBoard />
                        </div>
                );
             }
  }
}
const mapState = (state, ownProps) => {
  const {
    currentAppView
  } = state.weather;
  return {
    currentAppView
  };
};
const mapDispatch = dispatch => ({
    showMap: () =>
    dispatch({
      type: actions.POLL_START_MAP,
    }),
    stopPollingMap: () =>
    dispatch({
      type: actions.POLL_STOP_MAP,
    }),
    stopPollingChart: () =>
    dispatch({
      type: actions.POLL_STOP_TEXAS,
    }),
    changeAppView: () =>
    dispatch({
      type: actions.CHANGE_APP_VIEW,
    }),
});
export default connect(
  mapState,
  mapDispatch
)(NowWhat);
