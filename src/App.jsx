import React, { useState, useEffect } from "react"; 
import "./App.css";
 import axios from "axios";
  import { WiHumidity } from "react-icons/wi"; 
  import { FaWind } from "react-icons/fa6";

  import clear from "./images/clear.jpeg";
  import cloudy from "./images/cloudy.jpeg";
  import rb from "./images/rb.webp"
  import heavyr from "./images/heavyr.jpeg"
  import snow from "./images/snow.webp"
  import rainc from "./images/rainy-cloudy.webp"
  import night from "./images/night.jpg"
  import rainnight from "./images/rainnight.jpg" 
  import snowy from "./images/snowy.jpg"

const App = () => { const [searchv, setsearchv] = useState("lucknow"); 
const apiKey = "fd9b980c7bb1e4097ad73994867af5d1";

const [temp, setTemp] = useState("");
 const [condition, setCondition] = useState("");
  const [location, setLocation] = useState(""); 
  const [localtime, setlocaltime] = useState("");
   const [icon, seticon] = useState(""); 
   const [humidity, sethumidity] = useState(""); 
   const [wind, setwind] = useState("");


  //  0ff66402299e48e3821152316232409
  //  http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchv}

 
const getweather = async () => { try { const res = await axios.get( `  https://api.openweathermap.org/data/2.5/weather?q=${searchv}&appid=${apiKey}` );
 setTemp((res.data.main.temp - 273.15).toFixed(2)); 
 setCondition(res.data.weather[0].description);
  setLocation(`${res.data.name} ${res.data.sys.country}`);
  const date = new Date((res.data.dt + res.data.timezone) * 1000); 
  setlocaltime(date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()); 
    sethumidity(res.data.main.humidity);
     setwind(res.data.wind.speed);


    let hours = date.getUTCHours();

     let tempCelsius = res.data.main.temp - 273.15;
     let condition1 = res.data.weather[0].description;

if ((hours >= 6 || hours < 18) && ( tempCelsius<5 ) ){
  seticon(snowy);
}
   else  if((hours >= 6 || hours < 18) && (condition1 === "rain" || condition1 === "heavy rain" || condition1==="cloudy" )){
    seticon(rainnight); 
    }
     else if (hours >= 18 || hours < 6){
  seticon(night);
}
 else if (condition1 === "rain" || condition1 === "heavy rain" ){
  seticon(heavyr);
}

else if (condition1 === "cloudy"){
  seticon(rainc)
}
else if ( tempCelsius < 5 ){
seticon(snow)
}
else if ( tempCelsius < 15 && tempCelsius > 7 ){
  seticon(cloudy)
}
   else if ( tempCelsius > 25 ){
seticon(clear);
}
else if ( tempCelsius < 25 && tempCelsius > 15 ){
 seticon(rb);
}
else {
  seticon(cloudy)
}


    } catch (err) { console.log(err); 
    }
   };

useEffect(() => { getweather(); }, []);

return (
    <>
      <div className="container">
        <div className="input">
          <input
            type="text"
            className="bar"
            placeholder="place"
            value={searchv}
            onChange={(e) => setsearchv(e.target.value)}
          />
          <button className="button" onClick={getweather}>
            search
          </button>
           </div>
        <div className="icon">{icon ? <img src={icon} alt="icon" /> : ""}</div>
        <div className="temp">
          <span>{temp}&deg;c</span>
        </div>
        <span className="con">{condition}</span>
        <div className="locdiv">
          <span className="loc">{location}</span>
        </div>
        <span className="time"> {localtime}</span>
  <span className="hpw">
          <span>
            <WiHumidity className="hum" />
            {humidity}%
          </span>
 <span>
            <FaWind className="wind" />
            {wind}&nbsp;km/h
          </span>
          </span>
        </div>
      
    </>
  );
};

export default App;