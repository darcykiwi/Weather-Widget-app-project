
        // date and time

        function formatDateTime(dateTime) {
            
        let hours = dateTime.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        let minutes = dateTime.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        let dayIndex = dateTime.getDay();
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let day = days[dayIndex];

        return `${day} ${hours}:${minutes}`;
        
        }

        let dateAndTime = document.querySelector("#date-time");

        let currentTime = new Date();
        dateAndTime.innerHTML = formatDateTime(currentTime);

        // search city and fetch weather

        function search(event) {
            event.preventDefault();
            let cityElement = document.querySelector("#entered-city");  
            let cityInput = document.querySelector("#city-input");
            cityElement.innerHTML = cityInput.value;
            let apiKey = "dee40726329758523899886208514a2e";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
            axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather); 
        }
            
        function showWeather(response) {
            let temperatureValue = document.querySelector("#found-temperature");
            let displayedTemperature = Math.round(response.data.main.temp);
            temperatureValue.innerHTML = `${displayedTemperature}°C`;

            let weatherDescription = document.querySelector("#weather-description");
            weatherDescription.innerHTML = response.data.weather[0].main;

            let humidityValue = document.querySelector("#humidity");
            humidityValue.innerHTML = `${response.data.main.humidity}%`

            let windValue = document.querySelector("#wind");
            let displayedWind = Math.round(response.data.wind.speed);
            windValue.innerHTML = `${displayedWind}km/h`;
            }

        let searchForm = document.querySelector("#search-form");
        searchForm.addEventListener("submit", search);