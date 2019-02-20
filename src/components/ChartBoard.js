import React from "react";

import { connect } from "react-redux";
import * as actions from "../store/actions";
import LineChart from './LineChart';

class ChartBoard extends React.Component{

  componentDidMount() {
    this.props.onLoad();
  }
  changeTab(val){
      this.props.changeTab(val);
      this.props.changeChartData(val);
  }
  render(){
      let data= [];
      if(!this.props.loading){
          data = this.props.chartData;
      }
      let tabs = [];
      tabs = this.props.label.map(
                                    (value,index) => { let active=(this.props.currentTab === value)?"btn-dark":"btn-light";
                                                    
                                                    return(
                                            
                                                            <button key={index}
                                                                    className={"btn "+active}
                                                                    onClick={
                                                                                ()=>this.changeTab(value)
                                                                            }> 
                                                                                {this.props.displayLabel[index]} 
                                                            </button>
                                                        );
                                        });
      return(<div>
                <div className="btn-group" >
                    {tabs}
                </div>
                <div className="chartArea" style={{margin: "auto",width: "400px"}}>
                    <LineChart data={data} />
                </div>
          </div>)
  }

}


const mapState = (state, ownProps) => {
  const weatherArray = state.weather.data.consolidated_weather;
  const city = state.weather.name;
  const {
        chartVisibility,
        chartData,
        currentTab,
        label,
        displayLabel,
    } = state.weather;
  const {
            loading,
            name,
            weather_state_name,
            temperatureinFahrenheit,
        } = state.weather;
  return ({
        weatherArray,
        city,
        loading,
        name,
        weather_state_name,
        temperatureinFahrenheit,
        chartVisibility,
        chartData,
        currentTab,
        label,
        displayLabel,
  });
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_WEATHER,
      longitude: -95.3698,
      latitude: 29.7604
    }),
    changeChartData: (data) =>
    dispatch({
      type: actions.CHANGE_CHART_DATA,
      data,
    }),
    changeTab: (data) =>
    dispatch({
      type: actions.NEW_TAB_SELECTED,
      data,
    }),
});

export default connect(
  mapState,
  mapDispatch
)(ChartBoard);