import React, { useState } from 'react'
function Weather() {
    const today = new Date();
    let date_now = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate());
    const [errormsg, seterrormsg] = useState();
    const [input, setinput] = useState("");
    const [error, seterror] = useState(false);
    const [results, setresult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [weather, setweather] = useState({});
    const [date , setdate] = useState(date_now);
    const api = {
        url : 'https://api.openweathermap.org/data/2.5/',
        key : process.env.REACT_APP_API_KEY
    }
    const url_icon = "https://openweathermap.org/img/w/";

    const hundlchange = (e)=>{
        setinput(e.target.value);
    }

    const CheckValue = ()=>{
        if (input === "") {
            seterror(true)
            setresult(false)
            seterrormsg("Value of input is empty")
        }
        
        if(input !== ""){
            getWeatherData();
        }
    }

    const getWeatherData = () =>{
            setIsLoading(true)
            seterror(false)
            setresult(false)
            fetch(`${api.url}weather?q=${input}&appid=${api.key}`).then((res)=> {
                if(!res.ok){
                    throw Error("failed to fetch data")
                }
                return res.json();
            }).then((data)=> {
                setresult(true)
                setweather(data)
                console.log(data);
                setinput("")
                setIsLoading(false)
            }).catch((err)=>{
                setIsLoading(false)
                seterror(true)
                seterrormsg(err.message)
            })
    }
    return (
    <div className='main-div container  text-center d-flex flex-column justify-content-center text-white'>
        <div className='row content'>
            <h1 className='pt-2'><span >Weather</span> App</h1>
            <p className='time'>{date}</p>
            <div className='col-10 mx-auto'>
                <div className='row d-flex justify-content-between'>
                    <div className='col-sm-9 px-0 px-sm-2'>
                        <input 
                            value={input}
                            onChange={hundlchange}
                            className='form-control'
                            placeholder='Entre City'
                            type="text"
                        />
                    </div>
                    <button onClick={CheckValue} className='col-sm-3 btn btn-light col-12 mt-2 mt-sm-0'>Search</button>
                </div>
            </div>
        </div>
        
        {
                error && (<p className='error col-8 alert mx-auto'>{errormsg}</p>)
            }   
            {
                results && (<div className='weather-box  col-8 mx-auto rounded p-3 mt-4 mt-md-0'>
                <h2 className='pt-2'>{weather.name}, <span>{weather.sys.country}</span></h2>
                <div className='icon mt-3'>
                    <img src={url_icon + weather.weather[0].icon + ".png"} alt=''/>
                </div>
                <div className='info mt-3'>
                    <p className='temp mb-2'>Temp :{Math.round(weather.main.temp -273.15)}°C </p>
                    <p className='weather mb-2'>Weather : {weather.weather[0].main}</p>
                    <p className='temp-range'>Temp-Range :{Math.round(weather.main.temp_max   - 273.15)}°C /{Math.round(weather.main.temp_min   - 273.15)} °C </p>
                </div>
                </div>)
            }
            {isLoading && <h3 className='loading mx-auto'>Loading</h3>}
    </div>
    )
}
export default Weather