import { createStore } from 'redux';

const reduxDevtoolsConfig = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const initialState = {
    hypertensionData: [
        {SysBP: 120, DiaBP: 90, atDate: '2018/10/31'},
        {SysBP: 115, DiaBP: 100, atDate: '2018/10/20'},
        {SysBP: 115, DiaBP: 80, atDate: '2018/11/15'}
    ],
    kidneyData: [
        {eGFR: 70, atDate: '2018/09/20'},
        {eGFR: 50, atDate: '2018/10/31'},
        {eGFR: 70, atDate: '2018/10/20'}
    ],
    collapseHypertensionTables: false,
    collapseKidneyTables: false
}

const reducerHealthCalculator =  (state = initialState, action) => {

    if(action.type === "COLLAPSE_HYPERTENSION_TABLES") {
        return {
            ... state,
            collapseHypertensionTables: !state.collapseHypertensionTables
        }
    }

    if(action.type === "COLLAPSE_KIDNEY_TABLES") {
        return {
            ... state,
            collapseKidneyTables: !state.collapseKidneyTables
        }
    }

    return state;
}

export default createStore(reducerHealthCalculator, reduxDevtoolsConfig);
