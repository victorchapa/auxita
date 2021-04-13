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
        const kidneyDataItems = kidneyData.map((data, index) => {
            const dataCells = 
                <tr key={index}>
                    <td>{data.eGFR}</td>
                    <td>{data.atDate}</td>
                    { hasClassification ? <td>{data.classification}</td> : false }
                </tr>
            return dataCells;
        });
        const table = <table>
            <thead>
                <tr>
                    <th>eGFR</th>
                    <th>Date</th>
                    { hasClassification ? <th>Classification</th> : false }
                </tr>
            </thead>
            <tbody>
                { kidneyDataItems }
            </tbody>
        </table>
        return (table);
    }
    
    kidneyCalculation(kidneyData) {
        let lastRegistration = getLastRegistration(kidneyData);
        return ([lastRegistration]);
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
