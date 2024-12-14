"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import Loading from "@/components/Loading";
import { execOnce } from "next/dist/shared/lib/utils";
import { v4 } from "uuid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartMonths = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState("2024");
  // const [data, setData] = useState();
  const [max, setMax] = useState(100);
  const [years, setYears] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [stacked, setStacked] = useState(false);
  const [pieDataset, setPieDataset] = useState();

  const colors = [
    "255, 99, 132",
    "255, 159, 64",
    "255, 205, 86",
    "75, 192, 192",
  ];
  const nonStackedColor = "4, 230, 0";

  const types = ["Food", "Entertainment", "Transportation", "Accommodation"];

  // The month labels
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  /**
   * data uses the datasets state so that it gets automatically get updated
   * when the value of datasets change.
   */
  const data = {
    labels: labels,
    datasets: datasets,
  };
  const pieData = {
    labels: types,
    datasets: [
      {
        data: pieDataset,
        backgroundColor: [
          "rgba(" + colors[0] + ", 0.7)",
          "rgba(" + colors[1] + ", 0.7)",
          "rgba(" + colors[2] + ", 0.7)",
          "rgba(" + colors[3] + ", 0.7)",
        ],
        borderColor: [
          "rgba(" + colors[0] + ")",
          "rgba(" + colors[1] + ")",
          "rgba(" + colors[2] + ")",
          "rgba(" + colors[3] + ")",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configurations for the chart
  // Use the state `max` to scale appropriately to currect data
  let delayed = true;
  const options = {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && delayed) {
          delay = context.dataIndex * 100 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Amount",
        },
        display: true,
        beginAtZero: true,
        max: max,
        stacked: stacked,
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
        display: true,
        stacked: stacked,
      },
    },
  };

  // Get's all the data and stores it in expenses
  const fetchData = async () => {
    try {
      console.log("Calling API...");
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/expenses`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setExpenses(data.expenses);
    } catch (error) {
      console.error(error);
    }
  };

  // 1. Filters the data by the `currentYear`
  // 2. Adds up the amounts of expenses with the same months
  // 3. Inserts those sums into an array that can be used as data from the chart.
  // 4. Sets the `datasets` state to that array
  const updateDatasets = () => {
    if (expenses.length === 0) return [];
    const filteredData = expenses
      .filter(
        (item) => new Date(item.date).getFullYear().toString() === currentYear
      )
      .reduce((acc, item) => {
        const monthIndex = new Date(item.date).getMonth();
        if (!acc[monthIndex]) {
          acc[monthIndex] = [0, 0, 0, 0];
        }
        acc[monthIndex][types.indexOf(item.type)] += item.amount;
        return acc;
      }, {});

    console.log(filteredData);

    const amounts = [];
    const typeTotals = [0, 0, 0, 0];
    for (let i = 0; i < 12; i++) {
      amounts.push([0, 0, 0, 0]);
    }
    Object.keys(filteredData).forEach((monthIndex) => {
      amounts[monthIndex] = filteredData[monthIndex];
      for (let i = 0; i < 4; i++) {
        typeTotals[i] += filteredData[monthIndex][i];
      }
    });
    const monthTotals = amounts.map((month) => {
      let sum = month.reduce((a, b) => {
        return a + b;
      });
      return sum;
    });
    const maxTotal = monthTotals.reduce((a, b) => (a > b ? a : b));
    setMax(Math.ceil(maxTotal * 1.05));

    const tempDatasets = [];
    if (stacked) {
      for (let i = 0; i < 4; i++) {
        tempDatasets.push({
          label: types[i],
          data: amounts.map((month) => month[i]),
          backgroundColor: "rgba(" + colors[i] + ", 0.2)",
          hoverBackgroundColor: "rgba(" + colors[i] + ", 1)",
          borderColor: "rgb(" + colors[i] + ")",
          borderWidth: 1,
          barPercentage: 1,
          borderRadius: 5,
        });
      }
    } else {
      tempDatasets.push({
        label: "Total",
        data: monthTotals,
        backgroundColor: "rgba(" + nonStackedColor + ", 0.2)",
        hoverBackgroundColor: "rgba(" + nonStackedColor + ", 1)",
        borderColor: "rgb(" + nonStackedColor + ")",
        borderWidth: 1,
        barPercentage: 1,
        borderRadius: 5,
      });
    }
    setDatasets(tempDatasets);
    setPieDataset(typeTotals);
  };

  // Toggle stacked
  const toggleStacked = () => {
    setStacked(!stacked);
  };

  // Store the years that include the expenses into the state `years`
  const getAvailableYears = () => {
    let newYears = [];
    expenses.map((expense) => {
      const year = new Date(expense.date).getFullYear();
      if (!newYears.includes(year)) newYears.push(year);
    });
    setYears(newYears);
  };

  // Waits for the fetchData to get data and sets the `loading` stat to `false`.
  useEffect(() => {
    try {
      setLoading(true);
      fetchData().finally(() => {
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Get available years and update the dataset when the expenses gets the data
  useEffect(() => {
    getAvailableYears();
    updateDatasets();
    // setData();
  }, [expenses]);

  // Update the dataset when a different year is chosen
  useEffect(() => {
    updateDatasets();
  }, [currentYear, stacked, nonStackedColor]);

  if (loading) return <Loading />;
  return (
    <>
      <div className="flex gap-8 justify-center items-center">
        <div className=" text-2xl">
          <label htmlFor="year">Year: </label>
          <select
            name="year"
            id="year"
            value={currentYear}
            onChange={(e) => {
              setCurrentYear(e.target.value);
            }}
          >
            {years.map((year) => {
              return (
                <option value={year} key={v4()}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button className="button button-blue" onClick={toggleStacked}>
          Toggle Stack
        </button>
      </div>
      <div className="flex w-full p-20">
        <div className="w-[700px] mx-auto">
          <Bar data={data} options={options} />
        </div>
        <div className="w-[300px] mx-auto">
          <Pie data={pieData} />
        </div>
      </div>
    </>
  );
};

export default ChartMonths;
