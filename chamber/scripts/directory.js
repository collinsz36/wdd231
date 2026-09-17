const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        membersContainer.innerHTML =
            "<p>Sorry, the business directory could not be loaded.</p>";

        console.error(error);
    }
}

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(function (member) {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}"
                 alt="${member.name}"
                 loading="lazy">

            <div class="member-information">

                <h2>${member.name}</h2>

                <p class="tagline">
                    ${member.category}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${getMembership(member.membership)}
                </p>

                <a href="${member.website}"
                   target="_blank"
                   rel="noopener">
                   Visit Website
                </a>

            </div>
        `;

        membersContainer.appendChild(card);
    });
}

function getMembership(level) {

    if (level === 3) {
        return "Gold";
    }

    else if (level === 2) {
        return "Silver";
    } else

        return "Member";
}

gridButton.addEventListener("click", function () {

    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", function () {

    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

menuButton.addEventListener("click", function () {

    navigation.classList.toggle("open");

});

const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastModified").textContent =
    document.lastModified;

getMembers();