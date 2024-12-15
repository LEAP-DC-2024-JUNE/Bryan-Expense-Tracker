"use client";

import { useRouter } from "next/navigation";
import { formatDate, formatAmount } from "@/utils/format";

const ExpenseItem = ({ expense, color }) => {
  const router = useRouter();

  const handleAction = async (event) => {
    const action = event.target.value;
    if (action === "edit") {
      router.push(`/edit-expense/${expense._id}`);
    } else if (action === "delete") {
      // If the Delete button is clicked send the Delete request and refresh the data.
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/expenses/${expense._id}`,
        {
          method: "DELETE",
        }
      );
      await fetchData();
    }
    event.target.value = ""; // Change the selected option back to the empty one
  };

  return (
    <tr className={color}>
      {/* Color is either white or gray depending on where the expense is located */}
      <td className="p-2 align-top">{formatDate(expense.date)}</td>
      <td className="p-2 align-top hidden md:table-cell">
        {expense.description}
      </td>
      <td className="p-2 align-top">{expense.type}</td>
      <td className="p-2 align-top">{formatAmount(expense.amount)}</td>
      <td className="p-2 align-top">
        {/* <Menu /> */}
        <select
          className={`p-1 border rounded bg-white border-black appearance-none md:appearance-auto w-fit`}
          onChange={(e) => handleAction(e)}
          defaultValue=""
        >
          <option
            value=""
            defaultValue={true}
            disabled
            hidden
            className="bg-white"
          ></option>
          <option
            value="edit"
            className="bg-white text-yellow-400 highlight:bg-yellow p-7"
          >
            Edit
          </option>
          <option value="delete" className="bg-white text-red-400 p-2">
            Delete
          </option>
        </select>
      </td>
    </tr>
  );
};

export default ExpenseItem;
