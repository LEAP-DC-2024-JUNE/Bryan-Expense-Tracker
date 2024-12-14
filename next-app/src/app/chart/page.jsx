"use client";
import ChartDays from "@/components/ChartDays";
import ChartMonths from "@/app/chart/ChartMonths";
import ChartYears from "@/components/ChartYears";
import { useState } from "react";

const MyBarChart = () => {
  const [mode, setMode] = useState("month");

  const Charts = {
    year: <ChartYears />,
    month: <ChartMonths />,
    day: <ChartDays />,
  };

  return (
    <div className="">
      <h1 className=" text-center text-3xl md:text-5xl font-bold my-5">
        Expense Chart
      </h1>
      <select
        name="mode"
        id="mode"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="year">Year</option>
        <option value="month">Month</option>
        <option value="day">Day</option>
      </select>
      {Charts[mode]}
    </div>
  );
};

export default MyBarChart;
