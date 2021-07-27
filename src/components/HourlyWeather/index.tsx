import './index.css'
import {mapWeatherImage} from "../../utils";
import {IHourlyWeather} from "../../types";


interface PropsType {
    weather:IHourlyWeather
    height: number,
}

export default function HourlyWeather({weather, height}: PropsType) {
    return (
        <div className='weather-wrapper hourly'
             style={{fontSize: (height / 10)}} data-test='selected-day-hourly-weather'>

            <div style={{fontSize: 13}}>
                {weather?.time}
            </div>
            <div className='hourly-inner-wrapper'>
                <img width='auto'
                     height={25}
                     src={mapWeatherImage(weather?.desc.icon)} alt="weather"/>
                <div>{weather?.desc.long}</div>
            </div>
            <div style={{fontSize: 11}}>
                {weather?.temp.min} °C {(weather?.temp.min !== weather?.temp.max ) ? ' - ' + weather?.temp.max + ' °C' : ''}
            </div>
        </div>
    );
}