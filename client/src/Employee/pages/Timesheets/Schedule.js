import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import "./Schedule.css";
import Header from "../../components/Navbar/Navbar";

const getWeekRange = (startDate) => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return `${startDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })} : ${endDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}`;
};

const getWeeksOfMonth = (year, month) => {
  const weeks = [];
  let date = new Date(year, month, 1);

  // Adjust the date to the first Monday of the month
  const firstDay = date.getDay();
  if (firstDay !== 1) {
    const diff = firstDay === 0 ? 1 : 8 - firstDay;
    date.setDate(date.getDate() + diff);
  }

  while (
    date.getMonth() === month ||
    (date.getMonth() === (month + 1) % 12 && date.getDate() <= 6)
  ) {
    const startOfWeek = new Date(date);
    weeks.push(getWeekRange(startOfWeek));
    date.setDate(date.getDate() + 7);
  }

  return weeks;
};

const getCurrentMonthYear = () => {
  const date = new Date();
  return `${date.toLocaleString("en-GB", {
    month: "short",
  })} - ${date.getFullYear()}`;
};

const getMonthsOfYear = (year) => {
  const months = [];
  for (let month = 0; month < 12; month++) {
    const date = new Date(year, month);
    months.push(
      `${date.toLocaleString("en-GB", { month: "short" })} - ${year}`
    );
  }
  return months;
};

const Schedule = ({ totalHours }) => {
  console.log(totalHours);

  const currentYear = new Date().getFullYear();
  const currentMonthYear = getCurrentMonthYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonthYear);
  const [weekRanges, setWeekRanges] = useState([]);
  const [monthOptions, setMonthOptions] = useState(
    getMonthsOfYear(currentYear)
  );
  const [yearOptions] = useState([
    currentYear,
    currentYear + 1,
  ]);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [ setTasks] = useState({});

  useEffect(() => {
    const [monthStr, yearStr] = selectedMonth.split(" - ");
    const monthIndex = new Date(`${monthStr} 1, ${yearStr}`).getMonth();
    const year = parseInt(yearStr, 10);

    setWeekRanges(getWeeksOfMonth(year, monthIndex));
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setMonthOptions(getMonthsOfYear(newYear));
    setSelectedMonth(
      `${new Date().toLocaleString("en-GB", { month: "short" })} - ${newYear}`
    );
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };


  const copyTasksFromPreviousWeek = () => {
    if (!selectedWeek) {
      console.log("No week selected.");
      return;
    }

    // Find the index of the selected week
    const selectedWeekIndex = weekRanges.indexOf(selectedWeek);
    console.log("Selected week index:", selectedWeekIndex);

    if (selectedWeekIndex === -1 || selectedWeekIndex === 0) {
      alert("No previous data for week to copy.");
      return;
    }

    // Get the previous week
    const previousWeek = weekRanges[selectedWeekIndex - 1];
    console.log("Previous week:", previousWeek);

    // Copy tasks from previous week to the selected week
    setTasks((prevTasks) => {
      console.log("Previous tasks:", prevTasks);
      return {
        ...prevTasks,
        [selectedWeek]: prevTasks[previousWeek] || [],
      };
    });
  };

  return (
    <>
      <Header siteName={"Timesheets"} showLinks={["timesheets"]} />
      <div className="schedule-container" style={{ color: "black" }}>
        <div className="dropdowns" style={{ color: "black" }}>
          <FormControl variant="outlined" fullWidth margin="dense">
            <InputLabel style={{ color: "black" }} id="year-label">
              Select Year
            </InputLabel>
            <Select
              labelId="year-label"
              onChange={handleYearChange}
              label="Select Year"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid black",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid black",
                },
              }}
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth margin="dense">
            <InputLabel style={{ color: "black" }} id="month-label">
              Select Month
            </InputLabel>
            <Select
              labelId="month-label"
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Select Month"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid black",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid black",
                },
              }}
            >
              {monthOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="dense">
            <InputLabel style={{ color: "black" }} id="week-label">
              Select Week
            </InputLabel>
            <Select
              labelId="week-label"
              onChange={handleWeekChange}
              label="Select Week"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid black",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid black",
                },
              }}
            >
              {weekRanges.map((range, index) => (
                <MenuItem key={index} value={range}>
                  {range}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="TotalReported">
          <div className="Schedule-submit">
            <button
              onClick={copyTasksFromPreviousWeek}
              variant="contained"
              style={{ width: "100%" }}
            >
              Copy Tasks from Previous Week
            </button>
          </div>
          <div className="indicators">
            <p>Total Reported Hrs: {totalHours.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;



