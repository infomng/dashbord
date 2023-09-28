import "./topsells.scss";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const Topsells = () => {
 const data = [
   { name: "Mobile", value: 400, color: "#0088FE" },
   { name: "Desktop", value: 300, color: "#00C49F" },
   { name: "Laptop", value: 300, color: "#FFBB28" },
   { name: "tablet", value: 200, color: "#FF8042" },
 ];

 const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

  return (
    <div className="topsells">
      <span className="title">Top sells</span>
      <div className="chart">
      
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
    
      </div>
      <div className="details">
        {data.map((item, index) => (
          <div className="details-container" key={index}>
            <div className="item-type">
              <div
                className="dot"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.name}</span>
            </div>

            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topsells;
