export const daysOfWeek = ["H", "K", "SZ", "CS", "P", "SZ", "V"];

export const monthNames = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Agusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];

export const newDate = new Date().getMonth();

export const monthDate = () => {
  const cMonth = newDate;
  return cMonth; // returns the index of the current month from zero to 11
};

export const getDaysInMonth = (year = new Date().getFullYear(), month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const daysInMonth = (monthDate = newDate, monthDateValue = 0) => {
  return Array.from(
    { length: getDaysInMonth(monthDate, monthDateValue = 0) },
    (_, i) => i + 1
  );
  /* Array.from creates an array of 
  a given length and adds index + 1
  to each element (to start at 1). */
};

export const handlePrevMonth = (setMonthIndex, setMonthDateValue) => {
  setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  setMonthDateValue((prev) => (prev === 0 ? 11 : prev - 1));
};

export const handleNextMonth = (setMonthIndex, setMonthDateValue) => {
  setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  setMonthDateValue((prev) => (prev === 11 ? 0 : prev + 1));
};