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

        area.addEventListener("click", function(){
            const countryCode = singleCountry.alpha2Code.toLowerCase();
            console.log(countryCode);
        });
    });
    
}

async function getData(){
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await response.json();
    console.log(data);
    return data;
}

getData()
.then(data => displayCountryList(data))
.catch(error => alert("Something Went Worng", error));