import './index.css'
import {mapWeatherImage} from "../../utils";
import {IDailyWeather} from "../../types";


interface PropsType {
    weather: IDailyWeather
    width?: string,
    height: number,
    visible?: boolean,
}

export default function Weather({weather, height, width, visible}: PropsType) {
    return (
        <div className='weather-wrapper'
             style={{height: height, fontSize: (height / 10), display: (visible ? 'flex' : 'none')}}>
            <h2>{`${weather?.day}, ${weather.date.getDate()}/${weather.date.getMonth() + 1}`}</h2>
            {/*<h5>{date}</h5>*/}
            <img width='auto'
                 height={'40%'}
                 src={mapWeatherImage(weather?.desc.icon)} alt="weather"/>
            <h5>
                <i className="fas fa-tint"></i>
                {weather?.humidity}%
                <i className="fas fa-wind"></i>
                {weather?.wind_speed} mph
                <i className="fas fa-thermometer-quarter"></i>
                {weather?.temp.min} ° {(weather?.temp.min !== weather?.temp.max) ? ' - ' + weather?.temp.max + ' °' : ''}
            </h5>
            <h5>{weather?.desc.long}</h5>
        </div>
    );
}