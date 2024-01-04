const apiKey = '53771772d1784fca0083f1ddc7ed5414'; 
let citylist=[];

function getWeather() { 
    const cityInput = document.getElementById('searchinput').value; 
    if (cityInput.trim() === '') { 
        alert('Please enter a city name.'); return;
     }const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`; 
     fetch(apiURL) .then(response => response.json()) .then(data => displayWeather(data)) .catch(error => { 
        alert('Error fetching weather data. Please try again later.'); 
        console.error('Error:',error); 
    }); 
    
}
function displayWeather(data) {
    const weatherDisplay = document.getElementById("weatherdisplay");
    if (data.cod !== 200) { 
        alert('City not found. Please check the city name and try again.') ;
        return; 
    }
    const city = data.name;
         const country = data.sys.country; 
        const description = data.weather[0].description; 
        const temperature = data.main.temp; 
        const humidity = data.main.humidity;
         const iconCode = data.weather[0].icon;
         const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`; 

         const obj ={
            cityName:city,
            countryName: country,
            citydescription :description,
            citytemperature : temperature,
            cityhumidity: humidity,
            cityiconURL :iconURL
         };
         let citySearch = true;
         const cityInput = document.getElementById('searchinput').value
         citylist.map(function(e){
            console.log(cityInput.toUpperCase(), e.cityName.toUpperCase());
            if(cityInput.toUpperCase() === e.cityName.toUpperCase()){
                citySearch=false;
                return;
            }
         });
         console.log(citySearch);
         if(citySearch){
            document.getElementById('searchinput').value="";
            citylist.push(obj);
            citylist.sort(function(a, b){return a.citytemperature - b.citytemperature});
            displayWeatherhtml();
         }
         
         else{
            document.getElementById('searchinput').value="";
            return;
         }
    //      const cartHTML =`
    //      <div id="cart">
    //         <div id="leftcontainer">
    //             <h4 id="temp"> ${temperature}°</h4>
    //             <div id="cityName">
    //                 <div>
    //                 <p id="lowHight">Humidity: ${humidity}%</p>
    //                 </div>
    //                 <div>
    //                 <p id="cityname">${city},
    //                 ${country}</p>
    //                 </div>
    //             </div>
    //         </div>
    //         <div id="rightcontainer">
    //             <img src="${iconURL}" alt="${iconCode}" />
    //             <div><p id="weather">${description}</p></div>
    //         </div>
    //   </div>`;
    //   weatherDisplay.innerHTML=(cartHTML);
 }

function  displayWeatherhtml(){
    const weatherDisplay = document.getElementById("weatherdisplay");
    document.getElementById("weatherdisplay").innerHTML="";
    for (let i =0; i<citylist.length;i++){
        
      const cartdiv= document.createElement('div');
      cartdiv.id="cart";
      weatherDisplay.appendChild(cartdiv);
     const leftcontainer = document.createElement('div');
     leftcontainer.id="leftcontainer";
     cartdiv.appendChild(leftcontainer);
     const temperatureh4 = document.createElement('h4');
     temperatureh4.id="temp";
     temperatureh4.innerText=`${citylist[i].citytemperature}°`
     leftcontainer.appendChild(temperatureh4);
     const citynameDiv = document.createElement('div');
     citynameDiv.id="cityName";
     leftcontainer.appendChild(citynameDiv);
     const tempDiv1= document.createElement('div');
     const lowhightP= document.createElement('p');
     lowhightP.id="lowHight";
     lowhightP.innerText=`Humidity: ${citylist[i].cityhumidity}%`;
     citynameDiv.appendChild(tempDiv1);
     tempDiv1.appendChild(lowhightP);
     const tempDiv2 = document.createElement('div');
     const citynameP= document.createElement('p');
     citynameP.id="cityname";
     citynameP.innerText=`${citylist[i].cityName},${citylist[i].countryName}`;
     citynameDiv.appendChild(tempDiv2);
     tempDiv2.appendChild(citynameP);
     
     const rightcontainerDiv = document.createElement('div');
     rightcontainerDiv.id="rightcontainer";
     cartdiv.appendChild(rightcontainerDiv);
     const imgtag = document.createElement('img');
     imgtag.src=`${citylist[i].cityiconURL}`;
     rightcontainerDiv.appendChild(imgtag);
     const tempDiv3 = document.createElement('div');
     const weatherP= document.createElement('p');
     weatherP.id="weather";
     weatherP.innerText=`${citylist[i].citydescription}`;
     rightcontainerDiv.appendChild(tempDiv3);
     tempDiv3.appendChild(weatherP);
    }
}