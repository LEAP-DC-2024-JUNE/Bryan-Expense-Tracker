const { default: AddExpenseWindow } = require("@/components/AddExpenseWindow");

const AddExpenseModal = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed z-10 top-0 left-0">
      <AddExpenseWindow />
    </div>
  );
};

export default AddExpenseModal;
