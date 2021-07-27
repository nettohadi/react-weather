import sunny from '../assets/images/sunny.png';
import windy from '../assets/images/windy.png';
import thunderStorm from '../assets/images/thunderstorm.png';
import fewClouds from '../assets/images/cloudy-day.png';
import rainy from '../assets/images/rainy.png';

/**
 Images is taken from https://www.flaticon.com/
 Images created by fjstudio
 <div>Icons made by <a href="https://www.flaticon.com/authors/fjstudio" title="fjstudio">fjstudio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
 */

export const weatherImages: any = {
    '01d': sunny,
    '02d': fewClouds,
    '03d': fewClouds,
    '03n': fewClouds,
    '04d': fewClouds,
    '04n': fewClouds,
    '50d': windy,
    '11d': thunderStorm,
    '09d': rainy,
    '10d': rainy,
    '10n': rainy,
}

export function mapWeatherImage(iconCodeFromApi: string = ''): string {
    if (weatherImages.hasOwnProperty(iconCodeFromApi)) {
        return weatherImages[iconCodeFromApi];
    } else {
        return weatherImages['01d'];
    }
}

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/*
* http://history.openweathermap.org/data/2.5/history/city?
* lat=-8.650979&lon=116.324944&type=hour&start=1627147310&end=1627147310&appid=6d875ebff1f24739c03d55ca8d6dc535&units=metric
*
*
* https://api.openweathermap.org/data/2.5/onecall?lat=-8.650979&lon=116.324944&appid=6d875ebff1f24739c03d55ca8d6dc535&units=metric
*
* https://api.openweathermap.org/data/2.5/forecast?q=mataram&appid=6d875ebff1f24739c03d55ca8d6dc535&units=metric
* */

export function repeat(count = 1, start = 1) {
    const dummies: number[] = [];
    for (let i = start || 1; i <= count; i++) {
        dummies.push(i);
    }

    return dummies;
}