const cityName = document.querySelector(".cityName");
const button = document.querySelector(".button");
const body = document.querySelector('body')

function getDataWeather() {
    const cityNameValue = cityName.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&units=metric&APPID=5d066958a60d315387d9492393935c19`;

    fetch(url)
        .then(response => response.json())
        .then(response => {
            const removeOldInfo = document.querySelectorAll('.weatherContainer').forEach(element => element.remove())

            const weatherContainer = document.createElement('div');
            weatherContainer.classList.add('weatherContainer')
               
            addDataToPage("Temperature", response.main.temp, weatherContainer);
            addDataToPage("Pressure", response.main.pressure, weatherContainer);
            addDataToPage("Description", response.weather[0].description, weatherContainer)
            addDataToPage("Humidity", response.main.humidity, weatherContainer)
            addDataToPage("Speed", response.wind.speed, weatherContainer)
            addDataToPage("Deg", response.wind.deg, weatherContainer)
            addImage(`http://openweathermap.org/img/w/${response.weather[0].icon}.png`, weatherContainer);

            body.appendChild(weatherContainer)

            cityName.value = '';

        })
}

button.addEventListener("click", () => {
    getDataWeather()
})


function addDataToPage(parametr, value, parentElement) {
    const element = document.createElement("p");
    element.innerHTML = `${parametr}:${value}`;
    parentElement.appendChild(element);
    return element;
}

function addImage(srcContent, parentElement){
    const image = document.createElement('img')
    image.src = srcContent;
    parentElement.appendChild(image)
    return image;
}