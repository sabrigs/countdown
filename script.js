// Counter
const displayTitle = document.querySelector("#displayTitle");
const displayCounterDay = document.querySelector("#displayCounterDay");
const displayCounterHour = document.querySelector("#displayCounterHour");
const displayCounterMin = document.querySelector("#displayCounterMin");
const displayCounterSec = document.querySelector("#displayCounterSec");

// Form
const editForm = document.querySelector("#editForm");
const inputTitle = document.querySelector("#inputTitle");
const inputDate = document.querySelector("#inputDate");

// Default event
let titleEvent = "2027 is coming!";
let dateEvent = new Date("2027-01-01T00:00:00");

// Local storage
const savedTitle = localStorage.getItem("title");
const savedDate = localStorage.getItem("date");

// Load saved values
if (savedTitle) {
    titleEvent = savedTitle;
}

if (savedDate) {
    dateEvent = new Date(savedDate);
}

// Display values
displayTitle.innerHTML = titleEvent;
inputTitle.value = titleEvent;

inputDate.value = savedDate || "2027-01-01T00:00";

// Trigger from button click
editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = inputTitle.value;
    const date = inputDate.value;

    dateEvent = new Date(date);

    localStorage.setItem("title", title);
    localStorage.setItem("date", date);

    displayTitle.innerHTML = title;

    dialog.close();
    updateCounter();
});

//Trigger to open dialog
const editButton = document.querySelector("#editButton");
const dialog = document.querySelector("#editDialog");
const closeDialog = document.querySelector("#closeButton");

editButton.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", () => {
    dialog.close();
})

function updateCounter() {
    const now = new Date();
    const timeGap = dateEvent - now;

    if (timeGap <= 0) {
        displayCounterDay.innerHTML = "00";
        displayCounterHour.innerHTML = "00";
        displayCounterMin.innerHTML = "00";
        displayCounterSec.innerHTML = "00";
        return;
    }

    const day = Math.floor(timeGap / (1000 * 60 * 60 * 24));
    const hour = Math.floor(timeGap / (1000 * 60 * 60) % 24);
    const minute = Math.floor(timeGap / (1000 * 60) % 60);
    const sec = Math.floor(timeGap / 1000 % 60);

    displayCounterDay.innerHTML = `${day}`
    displayCounterHour.innerHTML = `${hour}`
    displayCounterMin.innerHTML = `${minute}`
    displayCounterSec.innerHTML = `${sec}`
}

setInterval(updateCounter, 1000);