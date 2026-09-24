const apiKey = "55829b306fc3dedf3be2443d98cf18e1";

const city = "Kadoma";
const country = "ZW";

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${apiKey}`;

async function getWeather() {

    try {

        const response = await fetch(currentWeatherURL);

        if (!response.ok) {
            throw new Error("Current weather could not be loaded.");
        }

        const data = await response.json();

        document.querySelector("#current-temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.querySelector("#weather-description").textContent =
            data.weather[0].description;

        document.querySelector("#weather-icon").textContent =
            getWeatherIcon(data.weather[0].main);

    } catch (error) {

        console.log(error);

        document.querySelector("#current-temperature").textContent =
            "Unavailable";

        document.querySelector("#weather-description").textContent =
            "Weather unavailable";
    }
}

async function getForecast() {

    try {

        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Forecast could not be loaded.");
        }

        const data = await response.json();

        const forecastContainer =
            document.querySelector("#forecast");

        forecastContainer.innerHTML = "";

        const dailyForecasts = [];

        data.list.forEach(item => {

            const date = new Date(item.dt * 1000);

            const dateString =
                date.toLocaleDateString("en-US");

            const alreadyAdded = dailyForecasts.some(
                forecast => forecast.date === dateString
            );

            if (!alreadyAdded && dailyForecasts.length < 3) {

                dailyForecasts.push({
                    date: dateString,
                    day: date.toLocaleDateString("en-US", {
                        weekday: "long"
                    }),
                    temperature: Math.round(item.main.temp),
                    description: item.weather[0].description
                });

            }

        });

        dailyForecasts.forEach(forecast => {

            const card =
                document.createElement("article");

            card.classList.add("forecast-card");

            card.innerHTML = `
                <h4>${forecast.day}</h4>
                <p>${forecast.temperature}°C</p>
                <p>${forecast.description}</p>
            `;

            forecastContainer.appendChild(card);

        });


    } catch (error) {

        console.log(error);

        document.querySelector("#forecast").innerHTML =
            "<p>Forecast unavailable.</p>";
    }
}

function getWeatherIcon(weather) {

    if (weather === "Clear") {
        return "☀️";
    }

    if (weather === "Clouds") {
        return "☁️";
    }

    if (weather === "Rain") {
        return "🌧️";
    }

    if (weather === "Thunderstorm") {
        return "⛈️";
    }

    return "🌤️";
}

getWeather();
getForecast();
