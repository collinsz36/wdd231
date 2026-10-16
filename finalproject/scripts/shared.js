export function setupNavigation() {
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector("#site-nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });
    }
}

export function setupDialog(dialog) {
    if (!dialog) return;
    const closeButton = dialog.querySelector(".dialog-close");
    if (closeButton) closeButton.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });
}

export function showMessage(element, message) {
    if (element) element.textContent = message;
}