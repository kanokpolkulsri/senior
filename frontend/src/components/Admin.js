import React from 'react'
import {Row, Col, Select, Table,Form , Input, Button, DatePicker,
    TimePicker,Checkbox,Upload, Icon, message,Popconfirm    } from 'antd';
import {  Route, Switch, Link, Redirect} from 'react-router-dom'
import moment from 'moment-timezone';

import '../css/Admin.css';
import '../css/App.css';

const { TextArea } = Input;
const format = 'HH:mm';
const Option = Select.Option;
const API_FEED = require('../api/Feed')
const API_FAQ = require('../api/Faq')
const API_ADMIN = require('../api/Assignment_Admin')
const API_STUDENT = require('../api/Assignment_Student')
const API_TOKEN = require('../api/Token')

const VariableConfig = require('../api/VariableConfig')

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cate: "",
            topic: "",
            form: this.props.form,
            process:["test"],
            token_status: ""
        }
    }

    setActive = () =>{
        this.POST_CHECK_TOKEN()
        
        if(this.state.token_status === "admin"){
            let elems = document.querySelectorAll(".menu-li.active");

            [].forEach.call(elems, function(el) {
                el.classList.remove("active");
            })
    
            if(this.props.match.params.cate === "faq"){
                this.refs.faq.classList.add("active")
            }
            else if(this.props.match.params.cate === "announcement"){
                let tmp= this.props.match.params.topic
                this.refs[tmp].classList.add("active")
            }
            else if(this.props.match.params.cate === "process"){
                let tmp = this.props.match.params.topic
                console.log(tmp);
                
                if(tmp === null || tmp === undefined)
                    this.refs["report"].classList.add("active")
                else
                    this.refs[tmp].classList.add("active")
            }else{
                this.props.history.push('/')
            }
        }   
    }

    componentDidMount = () =>{
        this.setActive()
    }

    componentDidUpdate = (prevProps,prevState) =>{  
        if(this.state.token_status !== prevState.token_status)
            this.setActive()
    }
 
    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let status = response.token_status
            this.setState({token_status: status})
        })   
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
                         
                            </span>
                            <ul className="menu-ul">
                                <Link style={{ textDecoration: 'none' }} to="/admin/process/report" ><li ref="report" className="menu-li">Report</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/admin/process/assignment" ><li ref="assignment" className="menu-li">Assignment</li></Link>
                            </ul>
                        </div>
                    </Col>
                    <Col span={18} className="admin-workarea" >

                        <Switch>
                            <Route path="/admin/announcement/event" component={EventForm}/>
                            <Route path="/admin/announcement/announcement" component={AnnouncementForm}/>
                            <Route path="/admin/announcement/companylist" component={CompanyListForm}/>
                            <Route path="/admin/faq" component={FaqForm}/>
                            <Route path="/admin/process/report" component={StudentReport}/>
                            <Route exact path="/admin/process/assignment" component={Process}/>
                            <Route path="/admin/process/assignment/add" component={AddProcessForm}/>
                            <Route path="/admin/process/assignment/:idProcess" component={EachProcess}/>
                            <Redirect from="/admin/announcement" to="/admin/announcement/event"/>
                            <Redirect from="/admin" to="/admin/process/report"/>
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
            currentRegister:0,
            currentId:null,
            currentMember:[],
            checkboxList:[],
            "data":[],
            form: this.props.form
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              values["register"] = 0;
              values["members"] =[];
              console.log(moment(values["date"].format('x')))
            //   let startTimeHour = moment(values["startTime"]).hour()
            //   let endTimeHour = moment(values["endTime"]).hour()
            //   let startTimeMinute = moment(values["startTime"]).minute()
            //   let endTimeMinute = moment(values["endTime"]).minute()

            
        //       console.log(moment(values["startTime"]).hour())
        //       console.log(moment(values["endTime"]).hour())
        //       values["startTime"] = tmp.set({'hour':startTimeHour,'minute':startTimeMinute}).add(7, 'hours')
        //       values["endTime"] = tmp.hour(endTimeHour).minute(endTimeMinute).add(7, 'hours')
        //   console.log(values["startTime"])
        //   console.log(values["endTime"])
              
              this.API_ADD_EVENT(values)
            }
          });

    }

  
    onCheckChange = (idx,e) => {
        console.log(idx,e);
        
        // console.log(`checked = ${e.target}`);
        const { checkboxList } = this.state;
        const nextSelected = e.target.checked
          ? [...checkboxList, idx]
          : checkboxList.filter(t => t !== idx);
        console.log('You are interested in: ', nextSelected);
        this.setState({ checkboxList: nextSelected });
    }

    chooseItem = (option) => {

        this.props.form.setFieldsValue({
        "date":moment(option.date),
        "name":option.name,
        "location":option.location,
        "startTime":moment.utc(option.startTime),
        "endTime":moment.utc(option.endTime)});
        this.setState({currentId:option._id, currentRegister:option.register,currentMember:option.members})
        console.log(this.refs.addButtonGroup.classList);
        
        if(!this.refs.addButtonGroup.classList.contains("hidden"))
            this.refs.addButtonGroup.classList.add("hidden")
        this.refs.editButtonGroup.classList.remove("hidden")
    }

    clearInput = () => {
        this.refs.addButtonGroup.classList.remove("hidden")
        this.refs.editButtonGroup.classList.add("hidden")
        this.setState({currentId:"", currentRegister:0,currentMember:[]})
        this.props.form.setFieldsValue({
            "date":moment(),
            "name":"",
            "location":"",
            "startTime":moment("00:00",format),
            "endTime":moment("00:00",format)});
    }
    calStatus = (date,startTime,endTime) => {
        let tmpRes = "";
        let eventStart = moment(date).hour(moment(startTime).hour()).minute(moment(startTime).minute());
        let eventEnd = moment(date).hour(moment(endTime).hour()).minute(moment(endTime).minute());
        // console.log("eventstart",eventStart);
        // console.log("now",moment());
        // console.log("eventEnd",eventEnd);
        
       
        if(eventEnd.isBefore(moment()))
            tmpRes = <span className="outdate item-span">Outdate</span>
        else if(eventStart.isAfter(moment()))
            tmpRes = <span className="upcoming item-span">Upcoming</span>
        else
            tmpRes = <span className="item-span">Ongoing</span>
        return tmpRes
    }

    editItem = () => {
        let tmp =this.props.form.getFieldsValue()
        tmp["register"] = this.state.currentRegister;
        tmp["_id"] = this.state.currentId;
        tmp["members"] = this.state.currentMember;
        tmp["startTime"] = moment.utc(tmp["startTime"])
        tmp["endTime"] = moment.utc(tmp["endTime"])
        this.API_UPDATE_EVENT(tmp)
        console.log(tmp);
        
    }

    deleteItem = () => {
        const {checkboxList} = this.state;
        checkboxList.forEach((id) => {
            const val = {}
            val["_id"] = id
            this.API_DELETE_EVENT(val)
        })
    }

    getEvent = () => {
        const event = this.state.data.map((option,idx)=>
        <div className="div-item">
       
        <Row>
            <Col span={1}>
                <Checkbox onChange={(e) => this.onCheckChange(option._id,e)}>
                </Checkbox>    
            </Col>
            <Col span={23} className="item-group" > 
            <span onClick={() => this.chooseItem(option)}>
                <span className="item-span">Company: {option.name} </span><br/>
                <span className="item-span">Place: {option.location} </span><br/>
                <span className="item-span">Date: {moment(option.date).format('l')}</span><br/>
                <span className="item-span">Time: {`${moment(option.startTime).format(format)} - ${moment(option.endTime).format(format)}`}</span><br/>
                <span className="item-span">Interested people: {option.register} people</span><br/>
                {/* <span className="item-span">Status: {moment(option.date).isBefore(moment())?<span>Upcoming</span>:<span>Outdate</span>}</span> */}
                <span className="item-span">status: {this.calStatus(option.date,option.startTime,option.endTime)}</span><br/>
            </span>
            </Col>
          
        </Row>
        </div>
        )
        return event;
    }

    componentDidMount = () => {
        this.API_GET_EVENT();
    }

    API_ADD_EVENT = (values) => {
        // let values = "" // {"name":"..", "location":"..", "date":ISODate("2019-02-04T16:00:00.000Z"), "register": 0}
        API_FEED.POST_ADD_EVENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_EVENT()
                //request successfully
            }
        })
    }

    API_UPDATE_EVENT = (values) => {
        // let values = "" // {"_id":"...", "name":"..", "location":"..", "date":ISODate("2019-02-04T16:00:00.000Z"), "register": 0}
        API_FEED.POST_UPDATE_EVENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_EVENT()

                //request successfully
            }
        })
    }

    API_DELETE_EVENT = (values) => {
        // let values = "" // {"_id":"..."}
        API_FEED.POST_DELETE_EVENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_EVENT()

                //request successfully
            }
        })
    }

    API_GET_EVENT = () => {
        API_FEED.GET_EVENT()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                // const tmp = response.data.sort((a,b) => (moment(b.date).hour(moment(b.startTime).hour()).minute(moment(b.startTime).minute())).isBefore(moment(a.date).hour(moment(a.startTime).hour()).minute(moment(a.startTime).minute())))
               this.setState({data:response.data})
            }
        })
    }

    render () {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
            <span className="breadcrumb-admin">Announcement > Upcoming Events </span><br/>
            <Row>
                <Col span={12}> 
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        <span className="input-label">Event Name: </span>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input event name!' }]
                        })(
                            <Input id="event-name" className="event-input" placeholder="Event name" onBlur={this.handleConfirmBlur} />
                        )}
                        </Form.Item>
                        <Form.Item>
                        <span className="input-label">Date: </span>
                        {getFieldDecorator('date',{
                            initialValue:moment(),
                            rules: [{ required: true, message: 'Please select the date!' }]
                        })(
                        <DatePicker className="event-date" onChange={this.onChange} />
                        )}
                        </Form.Item>
                        <Form.Item style={{display:'inline-block'}}>
                        <span className="input-label">Start Time: </span>
                        {getFieldDecorator('startTime', {
                            rules: [{ required: true, message: 'Please select event starting time!' }]
                        })(
                            <TimePicker format={format}  onChange={this.onStartDateChange}/>
                        )}
                        </Form.Item>
                        <Form.Item style={{display:'inline-block'}}> 
                        <span className="input-label pad-left">End Time: </span>
                        {getFieldDecorator('endTime', {
                            rules: [{ required: true, message: 'Please select event ending time!' }]
                        })(
                        <TimePicker format={format} onChange={this.onEndDateChange}/>
                        )}
                        </Form.Item>
                        <Form.Item>
                        <span className="input-label">Place: </span>
                        {getFieldDecorator('location', {
                            rules: [{ required: true, message: 'Please input event place!' }]
                        })(
                        <Input id="event-place" className="event-input" placeholder="Place" onBlur={this.handleConfirmBlur}  />
                        )}
                        </Form.Item><br/>

                    <Form.Item className="row-submit-btn">
                        <div ref="addButtonGroup" className="add-group"> 
                            <Button className="submit-btn" htmlType="submit">Add new event</Button>
                        </div>
                        <div ref="editButtonGroup" className="edit-group hidden">
                            <Button className="submit-btn" onClick={this.editItem}>Save</Button>
                            <Button className="submit-btn pad-left" onClick={this.clearInput}>Clear</Button>
                        </div>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
            <br/>
            <Row>
                All upcoming events 
                <Popconfirm title="Are you sure you want to delete?" onConfirm={this.deleteItem} okText="Yes" cancelText="No">
                    <i className="material-icons delete-btn" onClick={this.deleteItem}>delete</i>
                </Popconfirm>

            </Row>
            <br/>
            {this.getEvent()}
            </div>
           
        )
    }
}
const EventForm = Form.create({ name: 'normal_login' })(Event);


