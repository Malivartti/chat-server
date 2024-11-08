function formatDateNumber(number) {
  if (number < 10) {
    return '0' + number
  }
  return number
}

function formatDate(date) {
  return `${formatDateNumber(date.getDate())}.${formatDateNumber(date.getMonth() + 1)}.${date.getFullYear()} ${formatDateNumber(date.getHours())}:${formatDateNumber(date.getMinutes())}`
}

module.exports = {
  formatDate,
  formatDateNumber
}
