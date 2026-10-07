import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");

function displayDiscoverItems(items) {
    discoverGrid.innerHTML = "";

    items.forEach((item) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");

        card.style.gridArea = item.id;

        const heading = document.createElement("h2");
        heading.textContent = item.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.src = `images/${item.image}`;
        image.alt = item.alt;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = item.address;

        const description = document.createElement("p");
        description.textContent = item.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.classList.add("learn-more");
        button.type = "button";

        const moreDetails = document.createElement("p");
        moreDetails.textContent = item.more;
        moreDetails.classList.add("more-details");
        moreDetails.hidden = true;

        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            moreDetails.hidden = !moreDetails.hidden;

            if (moreDetails.hidden) {
                button.textContent = "Learn More";
                button.setAttribute("aria-expanded", "false");
            } else {
                button.textContent = "Show Less";
                button.setAttribute("aria-expanded", "true");
            }
        });

        card.appendChild(heading);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);
        card.appendChild(moreDetails);

        discoverGrid.appendChild(card);
    });
}

function displayVisitMessage() {
    const message = document.querySelector("#visit-message");
    const storageKey = "kadomaDiscoverLastVisit";

    const currentVisit = Date.now();
    const previousVisit = localStorage.getItem(storageKey);

    if (previousVisit === null) {
        message.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisit - Number(previousVisit);
        const oneDay = 24 * 60 * 60 * 1000;

        if (timeDifference < oneDay) {
            message.textContent = "Back so soon! Awesome!";
        } else {
            const days = Math.floor(timeDifference / oneDay);

            if (days === 1) {
                message.textContent = "You last visited 1 day ago.";
            } else {
                message.textContent =
                    `You last visited ${days} days ago.`;
            }
        }
    }

    localStorage.setItem(storageKey, currentVisit.toString());
}

function displayFooterInformation() {
    const year = document.querySelector("#current-year");
    const modified = document.querySelector("#last-modified");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (modified) {
        modified.textContent = document.lastModified;
    }
}

displayDiscoverItems(discoverItems);
displayVisitMessage();
displayFooterInformation();