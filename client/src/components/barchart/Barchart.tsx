import './barchart.scss'
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


type Props ={
    title: string,
    color: string,
    dataKey: string,
    
    chartData: [
        name: string
    ]

}

const Barchart = (props:Props) => {


  return (
    <div className="barchart">
      <span className="title">{props.title}</span>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={props.chartData}>
            <Bar dataKey={props.dataKey} fill={props.color} />
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
              payload={[{dataKey:props.dataKey,name:props.chartData[0]}]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Barchart