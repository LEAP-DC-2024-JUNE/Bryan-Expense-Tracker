import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full">
      <h1 className="mt-16 text-6xl text-center font-bold">404 | Not Found</h1>
      <Link href={"/"} className="text-center text-2xl mx-6 hover:underline">
        Home page
      </Link>
    </div>
  );
};

export default NotFound;
