import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("L");
};

export const formatAmount = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
