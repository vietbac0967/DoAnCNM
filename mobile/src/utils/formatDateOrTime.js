const formatDate = (date) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  const formattedTime = new Date(date).toLocaleTimeString("vi-VN", options);
  return formattedTime;
};
const formatDateOrTime = (updatedAt) => {
  const today = new Date();
  const updatedAtDate = new Date(updatedAt);

  if (updatedAtDate.toDateString() === today.toDateString()) {
    // Display time if updatedAt is today
    return formatDate(updatedAt);
  } else {
    // Display full date if updatedAt is not today
    return updatedAtDate.toLocaleDateString("en-US");
  }
};
export default formatDateOrTime;
