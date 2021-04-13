import React, { Component } from 'react';
import { connect } from 'react-redux'
import getLastRegistration from './utils';

 class HypertensionCalculator extends Component {

    render (){
        const { hypertensionData } = this.props;
        const hypertensionTable = this.hypertensionTableRender(hypertensionData);
        const lastData = this.hypertensionTableRender(this.hypertensionCalculation(hypertensionData), true);
        return(
            <div>
                <div className="table-container">
                    <h3>Input Data:</h3>
                    { hypertensionTable }
                </div>
                <div className="lastRegistration">
                    <h3>Output Data:</h3>
                    { lastData }
                </div>
                <div className="control-pannel">
                    <input type="button" value="Upload"></input>
                </div>
            </div>
        );
    }

    hypertensionTableRender(hypertensionData, hasClassification = false){
        const hypertensionDataItems = hypertensionData.map((data, index) => {
            const dataCells = 
                <tr key={index}>
                    <td>{data.SysBP}</td>
                    <td>{data.DiaBP}</td>
                    <td>{data.atDate}</td>
                    { hasClassification ? <td>{data.classification}</td> : false }
                </tr>
            return dataCells;
        });
        const table = <table>
            <thead>
                <tr>
                    <th>SysBP</th>
                    <th>DiaBP</th>
                    <th>Date</th>
                    { hasClassification ? <th>Classification</th> : false }
                </tr>
            </thead>
            <tbody>
                { hypertensionDataItems }
            </tbody>
        </table>
        return (table);
    }
    
    hypertensionCalculation(hypertensionData) {
        let lastRegistration = getLastRegistration(hypertensionData);
        switch(true){
            case ((lastRegistration.SysBP >= 180) && (lastRegistration.DiaBP >= 120)):
                lastRegistration.classification = 'Stage 3'
                break;
            case (((lastRegistration.SysBP >= 160) && (lastRegistration.SysBP < 180)) || ((lastRegistration.DiaBP >= 100) && (lastRegistration.DiaBP < 110))):
                lastRegistration.classification = 'Stage 2'
                break;
            case (((lastRegistration.SysBP >= 140) && (lastRegistration.SysBP < 160)) || ((lastRegistration.DiaBP >= 90) && (lastRegistration.DiaBP < 100))):
                lastRegistration.classification = 'Stage 1'
                break;
            default:
                lastRegistration.classification = 'No Hypertension' 
        }
        return ([lastRegistration]);
    }
 };

 HypertensionCalculator.defaultProps = {
    hypertensionData: []
 };

 function mapStateToProps(state) {
    const { hypertensionData } = state;
    return { hypertensionData: hypertensionData };
}

export default connect(mapStateToProps)(HypertensionCalculator);
