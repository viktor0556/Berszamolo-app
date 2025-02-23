import "./App.css";
import React, { useEffect, useState } from "react";
import {
  monthNames,
  daysOfWeek,
  monthDate,
  getDaysInMonth,
  daysInMonth,
  handlePrevMonth,
  handleNextMonth,
  newDate,
} from "./components/MonthDates";
import { handleClick } from "./utils/handleClickLogic";

function App() {
  const [monthDateValue, setMonthDateValue] = useState(0); // use it to change months
  const [money, setMoney] = useState(0);
  const [allHours, setAllHours] = useState(0);
  const [monthIndex, setMonthIndex] = useState(newDate); // Current index of month (0=jan, 1=feb stb.)
  const [inputValue, setInputValue] = useState(""); // Hourly rate entered by the user
  const [savedHourlyWage, setSavedHourlyWage] = useState("");
  const [newDaysMonthly, setNewDaysMonthly] = useState(() => {
    const initialData = {};
    for (let i = 0; i < 12; i++) {
      const days = getDaysInMonth(new Date().getFullYear(), i);
      initialData[i] = new Array(days).fill(0);
    }
    return initialData;
  });

  const handleOnClick = () => {
    setInputValue(""); // When the user clicks the "Mentés" button, it resets the input field.
  };

  useEffect(() => {
    setNewDaysMonthly((prev) => {
      const days = getDaysInMonth(new Date().getFullYear(), monthIndex);
  
      if (prev[monthIndex] && prev[monthIndex].length === days) {
        return prev;
      }
  
      return {
        ...prev,
        [monthIndex]: new Array(days).fill(0),
      };
    });
  }, [monthIndex]);
  
  useEffect(() => {
    const totalHours = Object.values(newDaysMonthly[monthIndex] || []).reduce(
      (sum, hours) => sum + hours,
      0
    );
  
    setAllHours(totalHours);
    setMoney(totalHours * savedHourlyWage);
  }, [monthIndex, savedHourlyWage]); 

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Bérszámoló</h1>
      <div className="flex justify-between items-center w-full max-w-sm mb-4">
        <button
          onClick={() => handlePrevMonth(setMonthIndex, setMonthDateValue)}
          className="text-lg bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          &#8592;
        </button>
        <h2 className="text-xl font-medium">{monthNames[(monthIndex + 8) % 12]}</h2>
        <button
          onClick={() => handleNextMonth(setMonthIndex, setMonthDateValue)}
          className="text-lg bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          &#8594;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}

        {Array.from({
          length: getDaysInMonth(new Date().getFullYear(), monthIndex),
        }).map((_, index) => (
          <div
            key={index}
            onClick={() => {
              handleClick(
                index,
                newDaysMonthly,
                setNewDaysMonthly,
                allHours,
                setAllHours,
                savedHourlyWage,
                setMoney,
                monthIndex
              );
            }}
            className="border rounded p-2 text-center hover:bg-gray-100 cursor-pointer"
          >
            {index + 1}
            <hr />
            <span>Óra: {newDaysMonthly[monthIndex]?.[index] ?? 0}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg">Eddigi pénz: {money} ft</p>
        <div className="p-4">
          <input
            type="number"
            value={inputValue}
            className="border p-2 rounded"
            onChange={(e) => setInputValue(Number(e.target.value))}
            placeholder="Órabér megadása..."
          ></input>
          <button
            onClick={() => {
              setSavedHourlyWage(inputValue);
              handleOnClick();
            }}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Mentés
          </button>
          <p className="text-lg">Órabér: {savedHourlyWage}</p>
        </div>
        <p className="text-lg">Összes ledolgozott óra: {allHours}</p>
      </div>
    </div>
  );
}

export default App;
