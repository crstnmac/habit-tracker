import { eachDayOfInterval, eachWeekOfInterval, endOfWeek, isAfter, isBefore } from "date-fns";

export const getDatesOfMonthByWeeks = (year, month) => {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const weeksInMonth = eachWeekOfInterval(
    {
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    },
    {
      weekStartsOn: 0,
    }
  );

  const datesOfMonthByWeeks = weeksInMonth.map((week) => {
    const startOfWeek = isBefore(week, firstDayOfMonth) ? firstDayOfMonth : week;
    const endOfWeekD = isAfter(endOfWeek(week), lastDayOfMonth)
      ? lastDayOfMonth
      : endOfWeek(week);

    const daysOfWeek = eachDayOfInterval({
      start: startOfWeek,
      end: endOfWeekD,
    });

    return daysOfWeek;
  });

  const mergedArray = mergeArrays(datesOfMonthByWeeks);

  const result = [];
  for (let i = 0; i < mergedArray.length; i += 7) {
    const subArray = mergedArray.slice(i, i + 7);
    result.push(subArray);
  }

  return result;
};

const mergeArrays = (arrays) => {
  return arrays.reduce((merged, array) => merged.concat(array), []);
};
//get the month name
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]