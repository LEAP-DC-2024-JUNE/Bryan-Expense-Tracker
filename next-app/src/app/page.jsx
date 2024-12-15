import { Add, Chart, Left, Right } from "@/components/Icons";
import ExpenseItem from "@/components/ExpenseItem";
import dotenv from "dotenv";
import { v4 } from "uuid";
import clsx from "clsx";
import Link from "next/link";
dotenv.config();

const Home = async ({ searchParams }) => {
  let page = parseInt((await searchParams).page);
  let limit = parseInt((await searchParams).limit);
  if (!page) page = 1;
  if (!limit) limit = 5;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/expenses?page=${page}&limit=${limit}`
  );
  const data = await response.json();
  const { expenses, totalPages } = data;

  return (
    <main className="flex flex-col gap-8 items-center xs:px-5">
      {/* Heading of the page */}
      <div className=" w-full relative">
        <h1 className=" text-center text-3xl md:text-5xl font-bold mt-5">
          Expenses
        </h1>
      </div>

      {/* The data table */}
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
          <Link
            href={`/?page=${page - 1}`}
            className={`flex items-center 
                        ${
                          page == 1 &&
                          "pointer-events-none text-gray-400 fill-gray-400"
                        } `}
            aria-disabled={page == 1}
            tabIndex={page == 1 ? -1 : undefined}
          >
            <Left /> Prev
          </Link>
          <div>
            Page: {page}/{totalPages}
          </div>
          <Link
            href={`/?page=${page + 1}`}
            className={`flex items-center 
                        ${
                          page == totalPages &&
                          "pointer-events-none text-gray-400 fill-gray-400"
                        } `}
            aria-disabled={page == totalPages}
            tabIndex={page == totalPages ? -1 : undefined}
          >
            Next <Right />
          </Link>
        </div>
      </div>

      {/* Link to charts and add-expense page */}
      <div className="flex flex-col md:flex-row flex-wrap gap-5">
        {/* Opens the Add Expense Window */}
        <Link href={"/add-expense"} className="button button-blue">
          <Add />
          Add Expense
        </Link>

        {/* Redirects to the Chart page */}
        <Link href="/chart" className="button button-orange">
          <Chart />
          Show Chart
        </Link>
      </div>
    </main>
  );
};

export default Home;
