import React from "react";

import { connect } from "react-redux";
import * as actions from "../store/actions";


import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => {
  return(
        <div style={{backgroundColor:"grey",fontSize:"20px"}}>
            <i className="fas fa-map-marker-alt"> {text}</i> 
        </div>
  );
}
class MapBoard extends React.Component{

  componentDidMount() {
    this.props.onLoad();
  }

  render(){
      if(this.props.mapDataLoading)
      {
        return(
          <div>
            <p> Loading ... </p>
          </div>
        )
      }
      else{
        let defaultCenter = {
          lng: -95.3698,lat: 29.7604
        }
        let center = {
            lat: this.props.mapData.data[this.props.currentPinPointIndex].latitude,
            lng: this.props.mapData.data[this.props.currentPinPointIndex].longitude,
          };
        let temperature = this.props.mapData.data[this.props.currentPinPointIndex].accuracy.toFixed(1);
        let zoom =  6;
        return(<div className="mapBoard">
                  <div style={{ height: '100vh', width: '100%',backgroundColor:'red' }}>
                      <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyAPAqP-FzH1BhsSOeUVXm9zGdxjZzgPNTE" }}
                                defaultCenter={defaultCenter}
                                defaultZoom={zoom}
                              >
                        <AnyReactComponent
                          lat={center.lat}
                          lng={center.lng}
                          text={temperature+"F"}
                        />
                        
                      </GoogleMapReact>
                </div>
            </div>)
      }
  }

}


const mapState = (state, ownProps) => {
  const {
            currentPinPointIndex,
            mapData,
            mapDataLoading,
        } = state.weather;
  return ({
      currentPinPointIndex,
      mapData,
      mapDataLoading,
  });
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.POLL_START_MAP,
    },
    {
      type: actions.INITIALIZE_PIN_POINT,
    },
    ),
});

export default connect(
  mapState,
  mapDispatch
)(MapBoard);