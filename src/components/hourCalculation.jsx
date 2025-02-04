export const hourCalculation = (daysArray, index, parsedInput) => {
  if (!Array.isArray(daysArray)) {
    console.error("Hiba: nem tömb!", daysArray);
    return [];
  }
  const newHours = [...daysArray];
  newHours[index] += parsedInput;
  return newHours;
};
