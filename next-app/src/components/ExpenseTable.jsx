"use client";

import { v4 } from "uuid";
import clsx from "clsx";
import ExpenseItem from "./ExpenseItem";
import { Left, Right } from "./Icons";

const ExpenseTable = ({
  expenses,
  isEditOpen,
  setIsEditOpen,
  editId,
  setEditId,
  fetchData,
  page,
  totalPage,
  changePage,
}) => {
  return (
    <div className="w-full max-w-screen-lg border-2 border-black p-3 shadow-lg shadow-gray-400 rounded-lg">
      <table className="w-full border-collapse text-xs md:text-2xl ">
        <thead>
          <tr className="bg-[#7352ef] text-white">
            <th className="text-left w-[15%] p-2">Date</th>
            <th className="text-left w-[50%] hidden md:table-cell">
              Description
            </th>
            <th className="text-left w-[20%]">Type</th>
            <th className="text-left w-[20%]">Amount</th>
            <th className="text-left w-[5%] p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, i) => (
            <ExpenseItem
              expense={expense}
              key={v4()}
              isEditOpen={isEditOpen}
              editId={editId}
              setIsEditOpen={setIsEditOpen}
              setEditId={setEditId}
              fetchData={fetchData}
              color={clsx({ "bg-gray-200": i % 2 == 1 })} // Try changing to `clsx`
            />
          ))}
        </tbody>
      </table>
      {expenses.length === 0 && (
        <div className="text-3xl text-center my-3">No expenses recorded</div>
      )}

      {/* Pagination */}
      <div
        className="w-1/2 mx-auto text-sm  md:text-lg mt-3
                        flex justify-around"
      >
        <button
          onClick={() => changePage("prev")}
          disabled={page === 1}
          className={
            "flex items-center disabled:text-gray-400 disabled:fill-gray-400"
          }
        >
          <Left />
          Prev
        </button>
        <div>
          Page:{" "}
          {/* <input
              type="number"
              name="page"
              id="page"
              value={page}
              min={1}
              max={totalPage}
              onChange={(e) => changePage(e.target.value)}
            /> */}
          {page}/{totalPage}
        </div>
        <button
          onClick={() => changePage("next")}
          disabled={page === totalPage}
          className={
            "flex items-center disabled:text-gray-400 disabled:fill-gray-400"
          }
        >
          Next
          <Right />
        </button>
      </div>
    </div>
  );
};

export default ExpenseTable;
