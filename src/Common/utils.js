export function truncate(text, limit) {
  return text.length < limit ? text : text.substring(0, limit) + '...';
}

export function getDatetime(dateString) {
  if (!dateString) return 'Unset';
  let d = new Date(dateString);
  return d.toUTCString().replace(' GMT', '');
}

export function hourSlotToString(hourSlot) {
  return `${hourSlot}h - ${hourSlot+1}h`;
}

export function getNextWeekDates() {};

export function dateToWeekday(date) {
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
      day = 'Date incorrect';
      break;
  }
  return day;
}
