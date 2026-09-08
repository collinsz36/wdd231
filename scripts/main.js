const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

const courseContainer = document.querySelector("#course-container");
const creditTotal = document.querySelector("#credit-total");

const allButton = document.querySelector("#all-courses");
const wddButton = document.querySelector("#wdd-courses");
const cseButton = document.querySelector("#cse-courses");

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("article");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>${course.credits} Credits</p>
        `;

        courseContainer.appendChild(card);
    });

    calculateCredits(courseList);
}

function calculateCredits(courseList) {

    const total = courseList.reduce(
        (sum, course) => sum + course.credits,
        0
    );

    creditTotal.textContent = total;
}

function setActiveButton(activeButton) {

    document
        .querySelectorAll(".filter-button")
        .forEach(button => {
            button.classList.remove("active");
        });

    activeButton.classList.add("active");
}

allButton.addEventListener("click", () => {

    displayCourses(courses);

    setActiveButton(allButton);
});

wddButton.addEventListener("click", () => {

    const wddCourses = courses.filter(
        course => course.subject === "WDD"
    );

    displayCourses(wddCourses);

    setActiveButton(wddButton);
});

cseButton.addEventListener("click", () => {

    const cseCourses = courses.filter(
        course => course.subject === "CSE"
    );

    displayCourses(cseCourses);

    setActiveButton(cseButton);
});


const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;

displayCourses(courses);