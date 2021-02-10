
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

        function handleSubmit(event) {
            event.preventDefault();
            let cityElement = document.querySelector("#entered-city");  
            let cityInput = document.querySelector("#city-input");
            cityElement.innerHTML = cityInput.value;
            let apiKey = "dee40726329758523899886208514a2e";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
            axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather); 
        }
            
        function showWeather(response) {
          console.log(response.data);
          document.querySelector("#entered-city").innerHTML = response.data.name;
          document.querySelector("#found-temperature").innerHTML = Math.round(response.data.main.temp);
          document.querySelector("#humidity").innerHTML = response.data.main.humidity;
          document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
          document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
            }

        let searchForm = document.querySelector("#search-form");
        searchForm.addEventListener("submit", handleSubmit);

        // SOLUTION TO WEEK 5 HOMEWORK

        //function searchCity(city) {
        //    let apiKey = //api Key;
        //    let apiUrl = //api Key;`
        //    axios.get(apiUrl).then(displayWeatherCondition);          
        //}

        //function handleSubmit(event) {
        //    event.preventDefault();
        //    let city = document.querySelector("#city-input").value;
        //    searchCity(city);
        //}        


        // [HANDLED THIS: INSERTED IT INTO MY CODE]
        //function displayWeatherCondition(response) {
        //  console.log(response.data);
        //  document.querySelector("#entered-city").innerHTML = response.data.name;
        //  document.querySelector("#found-temperature").innerHTML = Math.round(response.data.main.temp);
        //  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
        //  document.querySelector("#wind").innerHTML = response.data.main.wind.speed;
        //  document.querySelector("#description").innerHTML = response.data.weather[0].main;
        // [HANDLED THIS: INSERTED IT INTO MY CODE]

        // [THIS IS ALREADY IN MY CODE]
        //let searchForm = document.querySelector("#search-form");
        //searchForm.addEventListener("submit", handleSubmit);
        // [THIS IS ALREADY IN MY CODE] (will change function name to handleSubmit instead.)

        //searchCity("New York");

        // current location

        //function searchLocation(position) {
        //    let apiKey = //api Key;
        //    let apiUrl = //api URL;
         //   axios.get(apiUrl).then(displayWeatherCondition);
        //  }

        //function getCurrentLocation(event) {
        //  event.preventDefault();
        //navigator.geolocation.getCurrentPosition(searchLocation);
        //}

        //let currentLocation = document.querySelector("#current-location");
        //currentLocation.addEventListener("click", getCurrentLocation);