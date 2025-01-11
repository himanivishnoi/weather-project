// const apikey = "e07d7400410f4a41adc135340250801";
// const api_url = "https://api.weatherapi.com/v1/current.json";

// const app = document.getElementById("app");
// const cityInput = document.getElementById("city-input");
// const getWeatherBtn = document.getElementById("get-weather");
// const weatherInfo = document.getElementById("weather-info");
// const cityName = document.getElementById("city-name");
// const temperature = document.getElementById("temperature");
// const weatherDescription = document.getElementById("weather-description");

// // Function to fetch weather data
// async function getWeather(city) {
//     try {
//         const response = await fetch(`${api_url}?key=${apikey}&q=${city}`);
//         if (!response.ok) throw new Error("City not found");

//         const data = await response.json();

//         // Update UI with weather details
//         cityName.textContent = `${data.location.name}, ${data.location.country}`;
//         temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
//         weatherDescription.textContent = data.current.condition.text;

//         // Show weather info
//         weatherInfo.classList.remove("hidden");

//         // Update background based on weather
//         updateBackground(data.current.condition.text.toLowerCase());
//     } catch (error) {
//         alert(error.message);
//         console.error(error);
//     }
// }

// // Function to update background based on weather
// function updateBackground(condition) {
//     const conditionsMap = {
//         clear: "bg-blue-600",
//         sunny: "bg-yellow-400", // Added sunny for better coverage
//         overcast: "bg-gray-500",
//         default: "bg-gray-200",
//         cloudy: "bg-gray-900",
//         rain: "bg-blue-900",
//         snow: "bg-white",
//         thunderstorm: "bg-purple-500", // Fixed typo
//         mist: "bg-gray-700",
//         haze: "bg-yellow-500",
//         default: "bg-gray-200",
//     };

//     // Normalize condition to lowercase
//     const normalizedCondition = condition.toLowerCase();

//     // Remove existing background classes
//     app.className = "flex items-center justify-center min-h-screen transition-all duration-500";

//     // Add new background class
//     app.classList.add(conditionsMap[condition] || conditionsMap.default);
// }

// // Event listener for the "Get Weather" button
// getWeatherBtn.addEventListener("click", () => {
//     const city = cityInput.value.trim();
//     if (city) {
//         getWeather(city);
//     } else {
//         alert("Please enter a city name.");
//     }
// });


const apikey = "e07d7400410f4a41adc135340250801";
const api_url = "https://api.weatherapi.com/v1/current.json";

const app = document.getElementById("app");
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");

// Function to fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(`${api_url}?key=${apikey}&q=${city}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Update UI with weather details
        cityName.textContent = `${data.location.name}, ${data.location.country}`;
        temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
        weatherDescription.textContent = data.current.condition.text;

        // Show weather info
        weatherInfo.classList.remove("hidden");

        // Update widgets based on weather
        updateWidgets(data.current);

        // Update background based on weather
        updateBackground(data.current.condition.text.toLowerCase());
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Function to update background based on weather condition
function updateBackground(condition) {
    const conditionsMap = {
        clear: "bg-blue-500",
        sunny: "bg-yellow-300", // Added sunny for better coverage
        overcast: "bg-gray-500",
        default: "bg-gray-200",
        cloudy: "bg-gray-900",
        rain: "bg-blue-800",
        snow: "bg-white",
        thunderstorm: "bg-purple-500", // Fixed typo
        mist: "bg-gray-700",
        haze: "bg-yellow-500",
        default: "bg-gray-300",
    };

    const normalizedCondition = condition.toLowerCase();

    // Remove existing background classes
    app.className = "flex items-center justify-center min-h-screen transition-all duration-500";

    // Add new background class (fallback to 'default' if no match)
    app.classList.add(conditionsMap[normalizedCondition] || conditionsMap.default);
}

// Function to update widgets based on weather conditions
function updateWidgets(data) {
    // Update weather icon
    updateWeatherIcon(data.condition.icon);

    // Show wind speed widget if wind speed is more than 10 km/h
    if (data.wind_kph > 10) {
        windSpeed.textContent = `Wind Speed: ${data.wind_kph} km/h`;
        windSpeed.classList.remove("hidden");
    } else {
        windSpeed.classList.add("hidden");
    }

    // Show humidity widget if humidity is available
    humidity.textContent = `Humidity: ${data.humidity}%`;
    humidity.classList.remove("hidden");
}

// Function to update weather icon
function updateWeatherIcon(iconUrl) {
    weatherIcon.src = `https:${iconUrl}`;
    weatherIcon.alt = "Weather Icon";
}

// Event listener for the "Get Weather" button
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
