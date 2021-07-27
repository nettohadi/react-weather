import './index.css'
import {weatherImages} from "../../utils";


type PropsType = {
    day: 'Today' | 'Sunday' | 'Monday' | 'Tuesday' |
        'Wednesday' | 'Thursday' | 'Friday' | 'Saturday',
    weather: 'Clear Sky' | 'Windy' | 'Thunderstorm' | 'Cloudy' | 'Rainy'
    width?: string,
    height: number,
    date: string,
    icon?: 'normal' | 'small',
    selected?: boolean
}

export default function DailyWeather(props: PropsType) {
    return (
        <div className={`weather-wrapper daily ${props.selected ? 'selected' : ''}`}
             style={{height: props.height, fontSize: (props.height / 10)}}>
            <h2>{`${props.day}, ${props.date}`}</h2>
            <img width='auto'
                 height={!props.icon || props.icon === 'normal' ? '50%' : '30%'}
                 src={weatherImages[props.weather]} alt="weather"/>
            <h3>30 °F</h3>
            {(!props.icon || props.icon === 'normal') && <h5>{props.weather}</h5>}
        </div>
    );
}