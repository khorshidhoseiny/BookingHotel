export default function toLocalDateShort(date) {
  return new Date(date).toLocaleDateString("fa-IR", {});
}
export  function getPersianYear(date) {
  const faDate = new Date(date).toLocaleDateString("fa-IR");
  return faDate.split("/")[0]; // فقط سال شمسی رو برمی‌گردونه
}