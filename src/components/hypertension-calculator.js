import React, { Component } from 'react';
import { connect } from 'react-redux'
import getLastRegistration from './utils';

 class HypertensionCalculator extends Component {

    render (){
        const { hypertensionData } = this.props;
        const hypertensionTable = this.hypertensionTableRender(hypertensionData);
        const lastData = this.hypertensionTableRender(this.hypertensionCalculation(hypertensionData));
        return(
            <div>
                <div className="table-container">
                    { hypertensionTable }
                </div>
                <div className="lastRegistration">
                    { lastData }
                </div>
                <div className="control-pannel">
                    <input type="button" value="Upload"></input>
                </div>
            </div>
        );
    }

    hypertensionTableRender(hypertensionData){
        const hypertensionDataItems = hypertensionData.map((data, index) => {
            return <tr key={index}><td>{data.SysBP}</td><td>{data.DiaBP}</td><td>{data.atDate}</td></tr>
        });
        const table = <table>
            <thead>
                <tr>
                    <th>SysBP</th>
                    <th>DiaBP</th>
                    <th>Date</th>
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
