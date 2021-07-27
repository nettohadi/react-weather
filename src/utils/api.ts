import {IDailyWeather, IHourlyWeather, IWeatherData} from '../types';
import {dayNames} from './index';
import fromUnixTime from 'date-fns/fromUnixTime';
import {getUnixTime} from 'date-fns';
import axios from "axios";


const appId = '6d875ebff1f24739c03d55ca8d6dc535';
const units = 'metric';

export async function fetchDaily(lat: number = -8.650979, long: number = 116.324944) {
    const dailyEndpoint =
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${appId}&units=${units}`;
    try {
        const response = await axios.get(dailyEndpoint);
        return response.data;
    } catch (e) {
        return e.response.data;
    }

}

export async function fetchHourly(cityName: string = 'jakarta') {
    const hourlyEndpoint =
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${appId}&units=${units}`;

    try {
        const response = await axios.get(hourlyEndpoint);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
}

export async function fetchAll(cityName: string) {
    cityName = cityName || 'yogyakarta';
    const weatherData: IWeatherData = {
        city: '',
        country: '',
        population: 0,
        timezone: '',
        daily: []
    };

    const dailyWeathers: IDailyWeather[] = [];

    const hourly = await fetchHourly(cityName);
    if (hourly.cod !== '200') throw new Error(hourly.cod);

    const daily = await fetchDaily(hourly.city.coord.lat, hourly.city.coord.lon);

    weatherData.city = hourly?.city?.name;
    weatherData.population = hourly?.city?.population;
    weatherData.country = hourly?.city?.country;
    weatherData.timezone = daily?.timezone;

    daily.daily.map((day: any, index: number) => {
        const weather = day.weather[0] || null;
        const dailyDate = fromUnixTime(day.dt);

        const hourlyData: IHourlyWeather[] = [];
        hourly.list.map((hour: any, index: number) => {
            const hourlyWeather = hour.weather[0] || null;
            const hourlyDate = fromUnixTime(hour.dt);

            if (hourlyDate.getDay() === dailyDate.getDay()) {
                hourlyData.push({
                    id: index,
                    desc: {
                        id: hourlyWeather.id,
                        short: hourlyWeather.main,
                        long: hourlyWeather.description,
                        icon: hourlyWeather.icon
                    },
                    wind_speed: 0,
                    humidity: 0,
                    temp: {
                        min: hour.main?.temp_min || 0,
                        max: hour.main?.temp_max || 0
                    },
                    time: getTime(hourlyDate)
                });
            }
        });

        dailyWeathers.push(
            {
                id: index,
                desc: {
                    id: weather.id,
                    short: weather.main,
                    long: weather.description,
                    icon: weather.icon
                },
                date: dailyDate,
                day: dayNames[dailyDate.getDay()],
                hourly: hourlyData,
                humidity: day.humidity || 0,
                wind_speed: day.wind_speed || 0,
                temp: {
                    day: 0,
                    eve: 0,
                    min: day.temp?.min || 0,
                    max: day.temp?.max || 0,
                    morn: 0,
                    night: 0
                }

            });
    });

    weatherData.daily = dailyWeathers.slice(0, 5);

    return weatherData;


}

const datesMock = [
    getUnixTime(new Date(2021, 6, 27, 11, 0, 0)),
    getUnixTime(new Date(2021, 6, 28, 12, 0, 0)),
    getUnixTime(new Date(2021, 6, 29, 13, 0, 0)),
    getUnixTime(new Date(2021, 6, 30, 14, 0, 0)),
    getUnixTime(new Date(2021, 6, 31, 15, 0, 0)),
]

const weathersMock = [
    {
        id: '1',
        main: 'Clear Sky',
        description: 'Clear Sky',
        icon: '01d'
    },
    {
        id: '1',
        main: 'Thunderstorm',
        description: 'Thunderstorm',
        icon: '11d'
    },
    {
        id: '1',
        main: 'Rain',
        description: 'Rain',
        icon: '09d'
    },
    {
        id: '1',
        main: 'Few Clouds',
        description: 'Few Clouds',
        icon: '03d'
    },
    {
        id: '',
        main: 'Windy',
        description: 'Windy',
        icon: '50d'
    }
];

export function mockHourlyData(cityName='mataram') {
    return {
        city: {
            name: cityName,
            population: 10000,
            country: 'ID',
            coord: {
                lat: 0,
                lon: 0
            },
        },
        timezone: 'Asia/Makassar',
        cod: '200',
        list: [
            {
                dt: datesMock[0],
                weather: [weathersMock[0]],
                main: {
                    temp_min: 19,
                    temp_max: 20
                }
            },
            {
                dt: datesMock[1],
                weather: [weathersMock[1]],
                main: {
                    temp_min: 19,
                    temp_max: 20
                }
            },
            {
                dt: datesMock[2],
                weather: [weathersMock[2]],
                main: {
                    temp_min: 19,
                    temp_max: 20
                }
            },
            {
                dt: datesMock[3],
                weather: [weathersMock[3]],
                main: {
                    temp_min: 19,
                    temp_max: 20
                }
            },
            {
                dt: datesMock[4],
                weather: [weathersMock[4]],
                main: {
                    temp_min: 19,
                    temp_max: 20
                }
            }
        ]
    }
}

export function mockDailyData() {
    return {
        daily: [
            {
                dt: datesMock[0],
                weather: [weathersMock[0]],
                humidity: 40,
                wind_speed: 50,
                temp: {
                    min: 19,
                    max: 20
                }
            },
            {
                dt: datesMock[1],
                weather: [weathersMock[1]],
                humidity: 50,
                wind_speed: 60,
                temp: {
                    min: 19,
                    max: 20
                }
            },
            {
                dt: datesMock[2],
                weather: [weathersMock[2]],
                humidity: 60,
                wind_speed: 70,
                temp: {
                    min: 19,
                    max: 20
                }
            },
            {
                dt: datesMock[3],
                weather: [weathersMock[3]],
                humidity: 70,
                wind_speed: 80,
                temp: {
                    min: 19,
                    max: 20
                }
            },
            {
                dt: datesMock[4],
                weather: [weathersMock[4]],
                humidity: 80,
                wind_speed: 90,
                temp: {
                    min: 19,
                    max: 20
                }
            }
        ]
    }
}

export function getTime(date: Date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

let dailyMockResponse:any;
let hourlyMockResponse:any;

export function setDailyMockResponse(mock:any){
    dailyMockResponse = mock;
}

export function setHourlyMockResponse(mock:any){
    hourlyMockResponse = mock;
}

export function getDailyMockResponse(){
    return dailyMockResponse;
}

export function getHourlyMockResponse(){
    return hourlyMockResponse;
}