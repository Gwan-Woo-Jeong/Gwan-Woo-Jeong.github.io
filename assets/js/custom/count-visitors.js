const NAMESPACE = "gwan-woo-jeong.github.io";
const COUNT_URL = `https://counterapi.com`;
const TOTAL = "total";

const now = new Date();
const yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

const nowDate = now.toISOString().split("T")[0];
const yesterdayDate = yesterday.toISOString().split("T")[0];

const todayCounter = document.querySelector(".day-visitors__today-count");
const yesterdayCounter = document.querySelector(
  ".day-visitors__yesterday-count"
);
const totalCounter = document.querySelector(".total-visitors__count");

const countVisit = async (element, key, isReadOnly, startNumber) => {
  const response = await fetch(
    `${COUNT_URL}/api/${NAMESPACE}/${key}${isReadOnly ? "?readOnly=true" : ""}${
      startNumber ? `?startNumber=${startNumber}` : ""
    }`
  );

  const data = await response.json();

  element.innerText = data.value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  element.parentElement.href = `${COUNT_URL}/stats/${NAMESPACE}/view/${key}`;
};

Promise.all([
  countVisit(todayCounter, nowDate),
  countVisit(totalCounter, TOTAL, false, 100),
  countVisit(yesterdayCounter, yesterdayDate, true),
]).catch((err) => console.log(err));
