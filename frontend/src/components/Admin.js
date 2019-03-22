import React from 'react'
import {Row,Col, Form, Icon, Input, Button, DatePicker,TimePicker   } from 'antd';
import {  Route, Switch, Link, Redirect} from 'react-router-dom'
import moment from 'moment';

import '../css/Admin.css';
import '../css/App.css';

const { TextArea } = Input;
const format = 'HH:mm';

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {"cate":"",
        "topic":""
        }
    }

    setActive = () =>{
        var elems = document.querySelectorAll(".menu-li.active");

        [].forEach.call(elems, function(el) {
            el.classList.remove("active");
        });

        if(this.props.match.params.cate === "faq"){
            this.refs.faq.classList.add("active")
            // this.setState({"cate":"FAQs"})
            // this.setState({"topic":"FAQs Lists"})
        }
        else if(this.props.match.params.cate === "announcement"){
            var tmp= this.props.match.params.topic
            this.refs[tmp].classList.add("active")
            console.log(this.refs[tmp].innerHTML) 
            // this.setState({"cate":"FAQs"})
            // this.setState({"topic":"FAQs Lists"})
        }
        
    }
    componentDidMount = () =>{
        this.setActive();
    }
    componentDidUpdate = () =>{  
        this.setActive();
    }


    render() {
        return (
            <div>      
                <Row>
                    <Col span={5}>
                        <div className="col-menu">
                            <span className="menu-header"><i className="material-icons">assignment</i>  Announcement</span>
                            <ul className="menu-ul">
                                <Link style={{ textDecoration: 'none' }} to="/admin/announcement/event" ><li ref="event" className="menu-li" >Upcoming Events</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/admin/announcement/announcement" ><li ref="announcement" className="menu-li" >Announcement</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/admin/announcement/companylist" ><li ref="companylist" className="menu-li">Company Lists</li></Link>

                            </ul>
                            <span className="menu-header"><i className="material-icons">assignment</i>  FAQs</span>
                            <ul className="menu-ul">
                                <Link style={{ textDecoration: 'none' }} to="/admin/faq" ><li ref="faq" className="menu-li">FAQs Lists</li></Link>
                            </ul>
                            <span className="menu-header"><i className="material-icons">assignment</i>  Process 
                            <span className="group-icon">
                                <i className="material-icons">add_circle</i>
                                <i className="material-icons">delete</i>
                            </span>
                            </span>
                            <div className="menu-content">

                            </div>
                        </div>
                    </Col>
                    <Col span={18} className="admin-workarea" >

                        <Switch>
                            <Route path="/admin/announcement/event" component={Event}/>
                            <Route path="/admin/announcement/announcement" component={Announcement}/>
                            <Route path="/admin/announcement/companylist" component={CompanyList}/>
                            <Route path="/admin/faq" component={Announcement}/>
                            <Route path="/admin/process" component={Process}/>
                            <Redirect from="/admin/announcement" to="/admin/announcement/event"/>
                            <Redirect from="/admin" to="/admin/process/all"/>
                        </Switch>
                    </Col>
                </Row>
            </div>
        )
    }

}

class Event extends React.Component {  
    
    constructor(props) {
        super(props)
        this.state = {"cate":"",
            "topic":"",
            // form: this.props.form
        }
    }

    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    componentDidMount= () =>{
        // this.setState({"cate":this.props.match.params.cate})
    }
    render () {
        return (
            <div>
            <Row>
                <Col span={12}> 
                    <Row>
                        <span>Event Name: </span>
                            <Input className="event-input" placeholder="Event name" onBlur={this.handleConfirmBlur} />
                    </Row> <br/>
                    <Row>
                        <span>Date: </span><DatePicker onChange={this.onChange} />
                        <span className="time-input-label">Time: </span><TimePicker defaultValue={moment('00:00', format)} format={format} />
                    </Row> <br/>
                    <Row>
                        <span>Place: </span>
                        <Input className="event-input" placeholder="Place" onBlur={this.handleConfirmBlur} />
                    </Row>
                    <br/>
                    <Row className="row-submit-btn">
                        <Button className="submit-btn">Submit</Button>
                    </Row>
                </Col>
            </Row>
            <br/>
            <Row>
                All upcoming events <i className="material-icons delete-btn">delete</i>
            </Row>
            <br/>
            <div>
                <span>Company: </span><br/>
                <span>Description: </span><br/>
                <span>Date: </span><br/>
                <span>Interested people: </span><br/>
                <span>status: </span><br/>
            </div>

            </div>
            

           
        )
    }
}
class Announcement extends React.Component {  
    render() {
        return(
            <div></div>
        )
    }
}

class CompanyList extends React.Component{
    render(){
        return(
            <div></div>
        )

    }
}

class Process extends React.Component {  
    render () {
        return (
            <div> b </div>
        )
    }
}
export default Admin