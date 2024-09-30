import React, {useMemo, useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import "./Timesheets.css";
import {
  generateDates,
  getWeeksOfMonth,
  convertTo24HourFormat,
  calculateHours,
} from "../../../Utils/helper";
import { submitTimesheets } from "../../EmpApiServices";

const Timesheets = ({ updateTotalHours }) => {
  const now = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [week, setWeek] = useState(1);
  const [rows, setRows] = useState(() => generateDates(year, month, week));
  const [weekRanges, setWeekRanges] = useState(() =>
    getWeeksOfMonth(year, month)
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const weeks = getWeeksOfMonth(year, month);
    setWeekRanges(weeks);
    const currentWeek =
      weeks.findIndex((range) => {
        const [start, end] = range.split(" : ");
        const currentDate = now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return currentDate >= start && currentDate <= end;
      }) + 1;
    setWeek(currentWeek || 1);
    setRows(generateDates(year, month, currentWeek || 1));
  }, [year, month, now]);
  

  useEffect(() => {
    if (submitted) {
      const totalHours = rows.reduce(
        (sum, row) => sum + parseFloat(row.hours || 0),
        0
      );
      updateTotalHours(totalHours);
    }
  }, [rows, submitted, updateTotalHours]);

  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value, 10);
    setMonth(selectedMonth);
    setRows(generateDates(year, selectedMonth, week));
  };

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value, 10);
    setYear(selectedYear);
    setRows(generateDates(selectedYear, month, week));
  };

  const handleWeekChange = (e) => {
    const selectedWeek = parseInt(e.target.value, 10);
    setWeek(selectedWeek);
    setRows(generateDates(year, month, selectedWeek));
  };

  const incrementDateByOneDay = (dateStr) => {
    const date = new Date(dateStr.split("-").reverse().join("-"));
    date.setDate(date.getDate() + 1);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    if (field === "inTimeHH" || field === "inTimeMM" || field === "inPeriod") {
      const row = newRows[index];
      if (row.inTimeHH && row.inTimeMM && row.inPeriod) {
        const inTime = convertTo24HourFormat(
          row.inTimeHH,
          row.inTimeMM,
          row.inPeriod
        );
        if (inTime.hours >= 15 && inTime.hours < 24) {
          row.outDate = incrementDateByOneDay(row.inDate);
        }
      }
    }
    setRows(newRows);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const employeeName = "Dhirendra Singh"; // Use the correct employee name
    const employeeId = "HFX0005"; // Use the correct employee ID
    const timesheetId = ""; // If you have a specific timesheetId, set it here or leave it blank
  
    const newRows = rows.map((row) => {
      const {
        inTimeHH,
        inTimeMM,
        inPeriod,
        outTimeHH,
        outTimeMM,
        outPeriod,
        inDate,
        // outDate,
      } = row;
  
      const date = new Date(inDate.split(" ")[0] + " " + inDate.split(" ")[1] + " " + inDate.split(" ")[2]);
      const dayOfWeek = date.getDay();
  
      if (
        (dayOfWeek === 0 || dayOfWeek === 6) &&
        (!inTimeHH || !inTimeMM || !outTimeHH || !outTimeMM)
      ) {
        return { ...row, attendanceStatus: "Weekend", status: "", hours: "" };
      } else if (date <= today) {
        if (
          inTimeHH &&
          inTimeMM &&
          inPeriod &&
          outTimeHH &&
          outTimeMM &&
          outPeriod
        ) {
          const inTime = convertTo24HourFormat(inTimeHH, inTimeMM, inPeriod);
          const outTime = convertTo24HourFormat(outTimeHH, outTimeMM, outPeriod);
          const hours = calculateHours(inTime, outTime);
          return {
            ...row,
            hours: hours.toFixed(2),
            attendanceStatus: "Regularized",
            status: "PENDING",
          };
        } else {
          return { ...row, attendanceStatus: "", status: "", hours: "" };
        }
      } else {
        return { ...row, attendanceStatus: "", status: "", hours: "" };
      }
    });
  
    setRows(newRows);
  
    const filteredRows = newRows.filter((row) =>
      row.inTimeHH && row.inTimeMM && row.inPeriod &&
      row.outTimeHH && row.outTimeMM && row.outPeriod &&
      row.hours && row.attendanceStatus
    );
  
    // Prepare the payload to send to the API
    const payload = filteredRows.map(({ inDate, inTimeHH, inTimeMM, inPeriod, outDate, outTimeHH, outTimeMM, outPeriod, hours, attendanceStatus, status }) => ({
      timesheetId, // Use timesheetId here
      employeeId,
      employeeName,
      inDate,
      inTimeHH: parseInt(inTimeHH), // Ensure HH is an integer
      inTimeMM: parseInt(inTimeMM), // Ensure MM is an integer
      inPeriod,
      outDate,
      outTimeHH: parseInt(outTimeHH), // Ensure HH is an integer
      outTimeMM: parseInt(outTimeMM), // Ensure MM is an integer
      outPeriod,
      hours,
      attendanceStatus,
      status,
    }));
  
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        throw new Error("JWT token is missing");
      }
  
      console.log("Submitting timesheets:", JSON.stringify(payload, null, 2));
      const response = await submitTimesheets(payload, jwtToken);
      console.log("Timesheet submitted successfully:", response);
      alert("Timesheet submitted successfully.");
    } catch (error) {
      console.error("Error submitting timesheet:", error);
      alert("Failed to submit timesheet.");
    }
  };
  


  
  
  return (
    <div className="TimeSheet-table-container">
      <div className="timesheet-header">
        <h2>Timesheet</h2>
      </div>
      <div className="dropdowns">
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={handleYearChange} label="Year">
            {[2022, 2023, 2024, 2025].map((yr) => (
              <MenuItem key={yr} value={yr}>
                {yr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={handleMonthChange} label="Month">
            {Array.from({ length: 12 }).map((_, i) => (
              <MenuItem key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Week</InputLabel>
          <Select value={week} onChange={handleWeekChange} label="Week">
            {weekRanges.map((range, i) => (
              <MenuItem key={i} value={i + 1}>
                Week {i + 1} ({range})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="TimeSheet-tablebody">
        <table className="TimeSheet-table-data">
          <thead>
            <tr>
              <th className="timesheetth">In Date</th>
              <th className="timesheetth">In Time (HH)</th>
              <th className="timesheetth">In Time (MM)</th>
              <th className="timesheetth">AM/PM</th>
              <th className="timesheetth">Out Date</th>
              <th className="timesheetth">Out Time (HH)</th>
              <th className="timesheetth">Out Time (MM)</th>
              <th className="timesheetth">AM/PM</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Hours </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.inDate}</td>
                <td>
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="TimeSheet-custom-form-control"
                  >
                    <InputLabel>HH</InputLabel>
                    <Select
                      value={row.inTimeHH || ""}
                      onChange={(e) =>
                        handleInputChange(index, "inTimeHH", e.target.value)
                      }
                      label="HH"
                      size="small"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (hour) => (
                          <MenuItem
                            key={hour}
                            value={hour < 10 ? `0${hour}` : hour}
                          >
                            {hour < 10 ? `0${hour}` : hour}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </td>

                <td>
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="TimeSheet-custom-form-control"
                  >
                    <InputLabel>MM</InputLabel>
                    <Select
                      value={row.inTimeMM || ""}
                      onChange={(e) =>
                        handleInputChange(index, "inTimeMM", e.target.value)
                      }
                      label="MM"
                      size="small"
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <MenuItem
                          key={minute}
                          value={minute < 10 ? `0${minute}` : minute}
                        >
                          {minute < 10 ? `0${minute}` : minute}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </td>

                <td>
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="TimeSheet-custom-form-control"
                  >
                    <InputLabel>AM/PM</InputLabel>
                    <Select
                      sx={{ height: "40px", width: "170px" }}
                      value={row.inPeriod || ""}
                      onChange={(e) =>
                        handleInputChange(index, "inPeriod", e.target.value)
                      }
                      label="AM/PM"
                    >
                      <MenuItem value="AM">AM</MenuItem>
                      <MenuItem value="PM">PM</MenuItem>
                    </Select>
                  </FormControl>
                </td>

                <td>{row.outDate}</td>
                <td>
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="TimeSheet-custom-form-control"
                  >
                    <InputLabel>HH</InputLabel>
                    <Select
                      value={row.outTimeHH || ""}
                      onChange={(e) =>
                        handleInputChange(index, "outTimeHH", e.target.value)
                      }
                      label="HH"
                      size="small"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (hour) => (
                          <MenuItem key={hour} value={hour}>
                            {hour}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </td>

                <td>
                  <FormControl
                    variant="outlined"
                    size="small"
                    className="TimeSheet-custom-form-control"
                  >
                    <InputLabel>MM</InputLabel>
                    <Select
                      value={row.outTimeMM || ""}
                      onChange={(e) =>
                        handleInputChange(index, "outTimeMM", e.target.value)
                      }
                      label="MM"
                      size="small"
                    >
                     {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <MenuItem
                          key={minute}
                          value={minute < 10 ? `0${minute}` : minute}
                        >
                          {minute < 10 ? `0${minute}` : minute}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </td>

                <td>
                  <FormControl
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="TimeSheet-custom-form-control"
                  >
                    <InputLabel>AM/PM</InputLabel>
                    <Select
                      sx={{ height: "40px", width: "170px" }}
                      value={row.outPeriod || ""}
                      onChange={(e) =>
                        handleInputChange(index, "outPeriod", e.target.value)
                      }
                      label="AM/PM"
                    >
                      <MenuItem value="AM">AM</MenuItem>
                      <MenuItem value="PM">PM</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>{row.attendanceStatus || ""}</td>
                <td>{row.status || ""}</td>
                <td>{row.hours || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="timesheetsubmit">
          <div className="Timesheet-submit">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
    </div>
  );
};

export default Timesheets;
