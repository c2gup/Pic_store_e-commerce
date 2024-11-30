import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ExpenseCard({ data, title, value, dataKey }) {
  return (
    <div className="w-[83vw] sm:w-[25vw] ml-8 p-4 bg-white rounded-2xl shadow-md flex flex-col justify-between items-center gap-5">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-xl font-bold text-gray-900">${value}</p>

      {data?.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <XAxis dataKey={dataKey} tick={false} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#4A90E2"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );
}

export default ExpenseCard;
