import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-center md:justify-start bg-gray-200 h-14 p-8 ">
      <Link href="/" className="text-2xl font-semibold">
        Expense Tracker System
      </Link>
    </div>
  );
};

export default Header;
