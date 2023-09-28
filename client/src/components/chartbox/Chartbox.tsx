import { chartBoxUser } from "../../data";
import Tinychart from "../tinychart/Tinychart";
import "./chartbox.scss";
import { Link } from "react-router-dom";
import { PureComponent } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



type Props = {
  title: string;
  icon: string;
  color: string;
  number: number;
  percentage: number;
  dataKey: string;
  chartData: object[];
};

const Chartbox = (props:Props) => {
    const data = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];
  return (
    <div className="chartbox">
      <div className="chartbox-detail">
        <div className="header">
          <img src={props.icon} alt="icon" className="icon" />
          <span className="title">{props.title}</span>
        </div>
        <div className="info">  
          <span>{props.number}</span>
          <Link to="" style={{ color: props.color }}>
            View
          </Link>
        </div>
      </div>
      <div className="graph-percentage">
        <div className="graph">
          <div className="tinychart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={props.chartData}>
                <Tooltip
                  contentStyle={{ background: "transparent", border: "none" }}
                  labelStyle={{ display: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey={props.dataKey}
                  stroke={props.color}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>{" "}
        </div>
        <div className="percentage">
          <span style={{color: props.percentage< 0? "tomato":"lightgreen"}}> {props.percentage}% </span>
          <span>This month  </span>
        </div>
      </div>
    </div>
  );
};

export default Chartbox;
