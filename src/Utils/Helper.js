export const getLatestMonthData = (arr) => {
  const filteredData = arr.filter((el) => el.status.toLowerCase() === "paid");
  filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  return filteredData.length > 0 ? filteredData[0].items.reduce((tSum, t) => tSum + t.quantity * t.rate, 0) : 0;
};

export const getTotalAmountHistory = (invoices) => {
  return invoices.reduce((sum, inv) => sum + inv.items.reduce((tSum, t) => tSum + t.quantity * t.rate, 0), 0);
};

export const getTotalAmount = (arr) => {
  return arr.reduce((tSum, t) => tSum + t.quantity * t.rate, 0);
};

export const getDueAmount = (arr = []) => {
  const filteredData = arr.filter((el) => el.status.toLowerCase() !== "paid");
  return filteredData.length > 0 ? getTotalAmountHistory(filteredData) : 0;
};

export const formatDate = (inputdate) => {
  const date = new Date(inputdate); // Note: Month is 0-based, so 8 is September
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const initState = {
  currency: "$",
  type: "Invoice",
  date: null,
  number: "",
  billTo: "",
  billFrom: "",
  items: [{ description: "", quantity: 1, rate: 45 }],
  bank: `Account Holder Name : Mukund Mohan
Account Number : 25651610002401
Branch IFSC Code: HDFC0002565
Swift Code : HDFCINBBBNG`,
  memo: "Thank you for your business!",
  status: "Due",
};
