import React from "react";
import { Chart } from "react-charts";



class LineChart extends React.Component{

  render(){
    
      
      return(
      // A react-chart hyper-responsively and continuusly fills the available
      // space of its parent element automatically
          <div
            style={{
              width: "400px",
              height: "300px"
            }}
          >
            <Chart
              data={this.props.data}
              axes={[
                { primary: true, type: "ordinal", position: "bottom" },
                { type: "linear", position: "left" }
              ]}
            />
          </div>
        );
  }
}

export default LineChart;