class Announcement extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {"cate":"",
            "topic":"",
            currentId:null,
            checkboxList:[],
            "data":[]
        }
    }

    componentDidMount = () => {
        this.API_GET_ANNOUNCEMENT();
    }

    onCheckChange = (idx,e) => {
        console.log(idx,e);
        
        const { checkboxList } = this.state;
        const nextSelected = e.target.checked
          ? [...checkboxList, idx]
          : checkboxList.filter(t => t !== idx);
        console.log('You are interested in: ', nextSelected);
        this.setState({ checkboxList: nextSelected });
    }

    chooseItem = (option) => {

        this.props.form.setFieldsValue({
        "title":option.title,
        "description":option.description});
        this.setState({currentId:option._id})
        console.log(this.refs.addButtonGroup.classList);
        
        if(!this.refs.addButtonGroup.classList.contains("hidden"))
            this.refs.addButtonGroup.classList.add("hidden")
        this.refs.editButtonGroup.classList.remove("hidden")
    }

    clearInput = () => {
        this.refs.addButtonGroup.classList.remove("hidden")
        this.refs.editButtonGroup.classList.add("hidden")
        this.setState({currentId:""})
        this.props.form.setFieldsValue({
            "title":"",
            "description":""
            });
    }

 

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                
              this.API_ADD_ANNOUNCEMENT(values)
            }
          });

    }

    editItem = () => {
        let tmp =this.props.form.getFieldsValue()
        tmp["_id"] = this.state.currentId;
        this.API_UPDATE_ANNOUNCEMENT(tmp)
        console.log(tmp);
        
    }

    deleteItem = () => {
        const {checkboxList} = this.state;
        checkboxList.forEach((id) => {
            const val = {}
            val["_id"] = id
            this.API_DELETE_ANNOUNCEMENT(val)
        })
    }

    getAnnouncement = () => {
        const event = this.state.data.map((option,idx)=>
        <div className="div-item">
        <Row>
            <Col span={1}>
                <Checkbox onChange={(e) => this.onCheckChange(option._id,e)}>
                </Checkbox>     
            </Col>
            <Col span={23} className="item-group" > 
            <span onClick={() => this.chooseItem(option)}>
                <span className="item-span">Title: {option.title} </span><br/>
                <span className="item-span">Description: {option.description} </span><br/>                
            </span>
            </Col>
          
        </Row>
        </div>
        )
        return event;
    }

    API_ADD_ANNOUNCEMENT = (values) => {
        // let values = "" // {"title":"..", "description":".."}
        API_FEED.POST_ADD_ANNOUNCEMENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_ANNOUNCEMENT()

                //request successfully
            }
        })
    }

    API_UPDATE_ANNOUNCEMENT = (values) => {
        // let values = "" // {"_id":"...", "title":"..", "description":".."}
        API_FEED.POST_UPDATE_ANNOUNCEMENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_ANNOUNCEMENT()

                //request successfully
            }
        })
    }

    API_DELETE_ANNOUNCEMENT = (values) => {
        // let values = "" // {"_id":"..."}
        API_FEED.POST_DELETE_ANNOUNCEMENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_ANNOUNCEMENT()

                //request successfully
            }
        })
    }

    API_GET_ANNOUNCEMENT = () => {
        API_FEED.GET_ANNOUNCEMENT()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                
                this.setState({data:response.data})
            }
        })
    }

    render () {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
            <span className="breadcrumb-admin">Announcement > Announcement </span><br/>
            <Row>
                <Col span={15}> 
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        <span className="input-label">Title: </span>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input assignment title!' }]
                        })(
                        <TextArea className="event-input" placeholder="Title" onBlur={this.handleConfirmBlur}  autosize />
                        )}
                        </Form.Item>
                        <Form.Item>
                        <span className="input-label">Description: </span>
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please input assignment description!' }]
                        })(
                        <TextArea className="event-input" placeholder="Description" onBlur={this.handleConfirmBlur}  autosize={{ minRows: 2, maxRows: 6 }}/>
                        )}
                        </Form.Item>
                        <Form.Item className="row-submit-btn">
                        <div ref="addButtonGroup" className="add-group"> 
                            <Button className="submit-btn" htmlType="submit">Add new announcement</Button>
                        </div>
                        <div ref="editButtonGroup" className="edit-group hidden">
                            <Button className="submit-btn" onClick={this.editItem}>Save</Button>
                            <Button className="submit-btn pad-left" onClick={this.clearInput}>Clear</Button>
                        </div>
                        </Form.Item>
                    </Form>
                    
                </Col>
            </Row>
            <br/>
            <Row>
                Announcement   
                <Popconfirm title="Are you sure you want to delete?" onConfirm={this.deleteItem} okText="Yes" cancelText="No">
                    <i className="material-icons delete-btn" onClick={this.deleteItem}>delete</i>
                </Popconfirm>

            </Row>
            <br/>
            {this.getAnnouncement()}
            </div>
           
        )
    }
}
const AnnouncementForm = Form.create({ name: 'assignment_form' })(Announcement);


