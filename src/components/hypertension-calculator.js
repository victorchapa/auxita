import React, { Component } from 'react';
import { connect } from 'react-redux'
import getLastRegistration from './utils';
import { Col } from 'react-bootstrap';
import "./hypertension-calculator.scss";

 class HypertensionCalculator extends Component {

    render (){
        const { hypertensionData, collapseHypertensionTables } = this.props;
        const hypertensionTable = this.hypertensionTableRender(hypertensionData),
            lastData = this.hypertensionTableRender(this.hypertensionCalculation(hypertensionData), true);
        let isCollapsed = collapseHypertensionTables ? "collapsed" : "no-collapse";
        return(
            <div className="row hypertension-row-container">
                <Col md="12">
                    <h1>Hypertension Calculator</h1>
                    <input className="auxita-button" type="button" value={collapseHypertensionTables ? "Show All" : "Hide All"}
                        onClick={() => this.collapseTables()}/>
                </Col>
                <Col className={isCollapsed}>
                    <div className="table-container">
                        <h3>Input Data:</h3>
                        { hypertensionTable }
                    </div>
                </Col>
                <Col className={isCollapsed}>
                    <div className="lastRegistration">
                        <h3>Output Data:</h3>
                        { lastData }
                    </div>
                </Col>
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
        const table = <table className="auxita-table table table-dark table-striped table-bordered table-hover">
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

    collapseTables() {
        this.props.collapseTablesAction();
    }

 };

 HypertensionCalculator.defaultProps = {
    hypertensionData: [],
    collapseHypertensionTables: false
 };

 function mapStateToProps(state) {
    const { hypertensionData,  collapseHypertensionTables} = state;
    return { hypertensionData: hypertensionData, collapseHypertensionTables: collapseHypertensionTables };
};

function mapDispatchToProps(dispatch){
    return {
        collapseTablesAction: () => {
            dispatch({ type: "COLLAPSE_HYPERTENSION_TABLES" });
        }   
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HypertensionCalculator);
