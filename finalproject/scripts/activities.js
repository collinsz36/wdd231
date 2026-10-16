import { setupNavigation, setupDialog, showMessage } from "./shared.js";

setupNavigation();
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const grid = document.querySelector("#activity-grid");
const status = document.querySelector("#data-status");
const filter = document.querySelector("#activity-filter");
const savedCount = document.querySelector("#saved-count");
const showSavedButton = document.querySelector("#show-saved");
const clearSavedButton = document.querySelector("#clear-saved");
const dialog = document.querySelector("#detail-dialog");
const dialogContent = document.querySelector("#dialog-content");
let activities = [];
let showSavedOnly = false;
let savedIds = JSON.parse(localStorage.getItem("hsol-saved-activities") || "[]");

setupDialog(dialog);

async function loadActivities() {
    try {
        const response = await fetch("data/activities.json");
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        activities = await response.json();
        renderActivities();
    } catch (error) {
        console.error("Could not load activity data:", error);
        showMessage(status, "Activities could not be loaded. Run the project with a local development server such as VS Code Live Server.");
    }
}

function updateSavedCount() {
    savedCount.textContent = `${savedIds.length} activit${savedIds.length === 1 ? "y" : "ies"} saved`;
}

function renderActivities() {
    const selectedCategory = filter.value;
    let visibleActivities = activities.filter((activity) =>
        selectedCategory === "all" || activity.category === selectedCategory
    );

    if (showSavedOnly) {
        visibleActivities = visibleActivities.filter((activity) => savedIds.includes(activity.id));
    }

    grid.innerHTML = visibleActivities.map((activity) => {
        const isSaved = savedIds.includes(activity.id);
        return `
      <article class="logic-card-item">
        <div class="card-top"><span class="card-symbol" aria-hidden="true">${activity.symbol}</span><span class="tag">${activity.category}</span></div>
        <div class="card-body">
          <h3>${activity.name}</h3>
          <p>${activity.description}</p>
          <div class="card-meta">
            <span><strong>Level:</strong> ${activity.level}</span>
            <span><strong>Time:</strong> ${activity.duration}</span>
            <span><strong>Skill:</strong> ${activity.skill}</span>
          </div>
          <div class="card-actions">
            <button class="small-button primary details-button" data-id="${activity.id}">More details</button>
            <button class="small-button save-button" data-id="${activity.id}" aria-pressed="${isSaved}">${isSaved ? "★ Saved" : "☆ Save"}</button>
          </div>
        </div>
      </article>`;
    }).join("");

    updateSavedCount();
    showMessage(status, `${visibleActivities.length} activit${visibleActivities.length === 1 ? "y" : "ies"} shown.`);

    grid.querySelectorAll(".save-button").forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            if (savedIds.includes(id)) {
                savedIds = savedIds.filter((savedId) => savedId !== id);
            } else {
                savedIds.push(id);
            }
            localStorage.setItem("hsol-saved-activities", JSON.stringify(savedIds));
            renderActivities();
        });
    });

    grid.querySelectorAll(".details-button").forEach((button) => {
        button.addEventListener("click", () => {
            const activity = activities.find((item) => item.id === Number(button.dataset.id));
            if (!activity) return;
            document.querySelector("#dialog-title").textContent = activity.name;
            dialogContent.innerHTML = `
        <p>${activity.description}</p>
        <p><strong>Category:</strong> ${activity.category}</p>
        <p><strong>Suitable level:</strong> ${activity.level}</p>
        <p><strong>Suggested time:</strong> ${activity.duration}</p>
        <p><strong>Skill focus:</strong> ${activity.skill}</p>
        <p><strong>Learning outcome:</strong> ${activity.outcome}</p>`;
            dialog.showModal();
        });
    });
}

filter.addEventListener("change", renderActivities);
showSavedButton.addEventListener("click", () => {
    showSavedOnly = !showSavedOnly;
    showSavedButton.textContent = showSavedOnly ? "Show all activities" : "Show saved only";
    renderActivities();
});
clearSavedButton.addEventListener("click", () => {
    savedIds = [];
    localStorage.setItem("hsol-saved-activities", JSON.stringify(savedIds));
    showSavedOnly = false;
    showSavedButton.textContent = "Show saved only";
    renderActivities();
});
loadActivities();