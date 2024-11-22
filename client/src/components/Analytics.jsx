import React from "react";
import DashboardHeader from "./DashboardHeader";


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
import { useLocation } from "react-router-dom";
import ExpenseCard from "./ExpenseCard";

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

function Analytics() {
  const pathname = useLocation();
  return (
    <>
      <div className=" flex  flex-col gap-5">
      <div className="flex flex-col gap-5">
        <DashboardHeader />
        <h1 className="text-2xl font-semibold mb-5 ml-8">Analytics anupam</h1>
        <h2 className=" text-2xl font-semibold my-5 ml-8">
          {pathname == "/seller/profile" ? "Uploaded" : "purchased"}This Year
        </h2>

        <div className="w-[83vw] sm:w-[80vw] ml-8 p-2 bg-white rounded-s-2xl shadow-md flex flex-col justify-between items-center gap-5">
          <ResponsiveContainer width="100%" height={150}>
            <LineChart
              margin={{
                top: 20,
                bottom: -50,
                left: -61,
              }}
              //   width={300}
              //   height={100}
              data={data}
            >
              <XAxis dataKey="title" hide />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amt"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <p>Total Earned : 50000</p>
        </div>
      </div>

      <div className="flex gap-2 w-[95%]">
            
        <ExpenseCard />
        <ExpenseCard />
        <ExpenseCard />
      </div>
      </div>
    </>
  );
}

export default Analytics;
