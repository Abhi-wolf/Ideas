export default function formateDate(dateString) {
  // Given date string
  // const dateString = "2024-05-16T16:50:15.946Z";

  // Convert the ISO string to a Date object
  const dateObject = new Date(dateString);

  // Format the date and time separately
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short", // Optional: Include timezone abbreviation
  });

  // Combine date and time
  //   const formattedDateTime = `${formattedDate}, ${formattedTime}`;

  //   console.log(formattedDateTime);

  return formattedDate;
}
