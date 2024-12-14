import { faker } from "@faker-js/faker";

// console.log(
//   faker.date
//     .between({ from: "2000-01-01", to: Date.now() })
//     .toISOString()
//     .split("T")[0]
// );

// console.log(faker.lorem.sentences(2));

// console.log(faker.number.int({ min: 1, max: 4 }));

// console.log(faker.number.float({ max: 100 }));

import dotenv from "dotenv";
dotenv.config();

const types = ["Food", "Entertainment", "Transportation", "Accommodation"];

const randomExpense = () => {
  return {
    date: faker.date
      .between({ from: "2000-01-01", to: Date.now() })
      .toISOString()
      .split("T")[0],
    description: faker.lorem.sentences(1),
    type: types[faker.number.int({ min: 1, max: 4 }) - 1],
    amount: faker.number.float({ min: 10, max: 100 }),
  };
};
const addRandom = (num = 1) => {
  for (let i = 0; i < num; i++) {
    const random = randomExpense();
    fetch(`http://localhost:8001/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(random),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
};
const fetchDataByYear = async (year) => {
  try {
    const res = await fetch(`http://localhost:8000/api/expenses/year/${year}`);
    if (!res.ok) throw new Error("Failed to fetch by year.");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

addRandom(5);
