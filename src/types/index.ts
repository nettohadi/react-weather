export interface IWeatherData{
    city:string,
    country:string,
    population:number,
    timezone:string,
    daily:IDailyWeather[]
}

interface IWeather {
    id: number,
    desc: IWeatherDesc
    wind_speed: number,
    humidity: number

}

export interface IDailyWeather extends IWeather {
    day: string,
    date: Date,
    temp: {
        day: number,
        night: number,
        eve: number,
        morn: number,
        min: number,
        max: number
    }
    hourly: IHourlyWeather[]
}

export interface IHourlyWeather extends IWeather {
    time: string
    temp: {
        min:number,
        max:number
    }
}

export interface IWeatherDesc {
    id: number,
    short: string,
    long: string,
    icon: string
}

export const clearSky: IWeatherDesc = {
    id: 1,
    short: 'Clear Sky',
    long: 'Clear Sky',
    icon: '1'
}

export const thunderstorm: IWeatherDesc = {
    id: 2,
    short: 'Thunderstorm',
    long: 'Thunderstorm',
    icon: '2'
}

export const rainy:IWeatherDesc = {
    id: 3,
    short: 'Rainy',
    long: 'Rainy',
    icon: '3'
}

export const windy:IWeatherDesc = {
    id: 4,
    short: 'Windy',
    long: 'Windy',
    icon: '4'
}

export const cloudy:IWeatherDesc = {
    id: 5,
    short: 'Cloudy',
    long: 'Cloudy',
    icon: '5'
}


