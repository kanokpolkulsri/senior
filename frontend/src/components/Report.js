import React from 'react'
import {Steps, Avatar,Row,Col,Card } from 'antd';
import {  Route, Switch, Link } from 'react-router-dom'

import '../css/Report.css';

const API_REPORT = require('../api/Report')

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

    constructor(props) {
        super(props)
        this.state = {"name":"plam"}
    }

    componentDidMount = () => {
        API_REPORT.GET_SCHEDULE()
        .then(response => {
            if(response.code === 1){
                // request success fully

                // response.data

                /*
                data = [
                    {
                        deadline: "2019-04-30T23:59:59.000Z",
                        description: ["สามารถแยกเป็น 2 สถานประกอบการได้ในกรณีเดียวเท่านั้…ระเทศ และในประเทศ โดยห้ามเว้นระยะห่างกันนานเกินไป"],
                        title: "จัดหาสถานประกอบการสำหรับสหกิจศึกษา เวลารวมไม่น้อยกว่า 6 เดือน",
                        _id: "5c86765ff6da09a1aabd6951",
                    },
                    {
                        deadline: "2019-04-30T23:59:59.000Z",
                        description: ["สามารถแยกเป็น 2 สถานประกอบการได้ในกรณีเดียวเท่านั้…ระเทศ และในประเทศ โดยห้ามเว้นระยะห่างกันนานเกินไป"],
                        title: "จัดหาสถานประกอบการสำหรับสหกิจศึกษา เวลารวมไม่น้อยกว่า 6 เดือน",
                        _id: "5c86765ff6da09a1aabd6951",
                    }
                ]
                */
            }
        })
    }

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