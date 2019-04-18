import React from 'react'
import {Steps, Avatar,Row,Col,Card,Table  } from 'antd';
import {  Route, Switch, Link, Redirect} from 'react-router-dom'

import '../css/Report.css';
import moment from 'moment';
const API_SCHEDULE = require('../api/Schedule')
const API_STUDENT = require('../api/Assignment_Student')
const API_TOKEN = require('../api/Token')

const Step = Steps.Step;
const matchCheck = {"all":"menuAll","assigned":"menuAssign","turnedin":"menuTurnin","missing":"menuMissing","late":"menuLate"}

class Report extends React.Component {
    // _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            currentPage : "",
            token_username: "",
            token_firstname: "",
            token_lastname: "",
            token_status: "",
            isMounted: false
        }
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let firstname = response.token_firstname
            let lastname = response.token_lastname
            let status = response.token_status
            this.setState({token_username: username, token_firstname: firstname, token_lastname: lastname, token_status: status})
            this.checkRedirect()
        })   
    }

    checkRedirect = () => {
        if(this.state.token_status === "student"){
            if(this.props.match.path === "/schedule"){
                this.refs.menuSchedule.classList.add("active")
            }else{
                this.refs.menuAssignment.classList.add("active")
                console.log(this.refs.cardAssFilter)
                this.refs.cardAssFilter.container.classList.remove("hidden")
    
                let filter;
                if(this.props.match.params.filter) 
                    filter = this.props.match.params.filter;
                else
                    filter = "assigned"
                
                this.refs[matchCheck[filter]].classList.add("active")
                if(this.state.currentPage !== filter)
                    this.setState({currentPage : filter});
            }
        }
        if(this.state.token_status !== "student"){
            this.props.history.push('/')
        }
    }

    componentDidMount= () =>{
        this.POST_CHECK_TOKEN()
    }

    componentDidUpdate = (prevProps,prevState) =>{
        if(this.props.match.path !== prevProps.match.path){
            if(this.props.match.path === "/schedule"){
                console.log(this.refs.menuSchedule.classList)
                this.refs.menuSchedule.classList.add("active")
                this.refs.menuAssignment.classList.remove("active")
                this.refs.cardAssFilter.container.classList.add("hidden")
                if(this.state.currentPage !== "")
                    this.refs[matchCheck[this.state.currentPage]].classList.remove("active")

            }else{
                this.refs.menuAssignment.classList.add("active")
                this.refs.menuSchedule.classList.remove("active")
                this.refs.cardAssFilter.container.classList.remove("hidden")
                if(this.state.currentPage !== "")
                    this.refs[matchCheck[this.state.currentPage]].classList.remove("active")
                let filter = this.props.match.params.filter;
                this.refs[matchCheck[filter]].classList.add("active")
                if(this.state.currentPage !== filter)
                    this.setState({currentPage : filter});
            }
        }
    }

    render() {
        return (
            <div className="report-container">
          
                <div>
                <div className="report-title">
                    <Avatar className="report-avatar" size={54} style={{ color: 'white', backgroundColor: '#008E7E' }}>{this.state.token_firstname[0]}</Avatar>
                    <span className="report-name" > {`${this.state.token_firstname} ${this.state.token_lastname}` }</span>
                    <br/>
                </div>
                <Row>
                    <Col span={7} offset={2}>
                        <Card style={{ width: '70%' }}>
                            <p className="report-topic">Topics</p>
                            <ul className="report-type">
                                <Link style={{ textDecoration: 'none' }} to="/schedule"><li className="menu-schedule" ref="menuSchedule">Internship Schedule</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/assignment/assigned"><li className="menu-assignment" ref="menuAssignment">Assignments</li></Link>
                            </ul>
                        </Card>
                        <br/>
                        <Card className="assignment-filter hidden" ref="cardAssFilter" style={{ width: '70%' }}>
                            <p className="report-topic">Filters</p>
                            <ul className="report-type">
                                <Link style={{ textDecoration: 'none' }} to="/assignment/all"><li ref="menuAll">All</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/assignment/assigned"><li ref="menuAssign">Assigned</li></Link>
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
                            <Redirect from="/assignment" to="/assignment/assigned"/>
                        </Switch>
                      
                    </Col>
                        
                </Row>
                </div>    
            </div>
        )
    }
}

class Schedule extends React.Component {  

    constructor(props) {
        super(props)
        this.state = {
            Schedule:[],
            token_username: "",
            token_firstname: "",
            token_lastname: "",
            token_status: ""
        }
    }

    API_GET_SCHEDULE = () => {
        API_SCHEDULE.GET_SCHEDULE()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({Schedule:response.data})
            }
        })
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let firstname = response.token_firstname
            let lastname = response.token_lastname
            let status = response.token_status
            this.setState({token_username: username, token_firstname: firstname, token_lastname: lastname, token_status: status})
        })   
    }

    componentDidMount = () => {
        this.API_GET_SCHEDULE()
    }

    getSchedule = () => {
        const tmp = this.state.Schedule.map((option) =>
            <Step title={<span className="step-title"><span className="step-date">{`ภายใน ${moment(option.deadline).format('l')}`}</span>{option.title}</span>} description={option.description} />        )
        return tmp
    }

    render(){
        return (
            <Steps direction="vertical" current={1}>
                {this.getSchedule()}
            </Steps>
        )
    }
}

class Assignment extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {
            token_username: "",
            token_firstname: "",
            token_lastname: "",
            token_status: "",
            columns : [
            {
                title: 'Title',
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
            }
            ],
              
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
        let tmp = this.props.match.params.filter
        if(this.props.match.params.filter !== 'all'){
            let filtered = this.state.data.filter(function(item) {
                return item['status'].replace(/\s+/g, '').toLowerCase() === tmp;
            });
            return filtered
        }
        return this.state.data
    }

    API_POST_STUDENT = (username) => {
        API_STUDENT.POST_STUDENT(username)
        .then(response => {
            if(response.code === 1){
                console.log('response',response.data)
            }
        })
    }

    componentDidMount = () => {
        this.POST_CHECK_TOKEN()
    }

    componentDidUpdate = (prevProps,prevState) =>{
        if(this.state.token_username !== prevState.token_username)
            this.POST_CHECK_TOKEN()
    }

    API_POST_UPDATE = (params) => {
        /*
            params = {
                "_id" : ObjectId(...),
                "username" : "5810504361",
                "id" : "20190408235901",
                "assignmentName" : "ฟอร์ม 2019_2",
                "assignmentDescription" : "",
                "status" : 1,
                "statusDescription" : "turned in",
                "submitDate" : "2019-04-06T03:53:24.073Z",
                "deadline" : "2019-04-08T03:53:24.073Z",
                "defaultForm" : 0,
                "requireIdSubmit" : [],
                "formData" : [
                    {"title": "firstname", "option": "short", "data": "kanokpol"},
                    {"title": "kulsri", "option": "multiple", "data": "kulsri"},
                    {"title": "logo", "option": "upload", "data": {...pdf format...} },
                ],
                "year" : 59
            }
            check _id carefully
        */
        API_STUDENT.POST_UPDATE(params)
        .then(response => {
            if(response.code === 1){

            }
        })
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let firstname = response.token_firstname
            let lastname = response.token_lastname
            let status = response.token_status
            this.setState({token_username: username, token_firstname: firstname, token_lastname: lastname, token_status: status})
            this.API_POST_STUDENT(username) 
        })   
    }

    render(){
        return (
            <Table columns={this.state.columns} dataSource={this.genData()} pagination={false} />
        )
    }
}

export default Report