class CompanyList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {"cate":"",
            "topic":"",
            currentId:null,
            checkboxList:[],
            "data":[],
            "allcat":VariableConfig.tagList

        }
    }

    componentDidMount = () => {
        this.API_GET_COMPANY();
    }

    handleSelectChange = (value) => {
        this.setState({"category":value})
        console.log(`selected ${value}`);
      }
      onCheckChange = (idx,e) => {
        console.log(idx,e);
        
        const { checkboxList } = this.state;
        const nextSelected = e.target.checked
          ? [...checkboxList, idx]
          : checkboxList.filter(t => t !== idx);
        console.log('You are interested in: ', nextSelected);
        this.setState({ checkboxList: nextSelected });
    }

    chooseItem = (option) => {
        this.props.form.setFieldsValue({
            "name":option.name,
            "url":option.url,
            "category":option.category});
        this.setState({currentId:option._id})
        console.log(this.refs.addButtonGroup.classList);
        
        if(!this.refs.addButtonGroup.classList.contains("hidden"))
            this.refs.addButtonGroup.classList.add("hidden")
        this.refs.editButtonGroup.classList.remove("hidden")
    }

    clearInput = () => {
        this.refs.addButtonGroup.classList.remove("hidden")
        this.refs.editButtonGroup.classList.add("hidden")
        this.setState({currentId:""})
        this.props.form.setFieldsValue({
            "name":"",
            "url":"",
            "category":[]});
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              this.API_ADD_COMPANY(values)
            }
          });
    }

    editItem = () => {
        let tmp =this.props.form.getFieldsValue()
        tmp["_id"] = this.state.currentId;
        this.API_UPDATE_COMPANY(tmp)
        console.log(tmp);
        
    }

    deleteItem = () => {
        const {checkboxList} = this.state;
        checkboxList.forEach((id) => {
            const val = {}
            val["_id"] = id
            this.API_DELETE_COMPANY(val)
        })
    }


    getComCat = (cat) =>{
        console.log("test");
        let catString = cat[0];
        for(let i =1;i<cat.length;i++){
            catString += ", "+cat[i]
        }
        console.log(catString);
        // let catSpan = <span>{catString}</span>
        return catString
    }

    getCompany = () => {
        const event = this.state.data.map((option,idx)=>
        <div className="div-item">
        <Row>
            <Col span={1}>
                <Checkbox onChange={(e) => this.onCheckChange(option._id,e)}>
                </Checkbox>    
            </Col>
            <Col span={23} className="item-group" > 
            <span onClick={() => this.chooseItem(option)}>
                <span className="item-span">Name: {option.name} </span><br/>
                <span className="item-span">URL: {option.url} </span><br/>    
                <span className="item-span">Category: {this.getComCat(option.category)} </span><br/>                
            
            </span>
            </Col>
          
        </Row>
        </div>
        )
        return event;
    }
    
    getCat = () =>{
        const cat = this.state.allcat.map((option)=>
        <Option key={option}>{option}</Option>
        )
        return cat
    }

    API_ADD_COMPANY = (values) => {
        // let values = "" // {"name":"..", "url":"..", "category":["application", "network",...]}
        API_FEED.POST_ADD_COMPANY(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_COMPANY()

                //request successfully
            }
        })
    }

    API_UPDATE_COMPANY= (values) => {
        // let values = "" // {"_id":"...", "name":"..", "url":"..", "category":["application", "network",...]}
        API_FEED.POST_UPDATE_COMPANY(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_COMPANY()

                //request successfully 
            }
        })
    }

    API_DELETE_COMPANY = (values) => {
        // let values = "" // {"_id":"..."}
        API_FEED.POST_DELETE_COMPANY(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.API_GET_COMPANY()
                //request successfully
            }
        })
    }

    API_GET_COMPANY = () => {
        API_FEED.GET_COMPANY()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({data:response.data})
                //request successfully
                //response.data
            }
        })
    }

    render () {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
            <span className="breadcrumb-admin">Announcement > Company Lists </span><br/>
            <Row>
                <Col span={12}> 
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        <span className="input-label">Name: </span>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input company name!' }]
                        })(
                        <Input className="event-input" placeholder="Name" onBlur={this.handleConfirmBlur}  />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">Url: </span>
                        {getFieldDecorator('url', {
                            rules: [{ required: true, message: 'Please input url!' }]
                        })(
                        <Input className="event-input" placeholder="Url" onBlur={this.handleConfirmBlur} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">Category: </span>
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: 'Please select category!' }]
                        })(
                            <Select
                                mode="multiple"
                                style={{ width: '80%' }}
                                placeholder="Please select"
                                onChange={this.handleSelectChange}
                            >
                                {this.getCat()}
                            </Select>
                        )}
                    </Form.Item>

                    <br/>
                        <Form.Item className="row-submit-btn">
                        <div ref="addButtonGroup" className="add-group"> 
                            <Button className="submit-add-btn" htmlType="submit">Add new company</Button>
                        </div>
                        <div ref="editButtonGroup" className="edit-group hidden">
                            <Button className="submit-btn" onClick={this.editItem}>Save</Button>
                            <Button className="submit-btn pad-left" onClick={this.clearInput}>Clear</Button>
                        </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <br/>
            <Row>
                Company Lists   
                <Popconfirm title="Are you sure you want to delete?" onConfirm={this.deleteItem} okText="Yes" cancelText="No">
                    <i className="material-icons delete-btn" onClick={this.deleteItem}>delete</i>
                </Popconfirm>

            </Row>
            <br/>
            {this.getCompany()}
            </div>
           
        )
    }
}

