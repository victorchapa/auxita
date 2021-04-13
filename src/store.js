import { createStore } from 'redux';
const reduxDevtoolsConfig = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const initialState = {
    hypertensionData: [
        {SysBP: 120, DiaBP: 90, atDate: '2018/10/31'},
        {SysBP: 115, DiaBP: 100, atDate: '2018/10/20'},
        {SysBP: 115, DiaBP: 80, atDate: '2018/11/15'}
    ],
    kidneyData: [
        {eGFR: 65, atDate: '2018/10/31'},
        {eGFR: 70, atDate: '2018/10/20'}
    ]
}

const reducerHealthCalculator =  (state = initialState, action) => {
    return state;
}

export default createStore(reducerHealthCalculator, reduxDevtoolsConfig);
