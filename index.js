const isAbleToShare = Boolean(navigator.share);
const queryString = new URLSearchParams(location.search);
const initialDate = queryString.get("date");

const input = document.getElementById("date-input");
const submit = document.getElementById("submit");
const warning = document.getElementById("submit");
const resultArea = document.getElementById("result");
const shareBtn = document.getElementById("share");

const ONE_DAY = 1000 * 60 * 60 * 24;
const THREE_DAYS = ONE_DAY * 3;
const SEVEN_DAYS = ONE_DAY * 7;
const FORTY_DAYS = ONE_DAY * 40;
const HUNDRED_DAYS = ONE_DAY * 100;
const THOUSAND_DAYS = ONE_DAY * 1000;

if (initialDate) {
  input.value = initialDate;
  submit.disabled = false;
  processDate();
}

function formatDate(timestamp) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("id-ID", options);
  return formatter.format(timestamp);
}

input.addEventListener("change", (e) => {
  const value = e.target.valueAsNumber;
  submit.disabled = !Boolean(value);
});

share.addEventListener("click", () => {
  const value = input.valueAsNumber;
  const displayedDate = formatDate(value);
  navigator.share({
    title: "Tungtang - Hitung Tanggal",
    text: "Cek perhitungan dari tanggal " + displayedDate,
    url: location.href,
  });
});

function processDate() {
  if (isAbleToShare) {
    shareBtn.classList.add("show");
  }
  const date = input.valueAsNumber;
  resultArea.classList.add("show");

  const three = date + THREE_DAYS;
  const seven = date + SEVEN_DAYS;
  const forty = date + FORTY_DAYS;
  const hundred = date + HUNDRED_DAYS;
  const thousand = date + THOUSAND_DAYS;

  document.getElementById("hari-1").innerText = formatDate(date);
  document.getElementById("hari-3").innerText = formatDate(three);
  document.getElementById("hari-7").innerText = formatDate(seven);
  document.getElementById("hari-40").innerText = formatDate(forty);
  document.getElementById("hari-100").innerText = formatDate(hundred);
  document.getElementById("hari-1000").innerText = formatDate(thousand);
}

submit.addEventListener("click", (e) => {
  processDate();
  if (history.pushState) {
    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      `?date=${input.value}`;
    window.history.pushState({ path: newurl }, "", newurl);
  }
});
