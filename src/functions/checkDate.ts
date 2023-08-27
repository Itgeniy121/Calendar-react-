import { checkDateIsEqual } from "./checkEqual";


export const checkIsToday = (date: Date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};