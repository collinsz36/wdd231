const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    const currentDate = new Date();

    timestamp.value = currentDate.toISOString();
}

const modalLinks = document.querySelectorAll(".modal-link");

modalLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const modalId = link.getAttribute("data-modal");
        const modal = document.querySelector("#" + modalId);

        modal.showModal();
    });
});

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const modal = button.closest("dialog");

        modal.close();
    });
});


const formData = document.querySelector("#formData");

if (formData) {

    const urlParams = new URLSearchParams(window.location.search);

    const firstName = urlParams.get("firstName");
    const lastName = urlParams.get("lastName");
    const email = urlParams.get("email");
    const phone = urlParams.get("phone");
    const organization = urlParams.get("organization");
    const timestampValue = urlParams.get("timestamp");

    formData.innerHTML = `
        <div class="application-info">
            <strong>First Name:</strong> ${firstName || ""}
        </div>

        <div class="application-info">
            <strong>Last Name:</strong> ${lastName || ""}
        </div>

        <div class="application-info">
            <strong>Email:</strong> ${email || ""}
        </div>

        <div class="application-info">
            <strong>Mobile Phone:</strong> ${phone || ""}
        </div>

        <div class="application-info">
            <strong>Business / Organization:</strong> ${organization || ""}
        </div>

        <div class="application-info">
            <strong>Date and Time:</strong> ${timestampValue || ""}
        </div>
    `;
}