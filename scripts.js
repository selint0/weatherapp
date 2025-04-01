

function getWeather(){
    document.getElementById('container').style.background = 'url(./images/bk2.png)';
    const apiKey = '7e6ebb62c22d6e816f4b9ca218a9546e';
    const city = document.getElementById('city').value;

    if(!city){
        alert("Please Enter a City");
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error Fetching Current Weather", error);
            alert("Error Fetching Current Weather. Try Again");
        }); 
}
function displayWeather(data){
    const tempInfo = document.getElementById('temp');
    const weatherInfo = document.getElementById('info');
    const icon = document.getElementById('icon');
    const hourlyForecast = document.getElementById('forecast');

    weatherInfo.innerHTML = " ";
    hourlyForecast.innerHTML = " ";
    tempInfo.innerHTML = " ";

    if (data.cod === '404'){
        weatherInfo.innerHTML = `<p>${data.message}</p>`
    }else{
        const cityName = data.name;
        const temperature = Math.round(((data.main.temp - 273.15) * 9/5) + 32 );
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        
        const temperatureHTML = `
            <p>${temperature}°F</p>
        `;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;
        
        tempInfo.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHTML;
        icon.src = iconUrl;
        icon.alt = description;

        showImage();
    }
}
function displayHourlyForecast(hourlyData){
    const hourlyForecast = document.getElementById('forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.array.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(((item.main.temp - 273.15) * 9/5) + 32 );
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly weather icon">
                <span>${temperature}°F</span>
            </div>
        `;
        hourlyForecast.innerHTML += hourlyItemHTML;
    });
}
function showImage(){
    const weatherIcon = document.getElementById('icon');
    weatherIcon.style.display = 'block';
}
function modal(){
	// the modal element on the page so we can hide or show it
	let modal = document.getElementById("modal");

	// event listener/handler for the button to open the modal
	document.getElementById("viewModal").addEventListener("click", function(){
		modal.classList.remove("hidden");
	});
	
	// event listener/handler for the button to close the modal
	document.getElementById("closeModal").addEventListener("click", function(){
		modal.classList.add("hidden");
	});

    //getRecipe();
};

// function getRecipe(){
//     const apiHotCoffee = $.getJSON("hot.json");
//     //const apiIceCoffee = 'https://api.sampleapis.com/coffee/iced';
//         fetch(apiHotCoffee)
//             .then(response => response.json())
//             .then(data => {
//                 displayRecipe(data);
//             })
//             .catch(error => {
//                 console.error("Error Fetching Recipe", error);
//                 alert("Error Fetching Recipe. Try Again");
//             }); 
//         // fetch(apiIceCoffee)
//         // .then(response => response.json())
//         // .then(stuff => {
//         //     displayRecipe(stuff);
//         // })
//         // .catch(error => {
//         //     console.error("Error Fetching Recipe", error);
//         //     alert("Error Fetching Recipe. Try Again");
//         // });     
// }
// function displayRecipe(data){
//     const coffeeDiv = document.getElementById('#modal p');

//     coffeeDiv.innerHTML = " ";

//     if (data.cod === '404'){
//         coffeeDiv.innerHTML = `<p>${data.message}</p>`
//     }else{
//         const drinkName = data.title;
//         const description = data.description;
//         const coffeeImg = data.image;
        
//         const coffeeDivHTML = `
//             <img src="${coffeeImg[0]}">
//             <p>${drinkName[1]}</p>
//             <p>${description[1]}</p>
//         `;
        
//         coffeeDiv.innerHTML = coffeeDivHTML;

//     }
//}
