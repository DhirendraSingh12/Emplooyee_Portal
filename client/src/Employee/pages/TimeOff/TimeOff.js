import React, { useState, useMemo, useCallback } from "react";
import {
  format,
  startOfYear,
  addMonths,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  startOfMonth,
  getDay,
  isFuture,
  isBefore,
  isWithinInterval,
} from "date-fns";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Header from "../../../Employee/components/Navbar/Navbar";
import Popup from "./Popup";
import "./TimeOff.css";
import IconMapper from "../../../components/IconMapper/IconMapper";

const profileImage = "/assets/images/profile.jpg";

// Generate days of a given month
const generateMonthDays = (monthStart) => {
  const monthEnd = endOfMonth(monthStart);
  return eachDayOfInterval({ start: monthStart, end: monthEnd });
};

// Days of the week starting with Monday
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// TimeOff Component
const TimeOff = () => {
  const [selectedYear, setSelectedYear] = useState(() =>
    new Date().getFullYear()
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Example leave periods
  const leavePeriods = useMemo(
    () => [
      { start: new Date(2024, 8, 20), end: new Date(2024, 8, 25) }, // Example: 20-Aug-2024 to 25-Aug-2024
      // Add more leave periods here
    ],
    []
  );

  // Derived values
  const startOfYearDate = useMemo(
    () => startOfYear(new Date(selectedYear, 0, 1)),
    [selectedYear]
  );
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) =>
        addMonths(startOfYearDate, index)
      ),
    [startOfYearDate]
  );
  const today = useMemo(() => new Date(), []);

  // Handle year change
  const handleYearChange = useCallback((event) => {
    setSelectedYear(Number(event.target.value));
  }, []);

  // Toggle popup visibility
  const togglePopup = useCallback(() => {
    console.log("Popup toggled"); // Debugging log
    setIsPopupOpen((prev) => !prev);
  }, []);

  // Check if a day is within a leave period
  const isOnLeave = (day) => {
    return leavePeriods.some((period) =>
      isWithinInterval(day, { start: period.start, end: period.end })
    );
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log("Form Submitted", data);
    setIsPopupOpen(false);
  };

  return (
    <>
      <Header
        siteName={"Book Off-Time"}
        userName={"Jaideep"}
        profileImage={profileImage}
        showLinks={["timeoff"]}
      />
      <div className="timeoff-container">
        <div className="timeoff-calendar-container">
          <div className="timeoff-year-selector">
            <FormControl variant="outlined" className="select-year">
              <InputLabel id="year-label">Select Year</InputLabel>
              <Select
                labelId="year-label"
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
                label="Select Year"
              >
                {Array.from(
                  { length: 18 },
                  (_, index) => new Date().getFullYear() - 1 + index
                ).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="maindiv">
            <div className="timeoff-month-grid">
              {months.map((monthStart, index) => {
                const monthName = format(monthStart, "MMMM");
                const monthDays = generateMonthDays(monthStart);
                const firstDayOfMonth = getDay(startOfMonth(monthStart));

                const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

                return (
                  <div key={index} className="timeoff-month-container">
                    <h2>{monthName}</h2>
                    <div className="timeoff-days-grid">
                      {daysOfWeek.map((day, dayIndex) => (
                        <div key={dayIndex} className={`timeoff-day-name
                        ${day === "Sat" ? "Sat" : ""}
                        ${day === "Sun" ? "Sun" : ""}
                      `}>
                          {day}
                        </div>
                      ))}

                      {Array.from({ length: offset }).map((_, emptyIndex) => (
                        <div
                          key={emptyIndex}
                          className="timeoff-day empty"
                        ></div>
                      ))}

                      {monthDays.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`timeoff-day
                          ${isToday(day) ? "today" : ""}
                          ${isFuture(day) ? "future" : ""}
                          ${getDay(day) === 0 ? "sunday" : "sundays"}
                          ${getDay(day) === 6 ? "saturday" : ""}
                          ${isBefore(day, today) && !isToday(day) ? "past" : ""}
                          ${isOnLeave(day) ? "leave" : ""}
                        `}
                          onClick={togglePopup} // Added click event here
                        >
                          <span className="timeoff-day-number">
                            {format(day, "d")}
                          </span>
                          {isOnLeave(day) && (
                            <span className="timeoff-umbrella-icon">🏖️</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="timeoffbutton">
              <div className="Bookleavebutton" onClick={togglePopup}>
                <IconMapper iconName={"AddIcon"} className="timeoffAddbutton" />
                <h2 onClick={togglePopup}> Book Time off</h2>
              </div>
              <div className="Bookleavebutton">
                <IconMapper iconName={"AddIcon"} className="timeoffAddbutton" />
                <h2 onClick={togglePopup}> Leave Taken</h2>
              </div>
            </div>
          </div>
        </div>
      </div >
      <Popup
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit} />
    </>
  );
};

export default TimeOff;


