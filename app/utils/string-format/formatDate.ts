/* eslint-disable */
export function formatDate(dateString: any) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
