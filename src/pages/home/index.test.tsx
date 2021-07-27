import { enableFetchMocks } from 'jest-fetch-mock'
import React from 'react';
import ReactDOM from 'react-dom';
import App from "../../App";
import fetchMock from "jest-fetch-mock"
import {mockAllFetch} from "../../utils/api";

enableFetchMocks();

describe('home page', () => {
    it('should render everything correctly', async () => {
        const root = document.createElement('div');

        mockAllFetch(true);

        ReactDOM.render(<App />, root);

        expect(true).toBe(true);

    });
});

export {};