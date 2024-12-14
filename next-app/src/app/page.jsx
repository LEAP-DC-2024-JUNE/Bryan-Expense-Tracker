import dotenv from "dotenv";
dotenv.config();

const Home = async () => {
  const page = 1;
  const limit = 5;

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/expenses`);
  const expenses = await response.json();
  return <div>{expenses[0].description}</div>;
};

export default Home;
