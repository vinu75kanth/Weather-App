const DoIt=document.getElementById("DoIt");
const cityHolder=document.getElementById("inputClass");
const key=`43d8c71f92fc7561c88ff7ff11a588f8`;
const box=document.getElementById("box");

DoIt.addEventListener("submit", async event =>{
    event.preventDefault();
    const city=cityHolder.value;
    if(city){
        try{
            const data = await getData(city);
            displayData(data);
        }
        catch(error){
            errorMsg(error);
        }
    }
    else{
        errorMsg("Please Enter a City");
    }
});

async function getData(city){
    const firstData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`);
    if(!firstData.ok){
        throw new Error("could not fetch weather data");
    }
    const another = await firstData.json();
    const h=another[0];
    const Data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${h.lat}&lon=${h.lon}&appid=${key}`);
    const rData= await Data.json();
    return rData;

}

function displayData(data){
    box.textContent="";
    const a=document.createElement("h1");
    const b=document.createElement("h1");
    const c=document.createElement("p");
    const d=document.createElement("p");
    const e=document.createElement("p");

    a.textContent=`${data.name}`;
    a.classList.add("cityClass");
    b.textContent=`${(data.main.temp - 272).toFixed(1)} C`;
    b.classList.add("cityClass");
    c.textContent = `Humidity : ${data.main.humidity} %`;
    d.textContent=`${data.weather[0].description}`;
    e.textContent=getEmoji(data.weather[0].id);
    e.classList.add("emojiClass");

    box.appendChild(a);
    box.appendChild(b);
    box.appendChild(c);
    box.appendChild(d);
    box.appendChild(e);
}

function errorMsg(Msg){
    const temp = document.createElement("p");
    temp.textContent=Msg;
    box.textContent="";
    box.appendChild(temp);
}

function getEmoji(id){
    switch (true){
        case (id >=200 && id<300):
            return "🌧️";
        case (id >=300 && id<400):
            return "🌧️";
        case (id >=500 && id<600):
            return "🌧️";
        case (id >=600 && id<700):
            return "🌧️";
        case (id >=700 && id<800):
            return "❄️";
        case (id===800):
            return "☀️";
        case (id > 800 && id<810):
            return "☁️";
        default:
            return "❓";
    }
}