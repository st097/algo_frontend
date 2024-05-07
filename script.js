const key = "UGJMS2SVRKZNLW9ZZ6ZWWVZG4";

let request_url ="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]?key=API_KEY";

request_url = request_url.replace("API_KEY", key);

function extractData(data) {
    //getting the data from the API
    const resolvedAddress = data.resolvedAddress;
    const cloudcover = data.days[0].cloudcover;
    const conditions = data.days[0].conditions;
    const icon = data.days[0].icon;
    const tempF = data.days[0].temp;
    const description = data.days[0].description;

    const tempC = Math.round((tempF - 32) * (5/9));

    //updating the UI
    const addr = document.getElementById('address');
    addr.innerText = resolvedAddress;
    addr.classList.remove('d-none');
    addr.classList.add('d-block');

    const desc = document.getElementById('description');
    desc.innerText = description;
    desc.classList.remove('d-none');
    desc.classList.add('d-block');

    const temp = document.getElementById('temp');
    temp.querySelector('span').innerText = tempC;
    temp.querySelector('span').classList.remove('d-none');
    temp.classList.remove('d-none');
    temp.classList.add('d-block');

    const img = document.getElementById('icon');
    fetch(`./assets/${icon}.jpg`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Image not found');
            }
            img.src = `./assets/${icon}.jpg`;
        })
        .catch(error => {
            img.src = './assets/weather.png';
        });

    return { resolvedAddress, cloudcover, conditions, icon, tempC, description };
}


const btn = document.getElementById('button');

btn.addEventListener('click', async function(){
    let location = document.getElementById('cityName').value;

    url = request_url;
    url = url.replace("[location]", location);

    try {
        let response = await fetch(url);
        let data = await response.json();
        let weatherData = extractData(data);
        console.log(weatherData);
    } catch(err) {
        console.log(err);
    }
});