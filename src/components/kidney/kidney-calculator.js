import React, { Component } from 'react';
import { connect } from 'react-redux'
import getLastRegistration from '../utils';
import { Col } from 'react-bootstrap';
import "./kidney-calculator.scss";

 class KidneyCalculator extends Component {

    render (){
        const { kidneyData, collapseKidneyTables } = this.props;
        const kidneyDiseaseTable = this.kidneyTableRender(kidneyData),
            lastDataCaptured = this.kidneyTableRender(this.kidneyCalculation(kidneyData), true, true);
        let isCollapsed = collapseKidneyTables ? "collapsed" : "no-collapse" ;
        return(
            <div className="row kydney-row-container">
                <Col md="12">
                    <h1>Kidney Desease Calculator</h1>
                    <input className="auxita-button" type="button" value={collapseKidneyTables ? "Show All" : "Hide All"}
                        onClick={() => this.collapseTables()}/>
                </Col>
                <Col className={isCollapsed}>
                    <div className="table-container">
                        <h3>Input Data:</h3>
                        { kidneyDiseaseTable }
                    </div>
                </Col>
                <Col className={isCollapsed}>
                    <div className="lastRegistration">
                        <h3>Output Data:</h3>
                        { lastDataCaptured }
                    </div>
                </Col>
            </div>
        );
    }

    kidneyTableRender(kidneyData, hasClassification = false, hasDroppedPercentage = false){
        const kidneyDataItems = kidneyData.map((data, index) => {
            const dataCells = 
                <tr key={index}>
                    <td>{data.eGFR}</td>
                    <td>{data.atDate}</td>
                    { hasClassification ? <td>{data.classification}</td> : false }
                    { hasDroppedPercentage && data.droppedPercentage ? <td>{data.droppedPercentage}%</td> : false }
                </tr>
            return dataCells;
        });
        const table = <table className="auxita-table table table-dark table-striped table-bordered table-hover">
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
        let droppedPercentage = 0;
        if(lastRegistrations.length >= 2){
            droppedPercentage = (((lastRegistrations[1].eGFR-lastRegistrations[0].eGFR)/lastRegistrations[0].eGFR)*100).toFixed(2);
        }
        
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

    collapseTables() {
        this.props.collapseTablesAction();
    }

 };

 KidneyCalculator.defaultProps = {
    kidneyData: [],
    collapseKidneyTables: false
 };

 function mapStateToProps(state) {
    const { kidneyData, collapseKidneyTables } = state;
    return { kidneyData: kidneyData, collapseKidneyTables: collapseKidneyTables };
}

function mapDispatchToProps(dispatch){
    return {
        collapseTablesAction: () => {
            dispatch({ type: "COLLAPSE_KIDNEY_TABLES" });
        }   
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KidneyCalculator);
