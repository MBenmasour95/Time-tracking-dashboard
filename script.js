/* === DOM Elements === */
const periods = document.getElementById("periods");
const activitiesWrapper = document.getElementById("activities-wrapper");
const periodElms = document.querySelectorAll(".period");

/* === Variables === */
let period = "weekly";

/* === EventListeners === */
periods.addEventListener("click", switchStats);
document.addEventListener("DOMContentLoaded", getData);

/* === Functions === */
function getData() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((result) => displayActivities(result))
    .catch((err) => console.log(err));
}

function displayActivities(data) {
  const result = data.map((item) => {
    const daily = `
      <h1>${item.timeframes.daily.current}hrs</h1>
      <p>Last day - ${item.timeframes.daily.previous}hrs</p>
    `;

    const weekly = `
      <h1>${item.timeframes.weekly.current}hrs</h1>
      <p>Last week - ${item.timeframes.weekly.previous}hrs</p>
    `;

    const monthly = `
      <h1>${item.timeframes.monthly.current}hrs</h1>
      <p>Last month - ${item.timeframes.monthly.previous}hrs</p>
    `;

    return `
      <div class="activity-wrapper ${
        item.title === "Self Care"
          ? item.title.replace(/\s/g, "-").toLowerCase()
          : item.title.toLowerCase()
      }">
      <div class="card">
        <div class="card-head">
          <h4>${item.title}</h4>
          <button>
            <img src="./images/icon-ellipsis.svg" alt="ellipsis" />
          </button>
        </div>
        <div class="card-body">
          ${period === "daily" ? daily : period === "weekly" ? weekly : monthly}
        </div>
      </div>
      </div>
    `;
  });

  activitiesWrapper.innerHTML = result.join("");

  const buttons = activitiesWrapper.querySelectorAll(".card-head button");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      btn.closest(".card").classList.add("effect-hide");
    });

    btn.addEventListener("mouseleave", () => {
      btn.closest(".card").classList.remove("effect-hide");
    });
  });
}

function switchStats(e) {
  if (e.target.classList.contains("period")) {
    periodElms.forEach((period) => period.classList.remove("active"));
    e.target.classList.add("active");

    if (e.target.dataset.period === "daily") {
      period = "daily";
    } else if (e.target.dataset.period === "weekly") {
      period = "weekly";
    } else if (e.target.dataset.period === "monthly") {
      period = "monthly";
    }
    getData();
  }
}
