//openmap weather apps

const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  locationBtn = inputPart.querySelector("button"),
  inputField = inputPart.querySelector("input"),
  wIcon=document.querySelector(".weather-part img"),
  arrowBack=wrapper.querySelector("header i");
let api;

//enter duymesi ucun
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
 
    requestApi(inputField.value);
   
  }
});
//navigator location aktiv etmek ucun
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});
// onSuccess onError cagirmaq ucun

function onSuccess(position) {
console.log(latitude,longitude)=position.coords;
 api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
fetchData();
}

function onError(error) {
  infoTxt.innerText =error.message;
  infoTxt.classList.add("error");
}
//till onSuccess onError cagirmaq ucun

function requestApi(city) {
  let apiKey = "1a784b1acf1373338bf3ec0f12de2336";
   api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}
function fetchData(){
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}
function weatherDetails(info) {
  infoTxt.classList.replace("pending","error");
  if(info.cod=="404"){
    infoTxt.innerText=`${inputField.value} isn't a valid city name `;
  }
  else{
    const city=info.name;
    const country=info.sys.country;
    const {description , id}=info.weather[0];
    const {feels_like , humidity, temp}=info.main;
   // add image site is openmap weather icons
    if(id==800){
      wIcon.src="./image/sun (1).png";
    }
    else if(id>=300 && id<=321){
      wIcon.src="./image/sun.png";
    }
    else if(id>=500 && id<=531){
      wIcon.src="./image/rain.png";
    }
    else if(id>=600 && id<=622){
      wIcon.src="./image/snowy.png";
    }
    else if(id>=700 && id<=781){
      wIcon.src="./image/cloud (1).png";
    }
    else if(id>800){
      wIcon.src="./image/cloud.png";
    }
    


    wrapper.querySelector(".temp .numb").innerText=Math.floor(temp);
    wrapper.querySelector(".weather").innerText=description;
    wrapper.querySelector(".location span").innerText=`${country},${city}`;
    wrapper.querySelector(".temp .numb-2").innerText=Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText=`${humidity}%`;
   
    infoTxt.classList.remove("pending","error");
    wrapper.classList.add("active");
    console.log(info);
  }
  
}
//remove active class in weather app with arrow left
arrowBack.addEventListener("click",()=>{
  wrapper.classList.remove("active");
})


