import './index.css'
import {mapWeatherImage} from "../../utils";
import {IHourlyWeather} from "../../types";


interface PropsType {
    weather:IHourlyWeather
    width?: string,
    height: number,
}

export default function HourlyWeather({weather, height, width}: PropsType) {
    return (
        <div className='weather-wrapper hourly'
             style={ {fontSize: (height / 10)}}>

            <div><h2>{weather?.time}</h2></div>
            <div style={{display: 'flex', justifyContent:'center', alignItems:'center', gap: 10, fontSize: 12}}>
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