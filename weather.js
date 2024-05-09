async function Input(){
    var inputt = document.getElementById('inputt').value
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputt}&appid=fbdff6f9b3157d82a268018b0d8d266c`);
    var data = await response.json()
    // console.log(data);
    // console.log(data.weather[0].main);
    
    var icon=document.querySelector(".weather-icon")
    if(data.weather[0].main === "Rain"){
        icon.src = "assets/rain.png"
    } else if(data.weather[0].main==="sun"){
        icon.src = "assets/sun.png"
    }else if(data.weather[0].main ==="Clouds"){
        icon.src = "assets/clouds.png"
    }else{
        icon.src = "assets/clouds-sun.png"

    }
    // var temp_max=(data.main.temp_max-32)* 5 / 9;
    var temp_max=data.main.temp_max - 273.15;
    var temp_min=data.main.temp_min - 273.15;
    console.log(temp_max)

    console.log(data.main.pressure);
    document.querySelector("#namecity").innerHTML = data.name;
    document.querySelector("#temp-max").innerHTML = temp_max.toFixed();
    document.querySelector("#temp-min").innerHTML = temp_min.toFixed();
    document.querySelector("#humidity").innerHTML = data.main.humidity;
    document.querySelector("#wind").innerHTML = data.wind.speed;

}
