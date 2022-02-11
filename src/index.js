/** --- Browser check --- */
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
const isAbleToShare = Boolean(navigator.share);

/* --- Element --- */
const input = document.getElementById("date-input");
const submit = document.getElementById("submit");
const warning = document.getElementById("submit");
const resultArea = document.getElementById("result");
const shareBtn = document.getElementById("share");
const installArea = document.getElementById("install-area");
const installBtn = document.getElementById("install-button");

/* --- Constants --- */
const ONE_DAY = 1000 * 60 * 60 * 24;
const THREE_DAYS = ONE_DAY * 3 - ONE_DAY;
const SEVEN_DAYS = ONE_DAY * 7 - ONE_DAY;
const FORTY_DAYS = ONE_DAY * 40 - ONE_DAY;
const HUNDRED_DAYS = ONE_DAY * 100 - ONE_DAY;
const THOUSAND_DAYS = ONE_DAY * 1000 - ONE_DAY;

/** Service worker thingy */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register(new URL("sw.js", import.meta.url), { type: "module" })
      .then(
        function (registration) {
          // Registration was successful
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          // registration failed :(
          console.log("ServiceWorker registration failed: ", err);
        }
      );
  });
}

/** ---- Initial Setup ----- */
const queryString = new URLSearchParams(location.search);
const initialDate = queryString.get("date");
if (initialDate) {
  input.value = initialDate;
  submit.disabled = false;
  processDate();
}

/** --- Installation --- */
let installPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  if (isMobile) {
    e.preventDefault();
    installPrompt = e;
    // Update UI notify the user they can install the PWA
    installArea.classList.add("show");
  }
});

installBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  installPrompt.prompt();
});

window.addEventListener("appinstalled", () => {
  installArea.classList.remove("show");
  installPrompt = null;
});

/** --- Form --- */
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

  document.getElementById("hari-1").innerText = formatDate(value);
  document.getElementById("hari-3").innerText = "--";
  document.getElementById("hari-7").innerText = "--";
  document.getElementById("hari-40").innerText = "--";
  document.getElementById("hari-100").innerText = "--";
  document.getElementById("hari-1000").innerText = "--";
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
