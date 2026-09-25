
async function loadSpotlights() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();

        const qualifiedMembers = members.filter(member =>
            member.membership === "Gold" ||
            member.membership === "Silver"
        );

        qualifiedMembers.sort(() => Math.random() - 0.5);

        const selectedMembers = qualifiedMembers.slice(0, 3);

        const spotlights = document.querySelector("#spotlights");

        spotlights.innerHTML = "";

        selectedMembers.forEach(member => {

            const card =
                document.createElement("article");

            card.classList.add("spotlight-card");

            card.innerHTML = `
    <img src = "images/${member.image}" alt = "${member.name} logo" 
    loading = "Lazy" width = "300" height = "200">

                <h3>${member.name}</h3>

                <p>
                    <strong>Membership:</strong>
                    ${member.membership}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Website:</strong>
                    <a href="${member.website}"
                        target="_blank"
                        rel="noopener">
                        Visit Website
                    </a>
                </p>`;

            spotlights.appendChild(card);

        });

    } catch (error) {

        console.log(error);

        document.querySelector("#spotlights").innerHTML =
            "<p>Business information is currently unavailable.</p>";
    }
}


loadSpotlights();

