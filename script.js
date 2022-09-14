let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d6523ae2405add6a7303282edf8de89e`);

        const weatherdata = await response.json();
        const { name } = weatherdata;
        const { feels_like } = weatherdata.main;
        const { id, main } = weatherdata.weather[0];
        console.log(weatherdata);
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

        if (id > 199 && id < 234) {
            tempicon.src = "./image/thunderstorm.svg"
        }
        else if (id > 299 && id < 322) {
            tempicon.src = "./image/cloud-solid.svg"
        }
        else if (id > 500 && id < 532) {
            tempicon.src = "./image/rain.svg"
        }
        else if (id > 600 && id < 623) {
            tempicon.src = "./image/snow.svg"
        }
        else if (id > 700 && id < 782) {
            tempicon.src = "./image/cloud-solid.svg"
        }
        else if (id == 800) {
            tempicon.src = "./image/cloud-sun.svg"
        }
    }
    catch (error) {
        alert('City not found');
    }
};


window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {


            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d6523ae2405add6a7303282edf8de89e  `

            fetch(api).then((response) => {
                return response.json();
            })

                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);
                    if (id > 199 && id < 234) {
                        tempicon.src = "./image/thunderstorm.svg"
                    }
                    else if (id > 299 && id < 322) {
                        tempicon.src = "./image/cloud-solid.svg"
                    }
                    else if (id > 500 && id < 532) {
                        tempicon.src = "./image/rain.svg"
                    }
                    else if (id > 600 && id < 623) {
                        tempicon.src = "./image/snow.svg"
                    }
                    else if (id > 700 && id < 782) {
                        tempicon.src = "./image/cloud-solid.svg"
                    }
                    else if (id == 800) {
                        tempicon.src = "./image/cloud-sun.svg"
                    }
                })
          }

        )
    }
})