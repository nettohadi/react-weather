import React from 'react';
import App from "../../App";
import {act} from "react-dom/test-utils";
import {
    getDailyMockResponse,
    getHourlyMockResponse,
    getTime,
    mockDailyData,
    mockHourlyData,
    setDailyMockResponse,
    setHourlyMockResponse
} from "../../utils/api";

import {render, unmountComponentAtNode} from "react-dom";
import {format, fromUnixTime} from "date-fns";
import {dayNames, weatherImages} from "../../utils";
import {fireEvent, getByAltText, getByTestId} from "@testing-library/react";
import axios from "axios";
jest.mock('axios');

let root: any;
let mockedHourly: any;
let mockedDaily: any;

beforeEach(() => {
    // setup a DOM element as a render target
    root = document.createElement("div");
    document.body.appendChild(root);

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockImplementation((url:string) => {
        switch (true){
            case /forecast/.test(url):
                //hourly api
                return Promise.resolve({data:getHourlyMockResponse()});
                break;
            case /onecall/.test(url):
                //daily api
                return Promise.resolve({data:getDailyMockResponse()});
                break;
            default:
                return Promise.reject(new Error());
        }
    });
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(root);
    root.remove();
    root = null;
});

it('should render everything correctly on initial load', async () => {

    //Arrange
    setDailyMockResponse(mockDailyData());
    setHourlyMockResponse(mockHourlyData());
    mockedDaily = mockDailyData();
    mockedHourly = mockHourlyData();

    //Act
    await act(async () => {
        render(<App/>, root);
    });

    fullPageAssertion();

});

it('should render the next day weather details when next arrow is clicked', async () => {
    //Arrange
    setDailyMockResponse(mockDailyData());
    setHourlyMockResponse(mockHourlyData());
    mockedDaily = mockDailyData();
    mockedHourly = mockHourlyData();

    //Act
    await act(async () => {
        render(<App/>, root);
    });

    //Assert
    fullPageAssertion(0);

    const arrow = 'next-arrow';

    for (let i = 1; i <= 4; i++) {
        fireEvent.click(getByTestId(root, arrow));
        fullPageAssertion(i);
    }

    fireEvent.click(getByTestId(root, arrow));
    //Should go to the first day when it reaches the end
    fullPageAssertion(0);
});

it('should render the previous day weather details when previous arrow is clicked', async () => {
    //Arrange
    setDailyMockResponse(mockDailyData());
    setHourlyMockResponse(mockHourlyData());
    mockedDaily = mockDailyData();
    mockedHourly = mockHourlyData();

    //Act
    await act(async () => {
        render(<App/>, root);
    });

    //Assert
    fullPageAssertion(0);

    const arrow = 'prev-arrow';

    fireEvent.click(getByTestId(root, arrow));
    //Should go to the last day when it reaches the first
    fullPageAssertion(4);

    for (let i = 3; i >= 0; i--) {
        fireEvent.click(getByTestId(root, arrow));
        fullPageAssertion(i);
    }


});

it('should render the correct weather details when particular day is clicked', async () => {
    //Arrange
    setDailyMockResponse(mockDailyData());
    setHourlyMockResponse(mockHourlyData());
    mockedDaily = mockDailyData();
    mockedHourly = mockHourlyData();

    //Act
    await act(async () => {
        render(<App/>, root);
    });

    //Assert
    fullPageAssertion(0);

    for (let i = 0; i <= 4; i++) {
        fireEvent.click(getByTestId(root, `weather-days-${i}`));
        fullPageAssertion(i);
    }
});

it('should display 404 error if city is not found', async () => {
    //Arrange
    setDailyMockResponse(mockDailyData());
    //return 404 response
    setHourlyMockResponse({cod:'404'});

    //Act
    await act(async () => {
        render(<App/>, root);
    });

    //Assert
    expect(root.querySelector("[data-testid='error-500']")).toBeNull();
    expect(getByTestId(root, 'error-404')).toBeDefined();
});

