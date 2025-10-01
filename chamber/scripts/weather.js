// scripts/weather.js
(async function() {
  console.log("🌤️ Starting weather load...");
  
  const API = window.OWM_API_KEY;
  
  
  if (!API) {
    showError("API key not configured");
    return;
  }
  
  console.log("API Key found:", API.substring(0, 8) + "...");

  // Quito coordinates
  const lat = -0.1807;
  const lon = -78.4678;
  const units = "metric";
  
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API}`;

  try {
    console.log("📡 Making API request...");
    
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL)
    ]);

    console.log("Responses:", {
      current: currentResponse.status,
      forecast: forecastResponse.status
    });

    if (!currentResponse.ok) {
      throw new Error(`API Error: ${currentResponse.status} - ${await currentResponse.text()}`);
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    console.log("Data received:", currentData);

    
    updateCurrentWeather(currentData);
    updateForecast(forecastData);
    
    console.log("✅ Weather loaded successfully");

  } catch (error) {
    console.error("❌ Error loading weather:", error);
    showError("Error loading weather data");
  }

  function updateCurrentWeather(data) {
    const tempElement = document.getElementById("weather-temp");
    const descElement = document.getElementById("weather-desc");
    const extraElement = document.getElementById("weather-extra");

    if (tempElement && data.main) {
      tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    }

    if (descElement && data.weather && data.weather[0]) {
      const description = data.weather[0].description;
      descElement.textContent = 
        description.charAt(0).toUpperCase() + description.slice(1);
    }

    if (extraElement && data.main) {
      extraElement.textContent = 
        `Feels like: ${Math.round(data.main.feels_like)}°C · Humidity: ${data.main.humidity}%`;
    }
  }

  function updateForecast(data) {
    const forecastElement = document.getElementById("forecast");
    if (!forecastElement || !data.list) return;

    
    const dailyData = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      
      if (!dailyData[dayName] || Math.abs(date.getHours() - 12) < 3) {
        dailyData[dayName] = item;
      }
    });

    // Convert to array and take next 3 days
    const days = Object.entries(dailyData).slice(0, 3);
    let forecastHTML = '';

    days.forEach(([dayName, dayData]) => {
      const temp = Math.round(dayData.main.temp);
      const desc = dayData.weather[0].description;
      
      forecastHTML += `
        <div class="day">
          <div class="label">${dayName}</div>
          <div class="f-temp">${temp}°C</div>
          <div class="f-desc tier">${desc.charAt(0).toUpperCase() + desc.slice(1)}</div>
        </div>
      `;
    });

    forecastElement.innerHTML = forecastHTML;
  }

  function showError(message) {
    document.getElementById("weather-desc").textContent = message;
    document.getElementById("weather-temp").textContent = "--°C";
    document.getElementById("weather-extra").textContent = "";
  }
})();