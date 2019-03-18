import React from 'react'
import {Steps, Avatar,Row,Col,Card,Table  } from 'antd';
import {  Route, Switch, Link, Redirect} from 'react-router-dom'

import '../css/Report.css';

const API_REPORT = require('../api/Report')

const Step = Steps.Step;


class Report extends React.Component {
    componentDidMount= () =>{
        console.log(this.props)
        if(this.props.match.path === "/schedule"){
            this.refs.menuSchedule.classList.add("active")
        }
        else if(this.props.match.path === "/assignment"){
            this.refs.menuAssignment.classList.add("active")
            console.log(this.refs.cardAssFilter)
            this.refs.cardAssFilter.container.classList.remove("hidden")
        }
    }
    componentDidUpdate = () =>{  
        if(this.props.match.path === "/schedule"){
            console.log(this.refs.menuSchedule.classList)
            this.refs.menuSchedule.classList.add("active")
            this.refs.menuAssignment.classList.remove("active")
            this.refs.cardAssFilter.container.classList.add("hidden")

        }
        else if(this.props.match.path === "/assignment"){
            this.refs.menuAssignment.classList.add("active")
            this.refs.menuSchedule.classList.remove("active")
            this.refs.cardAssFilter.container.classList.remove("hidden")

        }
    }

    render() {
        return (
            <div className="report-container">

            <div className="report-title">
                <Avatar className="report-avatar" size={54} style={{ color: 'white', backgroundColor: '#008E7E' }}>K</Avatar>
                <span className="report-name" > Kanokpol Kulsri</span>
                <br/>
            </div>
               
                <Row>
                    <Col span={7} offset={2}>
                        <Card style={{ width: '70%' }}>
                            <p className="report-topic">Topics</p>
                            <ul className="report-type">
                                <Link style={{ textDecoration: 'none' }} to="/schedule"><li className="menu-schedule" ref="menuSchedule">Internship Schedule</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/assignment"><li className="menu-assignment" ref="menuAssignment">Assignments</li></Link>
                            </ul>
                        </Card>
                        <br/>
                        <Card className="assignment-filter hidden" ref="cardAssFilter" style={{ width: '70%' }}>
                            <p className="report-topic">Filters</p>
                            <ul className="report-type">
                                <Link style={{ textDecoration: 'none' }} to="/assignment/all"><li ref="menuAll">All</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/assignment/turnedin"><li ref="menuTurnin">Turned In</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/assignment/missing"><li ref="menuMissing">Missing</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/assignment/late"><li ref="menuLate">Late</li></Link>
                            </ul>
                        </Card>
                    </Col>
                    <Col span={15}>
                        <Switch>
                            <Route path="/schedule" component={Schedule}/>
                            <Route path="/assignment/:filter" component={Assignment}/>
                            <Redirect from="/assignment" to="/assignment/all"/>
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
                <Step title="(ภายใน 30 เมษายน 2561) จัดหาสถานที่ประกอบการสำหรับสหกิจศึกษาเวลารวมไม่น้อยกว่า 6 เดือน" description="- สามารถแยกเป็น 2 สถานประกอบการได้ในกรณีเดียวเท่านั้น กล่าวคือ สหกิจศึกษาต่างประเทศ ณ ต่างประเทศ
และในประเทศ โดยห้ามเว้นระยะห่างนานเกินไป" />
                <Step title="(ภายใน 5 พฤษภาคม 2561) กรอกข้อมูลรายละเอียดสถานประกอบการลงในแบบฟอร์มออนไลน์" description="- หากมีการแก้ไขเปลี่ยนแปลงให้ดำเนินการกรอกซ้ำ โดยจะถือว่าข้อมูลที่กรอกครั้งล่าสุดเป็นข้อมูลที่ถูกต้อง" />
                <Step title="(ภายใน 1 สิงหาคม 2561) สมัครเข้าร่วมโครงการสหกิจศึกษา โดยเตรียมเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ) ส่งที่ห้องธุรการภาควิชาฯ" description="- แบบฟอร์มใบสมัครพร้อมติดรูปถ่าย (ฉบับภาษาอังกฤษ สำหรับสหกิจศึกษา ณ ต่างประเทศ และฉบับภาษาไทย 
สำหรับสหกิจศึกษาในประเทศ)
- (ถ้ามี) สำเนาหนังสือตอบรับ (หรือเอกสารอื่นใด) ที่มีใจความตอบรับนิสิต พร้อมระบุวันเริ่มต้นและสิ้นสุดการทำสหกิจศึกษา
- ใบรับรองผลการเรียน (transcript) ฉบับจริงจากสำนักทะเบียน
- สำเนาบัตรประชาชนผู้ปกครองที่ลงนามรับทราบ" />
            </Steps>
        )
    }
}

class Assignment extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {
            columns : [
            {title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: text => <a href="javascript:;" className="assignment-title">{text}</a>,
              }, {
                title: 'Due',
                dataIndex: 'due',
                key: 'due',
              }, {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
              }],
              
              data : [{
                key: '1',
                title: 'John Brown',
                due: 32,
                status: 'Turned In',
              }, {
                key: '2',
                title: 'Jim Green',
                due: 42,
                status: 'Turned In',
              }, {
                key: '3',
                title: 'Joe Black',
                due: 32,
                status: 'Missing',
              }, {
                key: '4',
                title: 'Jim Red',
                due: 32,
                status: 'Late',
              }]
        }
    }
    
    genData = () => {
        console.log(this.props.match.params.filter)
        var tmp = this.props.match.params.filter
        if(this.props.match.params.filter !== 'all'){
            var filtered = this.state.data.filter(function(item) {
                return item['status'].replace(/\s+/g, '').toLowerCase() === tmp;
              });
            return filtered
        }
        return this.state.data
    }

    render(){
        return (
            <Table columns={this.state.columns} dataSource={this.genData()} pagination={false} />
        )
    }
}

export default Report