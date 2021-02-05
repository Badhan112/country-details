async function getWeatherDetails(latitude, longitude){
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=b64a25b4f18cef27a91e53b857bd84fb`;
    const response = await fetch(api);
    const data = await response.json();
    return data;
}


function displayWeatherCondition(latitude, longitude){
    getWeatherDetails(latitude, longitude).then(data => {
        const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.getElementById("temp-icon").setAttribute("src", iconSrc);
        document.getElementById("temp").innerText = data.main.temp;
        document.getElementById("feels-like").innerText = data.main.feels_like;
        document.getElementById("cloud-condition").innerText = `Cloud Condition: ${data.weather[0].description}`
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    });
}


async function getCountryDetails(countryCode){
    const api = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
    const response = await fetch(api);
    const data = await response.json();
    return data;
}


function displayCountryDetails(countryCode){
    getCountryDetails(countryCode).then(data => {
        document.getElementById("country-list").style.display = "none";
        document.getElementById("country-details").style.display = "block";

        document.getElementById("flagImg").setAttribute("src", data.flag);
        document.getElementById("countryName").innerText = data.name;
        document.getElementById("capitalName").innerText = `Capital: ${data.capital}`;

        document.getElementById("full-name").innerText = `Full Name:  ${data.altSpellings[1]}`;
        document.getElementById("region").innerText = `Region:  ${data.region}`;
        document.getElementById("subregion").innerText = `Sub Region:  ${data.subregion}`;
        document.getElementById("population").innerText = `Population:  ${data.population}`;
        document.getElementById("timezone").innerText = `Timezone:  ${data.timezones[0]}`;

        document.getElementById("currencie-code").innerText = `Currencie Code:  ${data.currencies[0].code}`;
        document.getElementById("currencie-name").innerText = `Currencie Name:  ${data.currencies[0].name}`;
        document.getElementById("currencie-symbol").innerText = `Currencie Symbol:  ${data.currencies[0].symbol}`;
        document.getElementById("language-name").innerText = `Language Name:  ${data.languages[0].name}`;
        document.getElementById("language-nativeName").innerText = `Language Native Name:  ${data.languages[0].nativeName}`;

        displayWeatherCondition(data.latlng[0], data.latlng[1]);
    });
}


function displayCountryList(countryDetails){
    const countrylist = document.getElementById("country-list");

    countryDetails.map(singleCountry => {
        const area = document.createElement("div");
        const countryName = document.createElement("h2");
        const capitalName = document.createElement("h4");
        countryName.innerText = singleCountry.name;
        capitalName.innerText = `Capital: ${singleCountry.capital}`;
        area.appendChild(countryName);
        area.appendChild(capitalName);
        countrylist.appendChild(area);

        area.style.padding = "30px";
        area.style.backgroundColor = "#e8e8e8";
        area.style.cursor = "pointer";
        area.style.borderRadius = "15px";

        area.addEventListener("click", function(){
            const countryCode = singleCountry.alpha2Code.toLowerCase();
            displayCountryDetails(countryCode);
        });
    });
    
}


async function getData(){
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await response.json();
    return data;
}


getData()
.then(data => displayCountryList(data))
.catch(error => alert("Something Went Worng", error));