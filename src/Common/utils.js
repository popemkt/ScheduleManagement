export function truncate(text, limit) {
  return text.length < limit ? text : text.substring(0, limit) + '...';
}

export function getDatetime(dateString) {
  if (!dateString) return 'Unset';
  let d = new Date(dateString);
  return d.toUTCString().replace(' GMT', '');
}

export function hourSlotToString(hourSlot) {
  return `${hourSlot}h - ${hourSlot + 1}h`;
}

export function getNextWeekDates() {}

export function dateToWeekday(date) {
  console.log(date);
  let dayNum = new Date(date).getDay();
  let day = null;
  switch (dayNum) {
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
      break;
    case 0:
      day = 'Sunday';
      break;
    default:
      console.log("date: " + JSON.stringify(date) + dayNum);
      day = 'Date incorrect';
      break;
  }
  return day;
}

export function getCurrentWeekDates() {
  let currentDate = new Date();
  let currentWeekday = currentDate.getDay();
  return [
    addDays(currentDate, 1 - currentWeekday),
    addDays(currentDate, 2 - currentWeekday),
    addDays(currentDate, 3 - currentWeekday),
    addDays(currentDate, 4 - currentWeekday),
    addDays(currentDate, 5 - currentWeekday),
    addDays(currentDate, 6 - currentWeekday),
    addDays(currentDate, 7 - currentWeekday),
  ].map((item) => toISODateString(item));
}

export function addDays(date, days) {
  let copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

export function toISODateString(date) {
  return `${date.getFullYear()}-${
    (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
  }-${(date.getDate() < 10 ? '0' : '') + date.getDate()}`;
}
