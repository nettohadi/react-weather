import {clearSky, cloudy, IDailyWeather, IWeatherData, rainy, thunderstorm, windy} from "../types";

function getDailyWeathers():IDailyWeather[]{
    return [
        {
            id: 1,
            day: "Monday",
            date: new Date(2021,7,25),
            desc: clearSky,
            humidity: 20,
            wind_speed: 30,
            temp: {
                day: 20,
                eve: 19,
                min: 20,
                max: 30,
                morn: 19,
                night: 19
            },
            hourly: [
                {
                    id:1,
                    time: '00.00',
                    temp:{min:19, max:25},
                    desc: clearSky,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:2,
                    time: '03.00',
                    temp:{min:19, max:25},
                    desc: clearSky,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:3,
                    time: '06.00',
                    temp:{min:19, max:25},
                    desc: clearSky,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:4,
                    time: '09.00',
                    temp:{min:19, max:25},
                    desc: clearSky,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:5,
                    time: '12.00',
                    temp:{min:19, max:25},
                    desc: clearSky,
                    wind_speed: 20,
                    humidity: 20
                }
            ]
        },
        {
            id: 2,
            day: "Tuesday",
            date: new Date(2021,7,26),
            desc: thunderstorm,
            humidity: 20,
            wind_speed: 30,
            temp: {
                day: 20,
                eve: 19,
                min: 20,
                max: 30,
                morn: 19,
                night: 19

            },
            hourly: [
                {
                    id:1,
                    time: '00.00',
                    temp:{min:19, max:25},
                    desc: thunderstorm,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:2,
                    time: '03.00',
                    temp:{min:19, max:25},
                    desc: thunderstorm,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:3,
                    time: '06.00',
                    temp:{min:19, max:25},
                    desc: thunderstorm,
                    wind_speed: 20,
                    humidity: 20
                }
            ]
        },
        {
            id: 3,
            day: "Wednesday",
            date: new Date(2021,7,27),
            desc: rainy,
            humidity: 20,
            wind_speed: 30,
            temp: {
                day: 20,
                eve: 19,
                min: 20,
                max: 30,
                morn: 19,
                night: 19

            },
            hourly: [
                {
                    id:1,
                    time: '00.00',
                    temp:{min:19, max:25},
                    desc: clearSky,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:2,
                    time: '03.00',
                    temp:{min:19, max:25},
                    desc: cloudy,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:3,
                    time: '06.00',
                    temp:{min:19, max:25},
                    desc: rainy,
                    wind_speed: 20,
                    humidity: 20
                }
            ]
        },
        {
            id: 4,
            day: "Thursday",
            date: new Date(2021,7,28),
            desc: windy,
            humidity: 20,
            wind_speed: 30,
            temp: {
                day: 20,
                eve: 19,
                min: 20,
                max: 30,
                morn: 19,
                night: 19

            },
            hourly: [
                {
                    id:1,
                    time: '00.00',
                    temp:{min:19, max:25},
                    desc: clearSky,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:2,
                    time: '03.00',
                    temp:{min:19, max:25},
                    desc: cloudy,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:3,
                    time: '06.00',
                    temp:{min:19, max:25},
                    desc: rainy,
                    wind_speed: 20,
                    humidity: 20
                }
            ]
        },
        {
            id: 5,
            day: "Friday",
            date: new Date(2021,7,29),
            desc: cloudy,
            humidity: 20,
            wind_speed: 30,
            temp: {
                day: 20,
                eve: 19,
                min: 20,
                max: 30,
                morn: 19,
                night: 19

            },
            hourly: [
                {
                    id:1,
                    time: '00.00',
                    temp:{min:19, max:25},
                    desc: clearSky,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:2,
                    time: '03.00',
                    temp:{min:19, max:25},
                    desc: cloudy,
                    wind_speed: 20,
                    humidity: 20
                },
                {
                    id:3,
                    time: '06.00',
                    temp:{min:19, max:25},
                    desc: rainy,
                    wind_speed: 20,
                    humidity: 20
                }
            ]
        },
    ];
}

export function mockWeatherData():IWeatherData{
    return {
        city: 'Mataram',
        country: 'ID',
        population: 5000,
        timezone: 'Asia / Makassar',
        daily: getDailyWeathers()
    };
}