const CompanyListForm = Form.create({ name: 'companylist_form' })(CompanyList);

class Faq extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {"cate":"",
            "topic":"",
            currentId:null,
            checkboxList:[],
            "data":[]
        }
    }

    componentDidMount = () => {
        this.API_GET_FAQ();
    }

    onCheckChange = (idx,e) => {
        console.log(idx,e);
        
        const { checkboxList } = this.state;
        const nextSelected = e.target.checked
          ? [...checkboxList, idx]
          : checkboxList.filter(t => t !== idx);
        console.log('You are interested in: ', nextSelected);
        this.setState({ checkboxList: nextSelected });
    }

    chooseItem = (option) => {
        this.props.form.setFieldsValue({
            "question":option.question,
            "answer":option.answer});
        this.setState({currentId:option._id})
        console.log(this.refs.addButtonGroup.classList);
        
        if(!this.refs.addButtonGroup.classList.contains("hidden"))
            this.refs.addButtonGroup.classList.add("hidden")
        this.refs.editButtonGroup.classList.remove("hidden")
    }

    clearInput = () => {
        this.refs.addButtonGroup.classList.remove("hidden")
        this.refs.editButtonGroup.classList.add("hidden")
        this.setState({currentId:""})
        this.props.form.setFieldsValue({
            "question":"",
            "answer":""});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              this.API_POST_ADD(values)
            }
          });

    }
    editItem = () => {
        let tmp =this.props.form.getFieldsValue()
        tmp["_id"] = this.state.currentId;
        this.API_POST_UPDATE(tmp)
        console.log(tmp);
        
    }

    deleteItem = () => {
        const {checkboxList} = this.state;
        checkboxList.forEach((id) => {
            const val = {}
            val["_id"] = id
            this.API_POST_DELETE(val)
        })
    }


    getFAQ = () => {
        const event = this.state.data.map((option,idx)=>
        <div className="div-item">
        <Row>
            <Col span={1}>
                <Checkbox onChange={(e) => this.onCheckChange(option._id,e)}>
                </Checkbox>    
            </Col>
            <Col span={23} className="item-group" > 
            <span onClick={() => this.chooseItem(option)}>
                <span className="item-span">Question: {option.question} </span><br/>
                <span className="item-span">Answer: {option.answer} </span><br/>                
            </span>
            </Col>
          
        </Row>
        </div>
        )
        return event;
    }

    API_POST_ADD = (values) => {
        // let values = "" // {"question": "...", "answer": "..."}
        API_FAQ.POST_ADD(values)
        .then(response => {
            if(response.code === 1){
              console.log(response)
              this.API_GET_FAQ()
              // request successfully
            }
        })
    }

    API_POST_UPDATE = (values) => {
        // let values = "" // {"_id": "...", "question": "...", "answer": "..."}
        API_FAQ.POST_UPDATE(values)
        .then(response => {
            if(response.code === 1){
              console.log(response)
              this.API_GET_FAQ()

              // request successfully
            }
        })
    }

    API_POST_DELETE = (values) => {
        // let values = "" // {"_id": "..."}
        API_FAQ.POST_DELETE(values)
        .then(response => {
            if(response.code === 1){
              console.log(response)
              this.API_GET_FAQ()

              // request successfully
            }
        })
    }

    API_GET_FAQ = () => {
        API_FAQ.GET_FAQ()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({data:response.data})
              
            }
        })
    }

    render () {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
            <span className="breadcrumb-admin">FAQs > FAQ Lists </span><br/>
            <Row>
                <Col span={15}> 
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        <span className="input-label">Question: </span>
                        {getFieldDecorator('question', {
                            rules: [{ required: true, message: 'Please input question!' }]
                        })(
                        <TextArea className="event-input" placeholder="Question" onBlur={this.handleConfirmBlur}  autosize />
                        )}
                        </Form.Item>
                        <Form.Item>
                        <span className="input-label">Answer: </span>
                        {getFieldDecorator('answer', {
                            rules: [{ required: true, message: 'Please input answer!' }]
                        })(
                        <TextArea className="event-input" placeholder="Answer" onBlur={this.handleConfirmBlur}  autosize={{ minRows: 2, maxRows: 6 }}/>
                        )}
                    </Form.Item>
                    <Form.Item className="row-submit-btn">
                        <div ref="addButtonGroup" className="add-group"> 
                            <Button className="submit-btn" htmlType="submit">Add new faq</Button>
                        </div>
                        <div ref="editButtonGroup" className="edit-group hidden">
                            <Button className="submit-btn" onClick={this.editItem}>Save</Button>
                            <Button className="submit-btn pad-left" onClick={this.clearInput}>Clear</Button>
                        </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <br/>
            <Row>
                FAQ Lists   
                <Popconfirm title="Are you sure you want to delete?" onConfirm={this.deleteItem} okText="Yes" cancelText="No">
                    <i className="material-icons delete-btn" onClick={this.deleteItem}>delete</i>
                </Popconfirm>

            </Row>
            <br/>
            {this.getFAQ()}
            </div>
           
        )
    }
}
const FaqForm = Form.create({ name: 'faq_form' })(Faq);


