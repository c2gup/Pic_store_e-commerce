// import {Reac , useState, useEffect} from "react";
// import DashboardHeader from "./DashboardHeader";
// import axios from "axios";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { useLocation } from "react-router-dom";
// import ExpenseCard from "./ExpenseCard";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// function Analytics() {

// const [tillNow, setTillNow] = useState([]);
// const [thisyear, setThisyear] = useState([]);
// const [thismonths, setThismonths] = useState([]);
// const [thisweak, setThisweak] = useState([]);

// const getPostsByDateRange = async () =>{
//   const res = await axios.get(import.meta.env.VITE_API_URL+"/api/post/postByDateRange",{

//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("accessToken"),

//    },
//    withCredentials : true,
//   });

//   const {data} = await res.data;
//   console.log("analytics data ",data);
//   setTillNow(data.tillNow);
//   setThisyear(data.thisYear);
//   setThismonths(data.thisMonth);
//   setThisweak(data.thisWeek);

// };

// const calculateTotalForSeller = (data) =>{
//   const value = data.reduce((acc, curr) =>{
//     const price = curr.price || 0;
//     const purchases = curr.purchasedBy ? curr.purchasedBy.length : 0;
//     return acc + price * purchases;
//   },0);

//   return value;
// };

// const calculateTotalForBuyer = (data).reduce((acc,curr) => acc + curr.price, 0);

// useEffect(()=>{
//   getPostsByDateRange();
// },[])
//   const pathname = useLocation();
//   return (
//     <>
//       <div className=" flex  flex-col gap-5">
//       <div className="flex flex-col gap-5">
//         <DashboardHeader />
//         <h1 className="text-2xl font-semibold mb-5 ml-8">Analytics anupam</h1>
//         <h2 className=" text-2xl font-semibold my-5 ml-8">
//           {pathname == "/seller/profile" ? "Uploaded" : "purchased"}This Year
//         </h2>

//         <div className="w-[83vw] sm:w-[80vw] ml-8 p-2 bg-white rounded-s-2xl shadow-md flex flex-col justify-between items-center gap-5">
//           <ResponsiveContainer width="100%" height={150}>
//             <LineChart
//               margin={{
//                 top: 20,
//                 bottom: -50,
//                 left: -61,
//               }}
//                 width={300}
//                 height={100}
//               data={thisyear}
//             >
//               <XAxis dataKey="title" hide />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="price"
//                 stroke="#8884d8"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//           <p>Total Earned : 50000</p>
//         </div>
//       </div>

//       <div className="flex gap-2 w-[95%]">

//         <ExpenseCard />
//         <ExpenseCard />
//         <ExpenseCard />
//       </div>
//       </div>
//     </>
//   );
// }

// export default Analytics;

import { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocation } from "react-router-dom";
import ExpenseCard from "./ExpenseCard";

function Analytics() {
  const [tillNow, setTillNow] = useState([]);
  const [thisYear, setThisYear] = useState([]);
  const [thisMonth, setThisMonth] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);

  const getPostsByDateRange = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/post/postByDateRange`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      const { data } = await res.data;
      console.log("analytics data ", data);
      setTillNow(data.tillNow);
      setThisYear(data.thisYear);
      setThisMonth(data.thisMonth);
      setThisWeek(data.thisWeek);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  const calculateTotalForSeller = (data) => {
    const value = data.reduce((acc, curr) => {
      const price = curr.price || 0;
      const purchases = curr.purchasedBy ? curr.purchasedBy.length : 0;
      return acc + price * purchases;
    }, 0);
    return value;
  };


  const calculateTotalForBuyer = (data = []) =>
    data.reduce((acc, curr) => acc + (curr.price || 0), 0);
  
  useEffect(() => {
    getPostsByDateRange();
  }, []);

  const pathname = useLocation();

  return (
    <div className="flex flex-col gap-5 p-4 bg-gray-100 min-h-screen">
      <DashboardHeader />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Analytics</h1>

      <h2 className="text-2xl font-semibold text-gray-700 my-4">
        {pathname.pathname === "/seller/profile" ? "Uploaded" : "Purchased"}{" "}
        This Year
      </h2>

      {/* Line Chart Section */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={thisYear}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 0,
            }}
          >
            <XAxis dataKey="title" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4A90E2"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-lg font-medium text-gray-800 mt-4">
          Total {pathname == "/seller/profile" ? "Earned" : "spendt"} : $
          {pathname == "seller/profile"
            ? calculateTotalForSeller(thisYear)
            : calculateTotalForBuyer(thisYear)}
        </p>
      </div>

      {/* Expense Cards Section */}
      {!thisMonth?.length ? (
        <>
          <h1>no data available</h1>
        </>
      ) : (
        <div className="flex flex-wrap gap-4 justify-between mt-6">
          <ExpenseCard
            data={thisWeek}
            title={`${pathname == "/seller/profile" ? "Earned " : "spent"} This Week`}
            dataKey="price"
            value={
              pathname == "/seller/profile"
                ? calculateTotalForSeller(thisWeek)
                : calculateTotalForBuyer(thisWeek)
            }
          />
          <ExpenseCard
            data={thisMonth}
            title={`${pathname == "/seller/profile" ? "Earned " : "spent"}`}
            dataKey="price"
            value={
              pathname == "/seller/profile"
                ? calculateTotalForSeller(thisMonth)
                : calculateTotalForBuyer(thisMonth)
            }
          />
          <ExpenseCard
            data={tillNow}
            title={`${pathname == "/seller/profile" ? "Earned " : "spent"}`}
            dataKey="price"
            value={
              pathname == "/seller/profile"
                ? calculateTotalForSeller(tillNow)
                : calculateTotalForBuyer(tillNow)
            }
          />
        </div>
      )}
    </div>
  );
}

export default Analytics;
