const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(today = getToday()) {
  const christmasDay = getNextChristmasDay(today);
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

function getToday() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today;
}

function getNextChristmasDay(date = getToday()) {
  const christmasDay = new Date(date.getFullYear(), 12 - 1, 25);
  if (date.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(date.getFullYear() + 1);
  }
  return christmasDay;
}