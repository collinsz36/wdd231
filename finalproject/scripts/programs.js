import { setupNavigation, setupDialog, showMessage } from "./shared.js";

setupNavigation();
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const grid = document.querySelector("#program-grid");
const status = document.querySelector("#data-status");
const filter = document.querySelector("#level-filter");
const dialog = document.querySelector("#detail-dialog");
const dialogContent = document.querySelector("#dialog-content");
let programs = [];

setupDialog(dialog);

async function loadPrograms() {
    try {
        const response = await fetch("data/programs.json");
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        programs = await response.json();
        renderPrograms();
    } catch (error) {
        console.error("Could not load programme data:", error);
        showMessage(status, "Programme information could not be loaded. Please run this site with a local development server such as VS Code Live Server.");
    }
}

function renderPrograms() {
    const selectedLevel = filter.value;
    const visiblePrograms = programs.filter((program) =>
        selectedLevel === "all" || program.level === selectedLevel || program.level === "All learners"
    );

    grid.innerHTML = visiblePrograms.map((program) => `
    <article class="logic-card-item">
      <div class="card-top"><span class="card-symbol" aria-hidden="true">✦</span><span class="tag">${program.category}</span></div>
      <div class="card-body">
        <h3>${program.name}</h3>
        <p>${program.description}</p>
        <div class="card-meta">
          <span><strong>Level:</strong> ${program.level}</span>
          <span><strong>Format:</strong> ${program.duration}</span>
          <span><strong>Skills:</strong> ${program.skills}</span>
        </div>
        <div class="card-actions"><button class="small-button primary details-button" data-id="${program.id}">View details</button></div>
      </div>
    </article>
  `).join("");

    showMessage(status, `${visiblePrograms.length} programme${visiblePrograms.length === 1 ? "" : "s"} shown.`);
    grid.querySelectorAll(".details-button").forEach((button) => {
        button.addEventListener("click", () => {
            const selectedProgram = programs.find((program) => program.id === Number(button.dataset.id));
            if (!selectedProgram) return;
            document.querySelector("#dialog-title").textContent = selectedProgram.name;
            dialogContent.innerHTML = `
        <p>${selectedProgram.description}</p>
        <p><strong>Learning area:</strong> ${selectedProgram.category}</p>
        <p><strong>Suitable level:</strong> ${selectedProgram.level}</p>
        <p><strong>Format:</strong> ${selectedProgram.duration}</p>
        <p><strong>Skills practised:</strong> ${selectedProgram.skills}</p>
        <p><strong>Expected outcome:</strong> ${selectedProgram.outcome}</p>`;
            dialog.showModal();
        });
    });
}

filter.addEventListener("change", renderPrograms);
loadPrograms();