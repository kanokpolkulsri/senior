import React from 'react'
import {Steps, Avatar,Row,Col,Card } from 'antd';
import {  Route, Switch, Link } from 'react-router-dom'

import '../css/Report.css';

const Step = Steps.Step;


class Report extends React.Component {

    render() {
        return (
            <div className="report-container">
            <div className="report-title">
                <Avatar className="report-avatar" size={54} style={{ color: 'white', backgroundColor: '#008E7E' }}>K</Avatar>
                <span className="report-name" > Kanokpol Kulsri</span>
                <br/>
            </div>
               
                <Row>
                    <Col span={8}>
                        <Card style={{ width: '70%' }}>
                            <p className="report-topic">Topics</p>
                            <ul className="report-type">
                                <li className="active">Internship Schedule</li>
                                <li>Assignments</li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Switch>
                            <Route path="/schedule" component={Schedule}/>
                            <Route path="/assignment" component={Assignment}/>
                        </Switch>
                      
                    </Col>
                        
                </Row>
            
            </div>
        )
    }
}

class Schedule extends React.Component {  

    render(){
        return (
            <Steps direction="vertical" current={1}>
                <Step title="Finished" description="This is a description." />
                <Step title="In Progress" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
            </Steps>
        )
    }
}

class Assignment extends React.Component {  

    render(){
        return (
            <Steps direction="vertical" current={1}>
  
            </Steps>
        )
    }
}

export default Report