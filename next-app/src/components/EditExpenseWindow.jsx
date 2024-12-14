"use client";

import { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

const EditExpenseWindow = ({
  isOpen,
  setIsOpen,
  id,
  setId,
  expense,
  fetchData,
}) => {
  const defaultData = {
    date: "",
    description: "",
    type: "",
    amount: 0,
  };
  const [data, setData] = useState(defaultData);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateForm = () => {
    let errors = {};
    if (!data.date) {
      errors.date = "Date is required.";
    }
    if (!data.description) {
      errors.description = "Description is required.";
    }
    if (!data.type) {
      errors.type = "Type is required.";
    }
    if (data.amount <= 0) {
      errors.amount = "Amount is invalid.";
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleValueChange = (value, name, values) => {
    setData({ ...data, amount: parseFloat(value) });
  };

  const closeEditWindow = () => {
    setId(-1);
    setData(defaultData);
    setShowError(false);
    setIsOpen(false);
  };

  const handleClickEdit = async () => {
    validateForm();
    if (!isFormValid) {
      setShowError(true);
      return;
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await fetchData(); // Call the fetchData function to refresh expenses
      closeEditWindow();
    }
  };

  useEffect(() => {
    if (expense) {
      setData(expense);
    }
  }, [expense]);

  useEffect(() => {
    validateForm();
  }, [data]);

  if (!isOpen || data.amount == 0) return null;
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed z-10 top-0 left-0">
      <div className="flex-shrink-0 flex flex-col gap-8 items-center min-w-[24rem] max-w-screen-sm bg-gray-200 py-7 px-5 rounded-lg">
        <h1 className="text-center text-3xl font-bold">Edit Expense</h1>
        <div className="w-full flex-shrink-0 flex flex-col gap-4 items-start">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="date" className="text-lg font-semibold">
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={data?.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              className="border-2 border-black px-4 py-1 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="description" className="text-lg font-semibold">
              Description:
            </label>
            <textarea
              maxLength={100}
              name="description"
              id="description"
              value={data?.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="border-2 border-black px-4 py-1 rounded-lg"
            ></textarea>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="type" className="text-lg font-semibold">
              Type:
            </label>
            <select
              name="type"
              id="type"
              value={data?.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
              className="border-2 border-black px-4 py-1 rounded-lg"
            >
              <option value="" defaultValue={true} hidden disabled></option>
              <option value="1">Food</option>
              <option value="2">Entertainment</option>
              <option value="3">Transportation</option>
              <option value="4">Accommodation</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="amount" className="text-lg font-semibold">
              Amount:
            </label>
            <CurrencyInput
              name="amount"
              id="amount"
              prefix="$"
              placeholder="Please enter a number"
              defaultValue={data?.amount}
              decimalScale={2}
              onValueChange={handleValueChange}
              className="border-2 border-black px-4 py-1 rounded-lg"
            />
          </div>
        </div>

        <div className="text-red-400 font-medium text-lg">
          {showError && "Missing information."}
        </div>

        <div className="w-full flex-shrink-0 flex gap-5 space-around">
          <button
            onClick={handleClickEdit}
            // className="w-36 px-4 py-2 border-2 border-green-400 bg-white hover:bg-green-400 mx-auto text-xl rounded-xl text-green-400 hover:text-white font-semibold transition-all duration-500"
            className="button button-green w-1/2  hover:!bg-green-400"
          >
            Edit
          </button>
          <button
            onClick={closeEditWindow}
            // className="w-36 px-4 py-2 border-2 border-red-400 bg-white hover:bg-red-400 mx-auto text-xl rounded-xl text-red-400 hover:text-white font-semibold transition-all duration-500"
            className="button button-red w-1/2 hover:!bg-red-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseWindow;
