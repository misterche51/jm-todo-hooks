import { formatDistanceToNow } from "date-fns";

const formattedDate = (date) =>
  formatDistanceToNow(new Date(date), { includeSeconds: true });

const SECS_PER_DAY = 86400;
const SECS_PER_HOUR = 3600;
const SECS_PER_MINUTE = 60;
const MILISECONDS_PER_SECOND = 1000;

const duration = (time) => {
  const sec = Math.floor(time / MILISECONDS_PER_SECOND);

  const funcTo00 = (num) => {
    if (String(num).length === 1) {
      return `0${String(num)}`;
    }
    return String(num).slice(0, 2);
  };

  const days = Math.floor(sec / SECS_PER_DAY);
  const hours = Math.floor((sec % SECS_PER_DAY) / SECS_PER_HOUR);
  const mins = Math.floor(
    ((sec % SECS_PER_DAY) % SECS_PER_HOUR) / SECS_PER_MINUTE
  );
  const secs = ((sec % SECS_PER_DAY) % SECS_PER_HOUR) % SECS_PER_MINUTE;
  const days00 = funcTo00(days);
  const hours00 = funcTo00(hours);
  const mins00 = funcTo00(mins);
  const secs00 = funcTo00(secs);
  return `${days00}days ${hours00}:${mins00}:${secs00}`;
};

export { formattedDate, duration };