class Process extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {columns : [{
            title: 'Assignment',
            dataIndex: 'assignment',
            render: (text,data) =>   <Link style={{ textDecoration: 'none' }} to={`/admin/process/assignment/${data.key}`}>{text}</Link>
          },  {
            title: 'Deadline',
            dataIndex: 'deadline',
          }],
          data : [{
            key: '1',
            assignment:'aaaaaaaaaaaaa',
            deadline: moment(),
          }]

        }
    }

    
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
    };

    API_POST_YEAR = (year) => {
        /* to get all assignment in that year */
        API_ADMIN.POST_YEAR(year)
        .then(response => {
            if(response.code === 1){
                /* get latest year */
            }
        })
    }

    API_POST_DELETE_ID_PROCESS = (id) => {
        /* id = "20180408235902" */
        API_ADMIN.POST_DELETE(id)
        .then(response => {
            if(response.code === 1){

            }
        })
    }

    API_GET_YEAR_ASSIGNMENT = () => {
        API_ADMIN.GET_YEAR_ASSIGNMENT()
        .then(response => {
            if(response.code === 1){

            }
        })
    }

    componentDidMount = () => {
        let currentYear = (new Date()).getYear() - 50
        this.API_POST_YEAR(currentYear)
        this.API_GET_YEAR_ASSIGNMENT() // all years for assignment
    }

    render () {
        return (
            <div>  
                <span className="breadcrumb-admin">Process > Assignments </span><br/>
                <Button className="btn-newas"><Link to="/admin/process/assignment/add">Add new assignment</Link></Button>
                <Table rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data} />,
            </div>
        )
    }
}

