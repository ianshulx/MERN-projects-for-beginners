import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { DateRangeEnum, DateRangePreset } from "../enums/date-range.enum";

export const getDateRange = (
  preset?: DateRangePreset,
  customFrom?: Date,
  customTo?: Date
) => {
  if (customFrom && customTo) {
    return {
      from: customFrom,
      to: customTo,
      value: DateRangeEnum.CUSTOM,
    };
  }

  const now = new Date();

  // const yesterday = subDays(now.setHours(0, 0, 0, 0), 1);
  const today = endOfDay(now);
  const last30Days = {
    from: subDays(today, 29),
    to: today,
    value: DateRangeEnum.LAST_30_DAYS,
    label: "Last 30 Days",
  };
  console.log(last30Days, "last30");

  switch (preset) {
    case DateRangeEnum.ALL_TIME:
      return {
        from: null,
        to: null,
        value: DateRangeEnum.ALL_TIME,
        label: "All Time",
      };
    case DateRangeEnum.LAST_30_DAYS:
      return last30Days;
    case DateRangeEnum.LAST_MONTH:
      return {
        from: startOfMonth(subMonths(now, 1)),
        to: endOfMonth(subMonths(now, 1)),
        value: DateRangeEnum.LAST_MONTH,
        label: "Last Month",
      };
    case DateRangeEnum.LAST_3_MONTHS:
      return {
        from: startOfMonth(subMonths(now, 3)),
        to: endOfMonth(subMonths(now, 1)),
        value: DateRangeEnum.LAST_3_MONTHS,
        label: "Last 3 Months",
      };
    case DateRangeEnum.LAST_YEAR:
      return {
        from: startOfYear(subYears(now, 1)),
        to: endOfYear(subYears(now, 1)),
        value: DateRangeEnum.LAST_YEAR,
        label: "Last Year",
      };
    case DateRangeEnum.THIS_MONTH:
      return {
        from: startOfMonth(now),
        to: endOfDay(now),
        value: DateRangeEnum.THIS_MONTH,
        label: "This Month",
      };
    case DateRangeEnum.THIS_YEAR:
      return {
        from: startOfYear(now),
        to: endOfDay(now),
        value: DateRangeEnum.THIS_YEAR,
        label: "This Year",
      };
    default:
      return last30Days;
  }
};