it('should display error message if something went wrong', async () => {
    //Arrange
    //return 500 response
    setHourlyMockResponse({cod:'500'});

    //Act
    await act(async () => {
        render(<App/>, root);
    });

    //Assert
    expect(root.querySelector("[data-testid='error-404']")).toBeNull();
    expect(getByTestId(root, 'error-500')).toBeDefined();
});

it('should fetch again when user submit a new city', async () => {
    //Arrange
    setDailyMockResponse(mockDailyData());
    mockedDaily = mockDailyData();
    setHourlyMockResponse(mockHourlyData('foo city'));
    mockedHourly = mockHourlyData('foo city');

    //Act
    await act(async () => {
        render(<App/>, root);
    });

    //Assert
    fullPageAssertion();

    setHourlyMockResponse(mockHourlyData('bar city'));
    mockedHourly = mockHourlyData('bar city');
    //submit search input
    await act(async () => {
        fireEvent.submit(getByTestId(root, 'input-search-city'));
    });
    fullPageAssertion();

    setHourlyMockResponse(mockHourlyData('foo city'));
    mockedHourly = mockHourlyData('foo city');
    //click search button
    await act(async () => {
        fireEvent.click(getByTestId(root, 'button-search-city'));
    });
    fullPageAssertion();

});


function fullPageAssertion(selectedDayIndex: number = 0) {
    //1. Assert City Name
    expect(getByTestId(root, 'city-name').textContent).toBe(mockedHourly.city.name);

    //2. Assert the list of days
    let dom: HTMLElement;
    let expected: any;

    dom = getByTestId(root, 'days-box');
    mockedDaily.daily.forEach((day: any, index: number) => {
        expected = dayNames[fromUnixTime(day.dt).getDay()].slice(0, 3);
        expect(dom.childNodes[index].textContent).toBe(expected);
    });

    //Select day by index
    const selectedDay = mockedDaily.daily[selectedDayIndex];

    //3. Assert the selected day name & full date
    const dayName = dayNames[fromUnixTime(selectedDay.dt).getDay()];
    const fullDate = format(fromUnixTime(selectedDay.dt), 'dd MMM yyyy');
    expected = `${dayName}, ${fullDate}`;

    dom = getByTestId(root, 'selected-day-date');
    expect(dom.textContent).toBe(expected);

    //4. Assert weather icon
    const icon = getByAltText(root, 'selected-day-weather-icon') as HTMLImageElement;
    expected = weatherImages[selectedDay.weather[0].icon];
    expect(icon.src).toContain(expected);

    //5. Assert selected day weather details
    dom = getByTestId(root, 'selected-day-weather-details');
    // check humidity
    expect(dom.innerHTML).toContain(selectedDay.humidity);
    // check wind speed
    expect(dom.innerHTML).toContain(selectedDay.wind_speed);
    // check min temp
    expect(dom.innerHTML).toContain(selectedDay.temp.min);
    // check max temp
    expect(dom.innerHTML).toContain(selectedDay.temp.max);

    //6. Assert selected day weather description
    dom = getByTestId(root, 'selected-day-weather-desc');
    expect(dom.textContent).toBe(selectedDay.weather[0].description);

    //7. Assert hourly data
    const doms = root.querySelectorAll("[data-test='selected-day-hourly-weather']");
    mockedHourly.list
        .filter((hour: any) => isTheSameDay(hour.dt, selectedDay.dt))
        .forEach((hour: any, index: number) => {
            const currentRow = doms[index];
            //check time
            expect(currentRow.innerHTML).toContain(`${getTime(fromUnixTime(hour.dt))}`);
            //check weather description
            expect(currentRow.innerHTML).toContain(hour.weather[0].description);
            //check min temp
            expect(currentRow.innerHTML).toContain(hour.main.temp_min);
            //check max temp
            expect(currentRow.innerHTML).toContain(hour.main.temp_max);
            //check weather icon
            const weatherIcon = currentRow.querySelector('img');
            expect(weatherIcon.src).toContain(weatherImages[hour.weather[0].icon]);
        });
}

function isTheSameDay(unixdate1: number, unixdate2: number) {
    return fromUnixTime(unixdate1).getDay() === fromUnixTime(unixdate2).getDay();
}


export {};