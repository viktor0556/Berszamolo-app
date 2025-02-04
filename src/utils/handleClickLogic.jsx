import { hourCalculation } from "../components/hourCalculation";
import { wageCalculation } from "../components/wageCalculation";
import { userInput } from "../components/userInput";

export const handleClick = (
  index,
  newDaysMonthly,
  setNewDaysMonthly,
  allHours,
  setAllHours,
  savedHourlyWage,
  setMoney,
  monthIndex
) => {
  const parsedInput = userInput(index);

  if (!isNaN(parsedInput)) {
    const updatedHours = hourCalculation(newDaysMonthly[monthIndex], index, parsedInput);
    setNewDaysMonthly((prev) => ({
      ...prev,
      [monthIndex]: updatedHours,
    }));

    const { newTotalHours, totalMoney } = wageCalculation(
      allHours,
      parsedInput,
      savedHourlyWage
    );
    setAllHours(newTotalHours);
    setMoney(totalMoney);
  } else {
    alert("Érvényes számot adj meg!");
  }
};