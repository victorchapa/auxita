import React from 'react';
import { Provider } from 'react-redux';
import HypertensionCalculator from './hypertension-calculator';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import expect from "expect";
import { mount } from 'enzyme';

describe('Hypertension Component testing', () => {

    let middlewares,
        mockStore,
        storeMockedData = [];

    beforeEach(() => {
        middlewares = [thunk];
        mockStore = configureMockStore(middlewares);
        storeMockedData = {
            hypertensionData: [
                {SysBP: 120, DiaBP: 90, atDate: '2018/10/31'},
                {SysBP: 115, DiaBP: 100, atDate: '2018/10/20'},
                {SysBP: 115, DiaBP: 80, atDate: '2018/11/15'}
            ],
            collapseHypertensionTables: false
        };
    });

    it('Shoud be rendered the hypertension table container', ()=>{
        const store = mockStore(storeMockedData);
        const wrapper = mount(
            <Provider store={store}>
                <HypertensionCalculator/>
            </Provider>
        );
        const tableContainer = wrapper.find(".hypertension-row-container");
        expect(tableContainer).toBeTruthy();
    });

    it('Should be render the INPUT table with the values from the store', () => {
        const store = mockStore(storeMockedData);
        const wrapper = mount(
            <Provider store={store}>
                <HypertensionCalculator/>
            </Provider>
        );
        const htmlInputTableMocked = 
            '<table class="auxita-table table table-dark table-striped table-bordered table-hover">' +
                '<thead><tr><th>SysBP</th><th>DiaBP</th><th>Date</th></tr></thead>' + 
                '<tbody><tr><td>120</td><td>90</td><td>2018/10/31</td></tr><tr><td>115</td><td>100</td><td>2018/10/20</td></tr><tr><td>115</td><td>80</td><td>2018/11/15</td></tr></tbody>'
            +'</table>';
        const inPutTables = wrapper.find(".auxita-table").at(0);
        expect(inPutTables.html()).toStrictEqual(htmlInputTableMocked);
    });

    it('Should be render the OUTPUT table with the values from the store', () => {
        const store = mockStore(storeMockedData);
        const wrapper = mount(
            <Provider store={store}>
                <HypertensionCalculator/>
            </Provider>
        );
        const htmlOutputTableMocked = 
            '<table class="auxita-table table table-dark table-striped table-bordered table-hover">' + 
                '<thead><tr><th>SysBP</th><th>DiaBP</th><th>Date</th><th>Classification</th></tr></thead>' + 
                '<tbody><tr><td>115</td><td>80</td><td>2018/11/15</td><td>No Hypertension</td></tr></tbody>' + 
            '</table>';
        const outPutTables = wrapper.find(".auxita-table").at(1);
        expect(outPutTables.html()).toStrictEqual(htmlOutputTableMocked);
    });

    it('Should be shorted with the lastest register [2018/11/15]', () => {
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <HypertensionCalculator/>
            </Provider>
        );
        const lastDataRegistered = store.getState('hypertensionData').hypertensionData[0].atDate;
        expect(lastDataRegistered).toBe("2018/11/15");
    });

    it('For OutPutValue if SySBP:115 & DiaBP: 80 classification needs to be "No Hypertension"', () => {
        storeMockedData = {
            hypertensionData: [
                {SysBP: 115, DiaBP: 80, atDate: '2018/11/15'}
            ],
            collapseHypertensionTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <HypertensionCalculator/>
            </Provider>
        );
        const classification = store.getState('hypertensionData').hypertensionData[0].classification;
        expect(classification).toBe('No Hypertension');
    });

    it('For OutPutValue if SySBP:155 & DiaBP: 99 classification needs to be "Stage 1"', () => {
        storeMockedData = {
            hypertensionData: [
                {SysBP: 155, DiaBP: 99, atDate: '2018/11/15'}
            ],
            collapseHypertensionTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <HypertensionCalculator/>
            </Provider>
        );
        const classification = store.getState('hypertensionData').hypertensionData[0].classification;
        expect(classification).toBe('Stage 1');
    });

    it('For OutPutValue if SySBP:177 & DiaBP: 107 classification needs to be "Stage 2"', () => {
        storeMockedData = {
            hypertensionData: [
                {SysBP: 177, DiaBP: 107, atDate: '2018/11/15'}
            ],
            collapseHypertensionTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <HypertensionCalculator/>
            </Provider>
        );
        const classification = store.getState('hypertensionData').hypertensionData[0].classification;
        expect(classification).toBe('Stage 2');
    });

    it('For OutPutValue if SySBP:199 & DiaBP: 150 classification needs to be "Stage 3"', () => {
        storeMockedData = {
            hypertensionData: [
                {SysBP: 199, DiaBP: 150, atDate: '2018/11/15'}
            ],
            collapseHypertensionTables: false
        };
        const store = mockStore(storeMockedData);
        mount(
            <Provider store={store}>
                <HypertensionCalculator/>
            </Provider>
        );
        const classification = store.getState('hypertensionData').hypertensionData[0].classification;
        expect(classification).toBe('Stage 3');
    });
  
});