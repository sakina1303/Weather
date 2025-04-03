document.addEventListener('DOMContentLoaded', () => {
    // Select the HTML elements
    const cityInput = document.getElementById('city');
    const searchButton = document.getElementById('search');
    const weatherDisplay = document.getElementById('weather');

    // Fetch weather data from an API
    async function fetchWeather(city) {
        const apiKey = '7a0c4e6cf2366fa6420514ee12bf2e5f'; // Replace with your API key
        const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherDisplay.textContent = error.message;
        }
    }

    // Display weather data
    function displayWeather(data) {
        const { location, current } = data;
        weatherDisplay.innerHTML = `
            <h2>Weather in ${location.name}</h2>
            <p>Temperature: ${current.temperature}°C</p>
            <p>Condition: ${current.weather_descriptions[0]}</p>
        `;
    }

    // Add event listener to the search button
    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            weatherDisplay.textContent = 'Please enter a city name.';
        }
    });
});