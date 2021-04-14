import React, { Component } from 'react';
import { connect } from 'react-redux'
import getLastRegistration from './utils';

 class KidneyCalculator extends Component {

    render (){
        const { kidneyData } = this.props;
        const kidneyDiseaseTable = this.kidneyTableRender(kidneyData);
        const lastDataCaptured = this.kidneyTableRender(this.kidneyCalculation(kidneyData), true);
        return(
            <div>
                <div className="table-container">
                    <h3>Input Data:</h3>
                    { kidneyDiseaseTable }
                </div>
                <div className="lastRegistration">
                    <h3>Output Data:</h3>
                    { lastDataCaptured }
                </div>
                <div className="control-pannel">
                    <input type="button" value="Upload"></input>
                </div>
            </div>
        );
    }

    kidneyTableRender(kidneyData, hasClassification = false){
        let hasDroppedPercentage = kidneyData[0].droppedPercentage ? true: false ;
        const kidneyDataItems = kidneyData.map((data, index) => {
            const dataCells = 
                <tr key={index}>
                    <td>{data.eGFR}</td>
                    <td>{data.atDate}</td>
                    { hasClassification ? <td>{data.classification}</td> : false }
                    { data.droppedPercentage ? <td>{data.droppedPercentage}%</td> : false }
                </tr>
            return dataCells;
        });
        const table = <table>
            <thead>
                <tr>
                    <th>eGFR</th>
                    <th>Date</th>
                    { hasClassification ? <th>Classification</th> : false }
                    { hasDroppedPercentage ? <th>Dropped Percentage</th> : false }
                </tr>
            </thead>
            <tbody>
                { kidneyDataItems }
            </tbody>
        </table>
        return (table);
    }
    
    kidneyCalculation(kidneyData) {
        let lastRegistrations = getLastRegistration(kidneyData);
        let droppedPercentage = (((lastRegistrations[1].eGFR-lastRegistrations[0].eGFR)/lastRegistrations[0].eGFR)*100).toFixed(2);
        
        lastRegistrations.forEach((kidneyData) => {
            switch(true){
                case (kidneyData.eGFR >= 90):
                    kidneyData.classification = 'Normal'
                    break;
                case (kidneyData.eGFR >= 60 && kidneyData.eGFR <= 89):
                    kidneyData.classification = 'Mildly Decreased'
                    break;
                case (kidneyData.eGFR >= 45 && kidneyData.eGFR <= 59):
                    kidneyData.classification = 'Mild to Moderate'
                    break;
                case (kidneyData.eGFR >= 30 && kidneyData.eGFR <= 44):
                    kidneyData.classification = 'Moderate to Severe'
                    break;
                case (kidneyData.eGFR >= 15 && kidneyData.eGFR <= 29):
                    kidneyData.classification = 'Severely Decreased'
                    break;
                default:
                     kidneyData.classification = 'Kidney Failure' 
            }
        });
        if(droppedPercentage >= 20){
            lastRegistrations[0].droppedPercentage = droppedPercentage;
            return (lastRegistrations);
        }
        return ([lastRegistrations[0]]);
    }
 };

 KidneyCalculator.defaultProps = {
    kidneyData: []
 };

 function mapStateToProps(state) {
    const { kidneyData } = state;
    return { kidneyData: kidneyData };
}

export default connect(mapStateToProps)(KidneyCalculator);