class EachProcess extends React.Component {
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
      }

    state = {
        loading: false,
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
            }));
        }
    }
    
    API_POST_ID_PROCESS = (id) => {
        API_ADMIN.POST_ID_PROCESS(id)
        .then(response => {
            if(response.code === 1){

            }
        })
    }

    API_POST_DELETE_ID_PROCESS = (id) => {
        API_ADMIN.POST_DELETE(id)
        .then(response => {
            if(response.code === 1){

            }
        })
    }

    componentDidMount = () => {
        /* PALM NEEDS BAIVARN's HELP HERE */
        let id = "20180408235902" /* id of each process */
        this.API_POST_ID_PROCESS(id)
    }
    
    render() {
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const imageUrl = this.state.imageUrl;
        return (
            <div>  
                <span className="breadcrumb-admin">Process > <Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/assignment"> Assignment </Link> > {this.props.match.params.idProcess}</span><br/>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
            </div>
        )
    }
}

let id = 1;

class AddProcess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
    }

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
          return;
        }
    
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
      }
    
      add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++)
        form.setFieldsValue({
          keys: nextKeys,
        });
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { keys, title , option,assignmentDescription, assignmentName,deadline } = values;
            console.log('Received values of form: ', values);
            const tmp = keys.map(key => ({"title":title[key],"option":option[key],"data":""}));
            const params = {
                "id" : moment().format('YYYYMMDDHHmmss'),
                "assignmentName" : assignmentName,
                "assignmentDescription" : assignmentDescription,
                "status" : 0,
                "statusDescription" : "missing",
                "submitDate" : "",
                "deadline" : deadline,
                "defaultForm" : 0,
                "requireIdSubmit" : [],
                "requireIdSubmitData" : [],
                "formData" : tmp,
                "year" : 59
            }
            console.log(params);
            this.API_POST_NEW(params)
          }
        });
      }
    
    // moreQuestion = () => {
    //     let tmpArr = this.state.questionSet.concat(this.state.questionSet.length+1)
    //     this.setState({questionSet:tmpArr})
    // }

    API_POST_NEW = (params) => {
        /*
            id = concate year month day hr min sec
            status: 0 = missing, 1 = turned in, -1 = late
            params = {
                "id" : "20190408235901",
                "assignmentName" : "ฟอร์ม 2019_2",
                "assignmentDescription" : "",
                "status" : 0,
                "statusDescription" : "missing",
                "submitDate" : "",
                "deadline" : "2019-04-08T03:53:24.073Z",
                "defaultForm" : 0,
                "requireIdSubmit" : [],
                "formData" : [
                    {"title": "firstname", "option": "short", "data": "kanokpol"},
                    {"title": "lastname", "option": "multiple", "data": "kulsri"},
                    {"title": "logo", "option": "upload", "data": {...pdf format...} },
                ],
                "year" : 59
            }
        */
       API_ADMIN.POST_NEW(params)
       .then(response => {
           if(response.code === 1){
                console.log(response);
                
           }
       })
    }

    

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (

        <div>
            {console.log(k)}

            <Form.Item required={false} key={k}>
            <span className="input-label">Question {index+1}: </span>
            {getFieldDecorator(`title[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input question or delete this field.",
              }],
            })(
                <Input className="question event-input" placeholder="Question" />
            )}
            
          </Form.Item>
         <Form.Item style={{display:'inline-block'}}>
            <span className="input-label">Answer Type: </span>
            {getFieldDecorator(`option[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: "short",
              rules: [{
                required: true,
                message: "Please select question type or delete this field.",
              }],
            })(
                <Select style={{ width: 200 }}>
                    <Option value="short">Short Answer</Option>
                    <Option value="multiple">Multiple Line</Option>
                    <Option value="upload">File Upload</Option>
                </Select>            )}
                    
        </Form.Item>
          {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
        </div>
      
        ));

        return (
            <div>  
                <span className="breadcrumb-admin">Process > <Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/assignment"> Assignment </Link> > New Assignment</span><br/>
                <Row>
                <Col span={12}> 
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <span className="input-label">Assignment Name: </span>
                        {getFieldDecorator('assignmentName', {
                            rules: [{ required: true, message: 'Please input answer!' }]
                        })(
                        <Input className="assignment-name" placeholder="Assignment Name" onBlur={this.handleConfirmBlur}  />
                        )}
                    </Form.Item> 
                    <Form.Item>                        
                        <span className="input-label">Assignment Description: </span>
                        {getFieldDecorator('assignmentDescription', {
                            rules: [{ required: true, message: 'Please input answer!' }]
                        })(
                        <TextArea className="assignment-desc" placeholder="Description" onBlur={this.handleConfirmBlur} autosize />
                        )}
                    </Form.Item>
                    <Form.Item>                        
                        <span className="input-label">Assignment Deadline: </span>
                        {getFieldDecorator('deadline', {
                            initialValue:moment(),
                            rules: [{ required: true, message: 'Please input deadline!' }]
                        })(
                            <DatePicker className="event-date" onChange={this.onChange} />
                            )}
                    </Form.Item><br/>
                     
                        {
                            formItems
                        }
                        <Form.Item>
                            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>Add question</Button>
                        </Form.Item><br/>
                        <Form.Item>
                            <Button htmlType="submit">Create assignment</Button>
                        </Form.Item>
                   </Form>

                </Col>
                </Row>
            </div>
        )
    }
}

const AddProcessForm = Form.create({ name: 'addprocess_form' })(AddProcess);


class StudentReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {columns : [{
            title: 'Name',
            dataIndex: 'name',
          },  {
            title: 'Assignment',
            dataIndex: 'assignment',
          }],
          data : [{
            key: '1',
            assignment:'aaaaaaaaaaaaa',
            name: 'Thanjira Sukkree',
          }]
        }
    }


    API_POST_STUDENT_YEAR = (year) => {
        API_STUDENT.POST_STUDENT_YEAR(year)
        .then(response => {
            if(response.code === 1){
                console.log(response)
            }
        })
    }

    componentDidMount = () => {
        let currentYear = (new Date()).getYear() - 50
        this.API_POST_STUDENT_YEAR(currentYear)
    }

    render () {
        return (
            <div>  
                <span className="breadcrumb-admin">Process > Student Report </span><br/>
                 <Table columns={this.state.columns} dataSource={this.state.data} />,
            </div>
        )
    }
}
export default Admin