import axios from 'axios';

export const getWeatherData = async (location: string) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      lastUpdated: new Date().toLocaleTimeString(),
    };
  } catch (error: any) {
    console.error("Failed to fetch weather data:", error.message || error);
    return null;
  }
}; 