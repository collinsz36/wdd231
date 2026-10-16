const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");
const yearElement = document.querySelector("#year");
const levelSelect = document.querySelector("#learner-level");
const rememberCheckbox = document.querySelector("#save-preference");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
}

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (levelSelect && localStorage.getItem("hsol-save-level") === "true") {
    const savedLevel = localStorage.getItem("hsol-learner-level");
    if (savedLevel) levelSelect.value = savedLevel;
    if (rememberCheckbox) rememberCheckbox.checked = true;
}

if (levelSelect && rememberCheckbox) {
    rememberCheckbox.addEventListener("change", () => {
        localStorage.setItem("hsol-save-level", rememberCheckbox.checked ? "true" : "false");
        if (rememberCheckbox.checked && levelSelect.value) {
            localStorage.setItem("hsol-learner-level", levelSelect.value);
        } else if (!rememberCheckbox.checked) {
            localStorage.removeItem("hsol-learner-level");
        }
    });

    levelSelect.addEventListener("change", () => {
        if (rememberCheckbox.checked && levelSelect.value) {
            localStorage.setItem("hsol-learner-level", levelSelect.value);
        }
    });
}

document.querySelectorAll(".video-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Add your public project demonstration video URL to the footer before submitting.");
    });
});