import React from 'react';
import { Provider } from 'react-redux';
import KidneyCalculator from './kidney-calculator';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import expect from "expect";
import { mount } from 'enzyme';

describe('Kidney Component testing', () => {

    let middlewares,
        mockStore,
        storeMockedData = [];

    beforeEach(() => {
        middlewares = [thunk];
        mockStore = configureMockStore(middlewares);
        storeMockedData = {
            kidneyData: [
                {eGFR: 50, atDate: '2018/10/31'},
                {eGFR: 70, atDate: '2018/10/20'},
                {eGFR: 70, atDate: '2018/09/20'}
            ],
            collapseKidneyTables: false
        };
    });

    it('Shoud be rendered the kidney table container', ()=>{
        const store = mockStore(storeMockedData);
        const wrapper = mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const tableContainer = wrapper.find(".kydney-row-container");
        expect(tableContainer).toBeTruthy();
    });

    it('Should be render the INPUT table with the values from the store', () => {
        const store = mockStore(storeMockedData);
        const wrapper = mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const htmlInputTableMocked = 
            '<table class="auxita-table table table-dark table-striped table-bordered table-hover">' + 
                '<thead><tr><th>eGFR</th><th>Date</th></tr></thead>' + 
                '<tbody><tr><td>50</td><td>2018/10/31</td></tr><tr><td>70</td><td>2018/10/20</td></tr><tr><td>70</td><td>2018/09/20</td></tr></tbody>' + 
            '</table>';
        const inPutTables = wrapper.find(".auxita-table").at(0);
        expect(inPutTables.html()).toStrictEqual(htmlInputTableMocked);
    });

    it('Should be render the OUTPUT table with the values from the store', () => {
        const store = mockStore(storeMockedData);
        const wrapper = mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const htmlOutputTableMocked = 
            '<table class="auxita-table table table-dark table-striped table-bordered table-hover">' +
                '<thead><tr><th>eGFR</th><th>Date</th><th>Classification</th><th>Dropped Percentage</th></tr></thead>' +
                '<tbody><tr><td>50</td><td>2018/10/31</td><td>Mild to Moderate</td><td>40.00%</td></tr><tr><td>70</td><td>2018/10/20</td><td>Mildly Decreased</td></tr></tbody>' +
            '</table>';
        const outPutTables = wrapper.find(".auxita-table").at(1);
        expect(outPutTables.html()).toStrictEqual(htmlOutputTableMocked);
    });

    it('Should be shorted with the lastest register [2018/10/31]', () => {
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const lastDataRegistered = store.getState('kidneyData').kidneyData[0].atDate;
        expect(lastDataRegistered).toBe("2018/10/31");
    });

    it('For OutPutValue if eGFR:150 classification needs to be "Kidney Failure"', () => {
        storeMockedData = {
            kidneyData: [
                {eGFR: 7, atDate: '2018/10/31'}
            ],
            collapseKidneyTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const classification = store.getState('kidneyData').kidneyData[0].classification;
        expect(classification).toBe('Kidney Failure');
    });

    it('For OutPutValue if eGFR:25 classification needs to be "Severely Decreased"', () => {
        storeMockedData = {
            kidneyData: [
                {eGFR: 25, atDate: '2018/10/31'}
            ],
            collapseKidneyTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const classification = store.getState('kidneyData').kidneyData[0].classification;
        expect(classification).toBe('Severely Decreased');
    });

    it('For OutPutValue if eGFR: 33 classification needs to be "Moderate to Severe"', () => {
        storeMockedData = {
            kidneyData: [
                {eGFR: 33, atDate: '2018/10/31'}
            ],
            collapseKidneyTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const classification = store.getState('kidneyData').kidneyData[0].classification;
        expect(classification).toBe('Moderate to Severe');
    });

    it('For OutPutValue if eGFR: 55 classification needs to be "Mild to Moderate"', () => {
        storeMockedData = {
            kidneyData: [
                {eGFR: 55, atDate: '2018/10/31'}
            ],
            collapseKidneyTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const classification = store.getState('kidneyData').kidneyData[0].classification;
        expect(classification).toBe('Mild to Moderate');
    });

    it('For OutPutValue if eGFR: 77 classification needs to be "Mildly Decreased"', () => {
        storeMockedData = {
            kidneyData: [
                {eGFR: 77, atDate: '2018/10/31'}
            ],
            collapseKidneyTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const classification = store.getState('kidneyData').kidneyData[0].classification;
        expect(classification).toBe('Mildly Decreased');
    });

    it('For OutPutValue if eGFR: 150 classification needs to be "Normal"', () => {
        storeMockedData = {
            kidneyData: [
                {eGFR: 150, atDate: '2018/10/31'}
            ],
            collapseKidneyTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <KidneyCalculator/>
            </Provider>
        );
        const classification = store.getState('kidneyData').kidneyData[0].classification;
        expect(classification).toBe('Normal');
    });
  
});