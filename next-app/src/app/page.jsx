"use client";

const dotenv = require("dotenv");
dotenv.config();

import AddExpenseWindow from "@/components/AddExpenseWindow";
import EditExpenseWindow from "@/components/EditExpenseWindow";
import Loading from "@/components/Loading";
import { Add, Chart } from "@/components/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import ExpenseTable from "@/components/ExpenseTable";

const Home = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState("-1");
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 5;

  // Get all expenses
  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/expenses?page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setExpenses(data.expenses);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  // Change page
  const changePage = (direction) => {
    if (direction === "prev" && page != 1) {
      setPage(page - 1);
    } else if (direction === "next" && page != totalPage) {
      setPage(page + 1);
    } else {
      setPage(parseInt(direction));
    }
  };

  // Show a loading component before the data is received.
  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, [page]);

  if (loading) return <Loading />;
  return (
    <main className="flex flex-col gap-8 items-center xs:px-5">
      {/* Heading of the page */}
      <div className=" w-full relative">
        <button
          onClick={fetchData}
          className="button button-green inline-block absolute left-0  top-16 mx-56"
        >
          Refresh
        </button>
        <h1 className=" text-center text-3xl md:text-5xl font-bold mt-5">
          Expenses
        </h1>
      </div>

      {/* The data table */}
      <ExpenseTable
        expenses={expenses}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        editId={editId}
        setEditId={setEditId}
        fetchData={fetchData}
        page={page}
        totalPage={totalPage}
        changePage={changePage}
      />

      {/* The Add button and Link to charts page */}
      <div className="flex flex-col md:flex-row flex-wrap gap-5">
        {/* Opens the Add Expense Window */}
        {/* <button
          className="button button-blue"
          onClick={() => {
            setIsAddOpen(true);
          }}
        >
          <Add />
          Add Expense
        </button> */}

        <Link href={"/add-expense"} className="button button-blue">
          <Add />
          Add Expense
        </Link>

        {/* Redirects to the Chart page */}
        <Link
          href="/chart"
          className="button button-orange"
          // onClick={() => {
          //   // Handle show in chart
          // }}
        >
          <Chart />
          Show Chart
        </Link>
      </div>

      {/* The Modal components */}
      <div>
        <EditExpenseWindow
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          id={editId}
          setId={setEditId}
          expense={expenses.find((expense) => expense.id === editId)}
          fetchData={fetchData}
        />
      </div>
    </main>
  );
};

export default Home;
