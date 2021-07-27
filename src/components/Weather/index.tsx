import './index.css'
import {mapWeatherImage} from "../../utils";
import {IDailyWeather} from "../../types";
import {format} from "date-fns";


interface PropsType {
    weather: IDailyWeather
    width?: string,
    height: number,
    visible?: boolean,
}

export default function Weather({weather, height, width, visible}: PropsType) {
    const dateString = format(weather.date,'dd MMM yyyy');
    return (
        <div className='weather-wrapper'
             style={{height: height, fontSize: (height / 10), display: (visible ? 'flex' : 'none')}}>
            <h2 data-testid='selected-day-date'>{`${weather?.day}, ${dateString}`}</h2>
            <img width='auto'
                 data-testid='selected-day-icon'
                 height={'40%'}
                 src={mapWeatherImage(weather?.desc.icon)} alt="selected-day-weather-icon"/>
            <h5 data-testid='selected-day-weather-details'>
                <i className="fas fa-tint"></i>
                {weather?.humidity}%
                <i className="fas fa-wind"></i>
                {weather?.wind_speed} mph
                <i className="fas fa-thermometer-quarter"></i>
                {weather?.temp.min} ° {(weather?.temp.min !== weather?.temp.max) ? ' - ' + weather?.temp.max + ' °' : ''}
            </h5>
            <h5 data-testid='selected-day-weather-desc'>{weather?.desc.long}</h5>
        </div>
    );
}