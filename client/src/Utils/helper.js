import { addDays, format, startOfWeek } from 'date-fns';
export     const generateWeeks = (year) => {
    let weeks = [];
    let currentDate = new Date(year, 0, 1);
    currentDate = startOfWeek(currentDate, { weekStartsOn: 1 }); 

    while (currentDate.getFullYear() === year || (currentDate.getFullYear() === year + 1 && currentDate.getMonth() === 0)) {
        let startOfWeekFormatted = format(currentDate, 'dd-MMM-yy');
        let endOfWeekFormatted = format(addDays(currentDate, 6), 'dd-MMM-yy');
        weeks.push(`${startOfWeekFormatted} : ${endOfWeekFormatted}`);
        currentDate = addDays(currentDate, 7);
    }
    return weeks;
};





export  const getWeekRange = (startDate) => {
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
  
 export const getWeeksOfMonth = (year, month) => {
    const weeks = [];
    let date = new Date(year, month, 1);
  
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
  
  export  const generateDates = (year, month, week) => {
    const dates = [];
    let date = new Date(year, month, 1);
  
    const firstDay = date.getDay();
    if (firstDay !== 1) {
      const diff = firstDay === 0 ? 1 : 8 - firstDay;
      date.setDate(date.getDate() + diff);
    }
    date.setDate(date.getDate() + (week - 1) * 7);
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date);
      const formattedDate = currentDate
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase();
      dates.push({
        inDate: formattedDate,
        inTimeHH: "",
        inTimeMM: "",
        inPeriod: "",
        outDate: formattedDate,
        outTimeHH: "",
        outTimeMM: "",
        outPeriod: "",
        hours: "",
        attendanceStatus: "",
        status: "",
        isToday: false,
      });
      date.setDate(date.getDate() + 1);
      if (
        formattedDate ===
        new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toUpperCase()
      ) {
        dates[i].isToday = true;
      }
    }
    return dates;
  };


export const convertTo24HourFormat = (hh, mm, period) => {
    let hours = parseInt(hh, 10);
    let minutes = parseInt(mm, 10);
  
    // Ensure hours are within the correct range (1-12)
    if (isNaN(hours) || hours < 1 || hours > 12) {
      throw new Error("Invalid hours input.");
    }
    
    // Ensure minutes are within the correct range (0-59)
    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
      throw new Error("Invalid minutes input.");
    }
  
    // Adjust hours based on AM/PM
    if (period === "PM" && hours < 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }
  
    return { hours, minutes };
  };
  

  export const calculateHours = (inTime, outTime) => {
    const inDate = new Date(0, 0, 0, inTime.hours, inTime.minutes, 0);
    const outDate = new Date(0, 0, 0, outTime.hours, outTime.minutes, 0);
    // const diff = (outDate - inDate) / 1000 / 60 / 60;
    let diff = (outDate - inDate) / 1000 / 60 / 60;
    // return diff > 0 ? diff : diff + 24;
    if (diff < 0) {
      diff += 24;          // Adjust for overnight shifts
    }
    return diff;
  };