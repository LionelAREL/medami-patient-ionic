export const formatDateTime = (date: Date): string => {
  const pad = (n: number, width = 2) => String(n).padStart(width, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  const ms = String(date.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${ms}`;
};
