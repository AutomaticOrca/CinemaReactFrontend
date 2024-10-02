// Formats a date string into "DD MMM YYYY" format (e.g., "23 Sep 2024")
// Takes a string and returns a formatted string
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options).toUpperCase();
};

// Converts total minutes into hours and minutes (e.g., "2 hrs 30 mins")
// Takes a number (total minutes) and returns a string
const convertMinutesToHours = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours} hrs`;
  } else {
    return `${hours} hrs ${minutes} mins`;
  }
};

// Calculates the end time based on start time and runtime
// Takes a start time (in float) and runtime (in minutes), returns a string (end time in HH:MM format)
function calculateEndTime(startTime: number, runtime: number): string {
  const startHour = Math.floor(startTime);
  const startMinute = (startTime - startHour) * 60;

  const startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(startMinute);
  startDate.setSeconds(0);

  const endDate = new Date(startDate.getTime() + runtime * 60000); // Add runtime to start time

  const endHour = endDate.getHours();
  let endMinute: number | string = endDate.getMinutes();

  // Add leading zero to minutes if less than 10
  if (endMinute < 10) {
    endMinute = "0" + endMinute;
  }

  return `${endHour}:${endMinute}`;
}

export { formatDate, convertMinutesToHours, calculateEndTime };
