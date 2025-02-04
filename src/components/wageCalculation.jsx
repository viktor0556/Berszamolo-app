export const wageCalculation = (allHours, parsedInput) => {
  const newTotalHours = allHours + parsedInput;
  return { newTotalHours };
};
