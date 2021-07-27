import './index.css';
import Weather from "../../components/Weather";
import HourlyWeather from "../../components/HourlyWeather";
import rightArrow from '../../assets/images/right-arrow.png';
import leftArrow from '../../assets/images/left-arrow.png';
import {FormEvent, useEffect, useRef, useState} from "react";
import {fetchAll, mockAllFetch} from "../../utils/api";
import {IWeatherData} from "../../types";
import {repeat} from "../../utils";
import {mockWeatherData} from "../../utils/apiMock";

const initialWeatherData = {
    city: '',
    country: '',
    population: 0,
    timezone: '',
    daily: []
};

export default function Home() {
    const [dayIndex, setDayIndex] = useState(0);
    const [weatherData, setWeatherData] = useState<IWeatherData>(initialWeatherData);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const searchInput = useRef<HTMLInputElement | null>();

    const days = weatherData.daily.map(d => d.day);

    function selectDay(number: number) {
        //selecting day should go in a loop
        if ((dayIndex + number) < 0) {
            //first index
            setDayIndex(days.length - 1);
        } else if ((dayIndex + number) > days.length - 1) {
            //last index
            setDayIndex(0);
        } else {
            setDayIndex(dayIndex + number);
        }
    }

    useEffect(() => {
        mockAllFetch(true);
        fetchWeatherData();
    }, []);

    useEffect(() => console.log('rerender'));

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        fetchWeatherData(searchInput.current?.value || '');
    }

    function fetchWeatherData(cityName = '') {
        setLoading(true);
        setWeatherData(initialWeatherData);
        setError('');
        fetchAll(cityName)
            .then(data => {
                console.log({data})
                setWeatherData(data);
            })
            .catch(e => {
                setWeatherData(initialWeatherData);
                setError(e.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    function fetchWeatherDataMock(cityName = ''){
        setLoading(true);
        setWeatherData(mockWeatherData());
        setLoading(false);
    }

    function setWeatherBackground() {
        return 'weather-' + weatherData.daily[dayIndex]?.desc.icon.slice(0, 2);
    }

    function setLoadingStatus() {
        return isLoading ? 'loading' : '';
    }

    function WeatherDays() {
        return (
            <div className='days-box'>
                {days.map((day, index) => (
                    <div key={index} className={days[dayIndex] === day ? 'selected' : ''}
                         onClick={() => setDayIndex(index)}>
                        {day.slice(0, 3)}
                    </div>
                ))}
                {repeat(5, 5).map((i) => <div key={i} className="loading-skeleton day"></div>)}
            </div>
        );
    }

    function PrevArrow() {
        return <img src={leftArrow} width={30} alt="arrow" className='arrow'
                    onClick={() => selectDay(-1)}/>;
    }

    function NextArrow() {
        return <img src={rightArrow} width={30} alt="arrow" className='arrow'
                    onClick={() => selectDay(1)}/>;
    }

    const ifHourlyDataIsEmpty = weatherData?.daily[dayIndex]?.hourly?.length === 0 && !isLoading;

    function SearchCityForm() {
        return (
            <div className='search-city'>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                            placeholder='Type city name' defaultValue={searchInput.current?.value}
                           ref={(ref) => searchInput.current = ref}/>
                    <button onClick={handleSubmit} className='search-button'>
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
        );
    }

    function Forecast(){
        return (
            <div>
                <div className='forecast day'>
                    <div>
                        <h2>{weatherData.city}</h2>
                        <div className="loading-skeleton city"></div>
                    </div>
                    <WeatherDays/>
                    <div className='forecast-selected-day-wrapper'>
                        <PrevArrow/>
                        <div className='forecast-inner' style={{gap: 50}}>
                            {weatherData.daily.map((item, index) => {
                                return (
                                    <Weather visible={days[dayIndex] === item.day}
                                             key={index}
                                             weather={item}
                                             height={200}/>
                                );
                            })}
                            <div className="loading-skeleton selected-day"></div>
                        </div>
                        <NextArrow/>
                    </div>

                </div>
                <h5 style={{textAlign: 'center'}}>Hourly</h5>
                <div className='forecast hourly'>
                    <div className='forecast-inner hourly' style={{maxWidth: 700}}>
                        {
                            weatherData.daily[dayIndex]?.hourly.map((h, index) => {
                                return (
                                    <div className={`hourly-row`} key={h.id}>
                                        <HourlyWeather weather={h} height={100}/>
                                    </div>
                                );
                            })
                        }
                        {ifHourlyDataIsEmpty && <h2>No Data</h2>}
                        {repeat(5, 5).map((i) => <div key={i}
                        className="loading-skeleton selected-hour"></div>)}
                    </div>
                </div>
            </div>
        );
    }

    function ErrorMessage({errorCode}:any){
        console.log({errorCode});
        switch (errorCode){
            case '404':
                return (
                    <div className='error-wrapper'>
                        <h1>City Is Not Found</h1>
                        <h3>It Might Be A Typo or The City Does Not Exist</h3>
                    </div>
                );
            default:
                return (
                    <div className='error-wrapper'>
                        <h1>Ooops Something Went Wrong</h1>
                    </div>
                );
        }
    }


    return (
        <div className={`wrapper ${setLoadingStatus()} ${setWeatherBackground()}`}>
            <SearchCityForm/>
            {(!error ) && <Forecast/>}
            {error && <ErrorMessage errorCode={error}/>}
        </div>
    );
}