
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
       
        function searchCity(cityElement) {
            let apiKey = "dee40726329758523899886208514a2e";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${apiKey}&units=metric`;
            axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);

           apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityElement}&appid=${apiKey}&units=metric`;
           axios.get(apiUrl).then(displayForecast);        
          }

        function handleSubmit(event) {
            event.preventDefault();
            let cityElement = document.querySelector("#city-input").value;
            searchCity(cityElement);
        }
            
        function showWeather(response) {
          document.querySelector("#entered-city").innerHTML = response.data.name;
          document.querySelector("#found-temperature").innerHTML = Math.round(response.data.main.temp);
          document.querySelector("#humidity").innerHTML = response.data.main.humidity;
          document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
          document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;

          centigradeTemperature = response.data.main.temp;
          metricWindSpeed = response.data.wind.speed;

          let iconElement = document.querySelector("#weather-icon");
          iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
          iconElement.setAttribute("alt", response.data.weather[0].description);

          let apiKey = "dee40726329758523899886208514a2e";
           apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${apiKey}&units=metric`;
           axios.get(apiUrl).then(displayForecast);
            }

        let searchForm = document.querySelector("#search-form");
        searchForm.addEventListener("submit", handleSubmit);

        searchCity("london");      

        // current location button

        function searchLocation(position) {
            let apiKey = "dee40726329758523899886208514a2e";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
           axios.get(apiUrl).then(showWeather);     
          }

        function getCurrentLocation(event) {
          event.preventDefault();
        navigator.geolocation.getCurrentPosition(searchLocation);
        }

        let currentLocation = document.querySelector("#current-location");
        currentLocation.addEventListener("click", getCurrentLocation);

        // temperature unit conversion

        let centigradeTemperature = null;
        let metricWindSpeed = null;

        function displayFahrenheitTemperature(event) {
          event.preventDefault();
          let fahrenheitTemperature = (centigradeTemperature * 9 / 5) + 32;
          let temperatureElement = document.querySelector("#found-temperature");
          temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

          centigradeLink.classList.add("clickable");
          centigradeLink.classList.remove("active");
          fahrenheitLink.classList.add("active");
          fahrenheitLink.classList.remove("clickable");

          let imperialWindSpeed = document.querySelector("#wind");
          imperialWindSpeed.innerHTML = Math.round(metricWindSpeed / 1.609344);
          document.querySelector("#wind-speed-unit").innerHTML = "mph";
        }

        function displayCentigradeTemperature(event) {
          event.preventDefault();
          let temperatureElement = document.querySelector("#found-temperature");
          temperatureElement.innerHTML = Math.round(centigradeTemperature);

          centigradeLink.classList.remove("clickable");
          centigradeLink.classList.add("active");
          fahrenheitLink.classList.add("clickable");
          fahrenheitLink.classList.remove("active");

          document.querySelector("#wind-speed-unit").innerHTML = "km/h";
        }

        let fahrenheitLink = document.querySelector("#fahrenheit-link");
        fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

        let centigradeLink = document.querySelector("#centigrade-link");
        centigradeLink.addEventListener("click", displayCentigradeTemperature);

        // forecast

          function formatHours(timestamp) {
          let date = new Date(timestamp);
         let hours = date.getHours();
         if (hours < 10) {
          hours = `0${hours}`;
          }
         let minutes = date.getMinutes();
         if (minutes < 10) {
           minutes = `0${minutes}`;
         }

          return `${hours}:${minutes}`;
    }

        function displayForecast(response) {
          let forecastElement = document.querySelector("#weather-forecast");
          forecastElement.innerHTML = null;
          let forecast = null;

          for (let index = 0; index < 6; index++) {
          forecast = response.data.list[index];                    
          forecastElement.innerHTML += `
          <div class="col-2">
          <div class="forecast-column">
          <h2 class="forecast-times">
          ${formatHours(forecast.dt * 1000)}
           </h2>
         <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">           
         <div class="forecast-temperature">
         <strong>${Math.round(forecast.main.temp_max)}°C</strong> ${Math.round(forecast.main.temp_min)}°C
          </div>
          </div>
          </div>
          `;            
          }
        } 