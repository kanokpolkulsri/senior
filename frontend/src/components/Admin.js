import React from 'react'
import {Row, Col, Select, Icon, Input, Button, DatePicker,TimePicker,Checkbox   } from 'antd';
import {  Route, Switch, Link, Redirect} from 'react-router-dom'
import moment from 'moment';

import '../css/Admin.css';
import '../css/App.css';

const { TextArea } = Input;
const format = 'HH:mm';
const Option = Select.Option;
const API_FEED = require('../api/Feed')
const API_FAQ = require('../api/Faq')

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
        }
        else if(this.props.match.params.cate === "announcement"){
            var tmp= this.props.match.params.topic
            this.refs[tmp].classList.add("active")
            console.log(this.refs[tmp].innerHTML) 
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
                            <Route path="/admin/faq" component={Faq}/>
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
            "date":moment(),
            "name":"",
            "place":"",
            "data":[ 
                {
                    "name" : "Getting to know more about Wongnai",
                    "location" : "E203",
                    "date" :"2019-02-02T16:00:00.000Z",
                    "register" : 20
                }, 
                {
                    "name" : "CPSK Job Fair",
                    "location" : "1st floor",
                    "date" : "2019-02-02T16:00:00.000Z",
                    "register" : 178
                }
            ]
        }
    }

    onChange = (date, dateString) => {
        this.setState({"date":date})
    }

    onCheckChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    chooseItem = (option) => {

        this.setState({"date":moment(option.date),
        "name":option.name,
        "place":option.location});
   
        
        console.log(document.getElementById("event-name"))
    }

    submitItem = () => {
    
    }

    deleteItem = () => {
        
    }

    getEvent = () => {
        const event = this.state.data.map((option,idx)=>
        <div className="div-item">
        <Row>
            <Col span={1}>
                <Checkbox onChange={this.onCheckChange}>
                </Checkbox>    
            </Col>
            <Col span={23} className="item-group" > 
            <span onClick={() => this.chooseItem(option)}>
                <span className="item-span">Company: {option.name} </span><br/>
                <span className="item-span">Place: {option.location} </span><br/>
                <span className="item-span">Date: {option.date}</span><br/>
                <span className="item-span">Interested people: {option.register} people</span><br/>
                <span className="item-span">status: </span><br/>
            </span>
            </Col>
          
        </Row>
        </div>
        )
        return event;
    }

    API_ADD_EVENT = () => {
        let values = "" // {"name":"..", "location":"..", "date":ISODate("2019-02-04T16:00:00.000Z"), "register": 0}
        API_FEED.POST_ADD_EVENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
            }
        })
    }

    API_UPDATE_EVENT = () => {
        let values = "" // {"_id":"...", "name":"..", "location":"..", "date":ISODate("2019-02-04T16:00:00.000Z"), "register": 0}
        API_FEED.POST_UPDATE_EVENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
            }
        })
    }

    API_DELETE_EVENT = () => {
        let values = "" // {"_id":"..."}
        API_FEED.POST_DELETE_EVENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
            }
        })
    }

    API_GET_EVENT = () => {
        API_FEED.GET_EVENT()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
                //response.data
                /*
                    data = [
                        {
                            "_id": "5c852a4aa7cd113ae7508724",
                            "name": "Getting to know more about Wongnai",
                            "location": "E203",
                            "date": "2019-02-04T16:00:00.000Z",
                            "register": 21
                        },
                        {
                            "_id": "5c852a4fa7cd113ae7508727",
                            "name": "CPSK Job Fair",
                            "location": "1st floor",
                            "date": "2019-02-02T16:00:00.000Z",
                            "register": 178
                        }
                    ]
                */
            }
        })
    }

    render () {
        return (
            <div>
            <span className="breadcrumb-admin">Announcement > Upcoming Events </span><br/>
            <Row>
                <Col span={12}> 
                    <Row>
                        <span className="input-label">Event Name: </span>
                            <Input id="event-name" className="event-input" placeholder="Event name" onBlur={this.handleConfirmBlur} value={this.state.name} />
                    </Row> <br/>
                    <Row>
                        <span className="input-label">Date: </span><DatePicker className="event-date" onChange={this.onChange} value={this.state.date}/>
                    </Row><br/>
                    <Row>
                        <span className="time-input-label">Start Time: </span><TimePicker defaultValue={moment('00:00', format)} format={format} />
                        <span className="time-input-label pad-left">End Time: </span><TimePicker defaultValue={moment('00:00', format)} format={format} />

                    </Row> <br/>
                    <Row>
                        <span className="input-label">Place: </span>
                        <Input id="event-place" className="event-input" placeholder="Place" onBlur={this.handleConfirmBlur} value={this.state.place} />
                    </Row>
                    <br/>
                    <Row className="row-submit-btn">
                        <Button className="submit-btn" onClick={this.submitItem}>Submit</Button>
                    </Row>
                </Col>
            </Row>
            <br/>
            <Row>
                All upcoming events <i className="material-icons delete-btn" onClick={this.deleteItem}>delete</i>
            </Row>
            <br/>
            {this.getEvent()}
            </div>
           
        )
    }
}
class Announcement extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {"cate":"",
            "topic":"",
            "title":"",
            "description":"",
            "data":[ 
                {"_id":{"$oid":"5c852a6aa7cd113ae7508736"},"title":"1. แจ้งเตือนการจัดส่งเอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)","description":"หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)\n1. ซองบรรจุชุดเอกสารต่างๆ (ที่ได้รับในวันปฐมนิเทศ) พร้อมกรอกข้อมูลให้เรียบร้อย\n2. แบบประเมินผลนิสิตจากสถานประกอบการ (ใส่ซองปิดผนึก)\n3. แบบประเมินรายงานจากสถานประกอบการ (ใส่ซองปิดผนึก)\n4. รูปเล่มรายงานการฝึกสหกิจศึกษา (ภาษาอังกฤษ)\nโดยเอกสารทั้งหมดให้จัดส่งที่ ** ห้องธุรการ ภาควิชาฯ ** ที่เดียวเท่านั้น"},
                {"_id":{"$oid":"5c852a6ea7cd113ae7508739"},"title":"2. เอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)","description":"หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)"}
            ]
        }
    }


    onCheckChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    chooseItem = (option) => {

        this.setState({"title":option.title,
        "description":option.description});
    }

    submitItem = () => {

    }

    deleteItem = () => {

    }
    getAnnouncement = () => {
        const event = this.state.data.map((option,idx)=>
        <div className="div-item">
        <Row>
            <Col span={1}>
                <Checkbox onChange={this.onCheckChange}>
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

    API_ADD_ANNOUNCEMENT = () => {
        let values = "" // {"title":"..", "description":".."}
        API_FEED.POST_ADD_ANNOUNCEMENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
            }
        })
    }

    API_UPDATE_ANNOUNCEMENT = () => {
        let values = "" // {"_id":"...", "title":"..", "description":".."}
        API_FEED.POST_UPDATE_ANNOUNCEMENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
            }
        })
    }

    API_DELETE_ANNOUNCEMENT = () => {
        let values = "" // {"_id":"..."}
        API_FEED.POST_DELETE_ANNOUNCEMENT(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
            }
        })
    }

    API_GET_ANNOUNCEMENT = () => {
        API_FEED.GET_ANNOUNCEMENT()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
                //response.data
                /*
                    data = "data": [
                        {
                            "_id": "5c852a6aa7cd113ae7508736",
                            "title": "1. แจ้งเตือนการจัดส่งเอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)",
                            "description": "หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)\n1. ซองบรรจุชุดเอกสารต่างๆ (ที่ได้รับในวันปฐมนิเทศ) พร้อมกรอกข้อมูลให้เรียบร้อย\n2. แบบประเมินผลนิสิตจากสถานประกอบการ (ใส่ซองปิดผนึก)\n3. แบบประเมินรายงานจากสถานประกอบการ (ใส่ซองปิดผนึก)\n4. รูปเล่มรายงานการฝึกสหกิจศึกษา (ภาษาอังกฤษ)\nโดยเอกสารทั้งหมดให้จัดส่งที่ ** ห้องธุรการ ภาควิชาฯ ** ที่เดียวเท่านั้น"
                        },
                        {
                            "_id": "5c852a6ea7cd113ae7508739",
                            "title": "2. เอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)",
                            "description": "หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)"
                        }
                    ]
                */
            }
        })
    }

    render () {
        return (
            <div>
            <span className="breadcrumb-admin">Announcement > Announcement </span><br/>
            <Row>
                <Col span={15}> 
                    <Row>
                        <span className="input-label">Title: </span>
                        <TextArea className="event-input" placeholder="Title" onBlur={this.handleConfirmBlur} value={this.state.title} autosize />
                    </Row> <br/>
                    <Row>
                        <span className="input-label">Description: </span>
                        <TextArea className="event-input" placeholder="Description" onBlur={this.handleConfirmBlur} value={this.state.description} autosize={{ minRows: 2, maxRows: 6 }}/>
                    </Row>
                    <br/>
                    <Row className="row-submit-btn">
                        <Button className="submit-btn" onClick={this.submitItem}>Submit</Button>
                    </Row>
                </Col>
            </Row>
            <br/>
            <Row>
                Announcement <i className="material-icons delete-btn" onClick={this.deleteItem}>delete</i>
            </Row>
            <br/>
            {this.getAnnouncement()}
            </div>
           
        )
    }
}

class CompanyList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {"cate":"",
            "topic":"",
            "name":"",
            "url":"",
            "category":[],
            "data":[ 
                {"_id":{"$oid":"5c852a90a7cd113ae7508746"},"name":"บริษัท เอ-โอสต์ จำกัด","url":"kanokpolkulsri.netlify.com","category":["application","network","datascience","consulting","iot","etc"]},
                {"_id":{"$oid":"5c852a9ba7cd113ae750874a"},"name":"บริษัท พรีเมียร์ เอ็ดดูเคชั่น จำกัด","url":"www.facebook.com/ton2plam","category":["application","consulting","iot","etc"]},
                {"_id":{"$oid":"5c852aa6a7cd113ae750874e"},"name":"บริษัท อัฟวาแลนท์ จำกัด","url":"github.com/ton2plam","category":["network","datascience","etc"]},
                {"_id":{"$oid":"5c852aaba7cd113ae7508751"},"name":"บริษัท แม็กซิม อินทริเกรดเต็ด โปรดักส์ (ประเทศไทย) จำกัด","url":"www.instagram.com/tonplamm","category":["datascience","etc"]} 
            ],
            "allcat":["application","network","datascience","consulting","iot","etc"]

        }
    }

    handleSelectChange = (value) => {
        this.setState({"category":value})
        console.log(`selected ${value}`);
      }
    onCheckChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    chooseItem = (option) => {
        this.setState({"name":option.name,
        "url":option.url,
        "category":option.category
    });
    }

    submitItem = () => {

    }

    deleteItem = () => {

    }

    getComCat = (cat) =>{
        console.log("test");
        var catString = cat[0];
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
                <Checkbox onChange={this.onCheckChange}>
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

    API_ADD_COMPANY = () => {
        let values = "" // {"name":"..", "url":"..", "category":["application", "network",...]}
        API_FEED.POST_ADD_COMPANY(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
            }
        })
    }

    API_UPDATE_COMPANY= () => {
        let values = "" // {"_id":"...", "name":"..", "url":"..", "category":["application", "network",...]}
        API_FEED.POST_UPDATE_COMPANY(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully 
            }
        })
    }

    API_DELETE_COMPANY = () => {
        let values = "" // {"_id":"..."}
        API_FEED.POST_DELETE_COMPANY(values)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
            }
        })
    }

    API_GET_COMPANY = () => {
        API_FEED.GET_COMPANY()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully
                //response.data
                /*
                    data = [
                        {
                            "_id": "5c852a90a7cd113ae7508746",
                            "name": "บริษัท เอ-โอสต์ จำกัด",
                            "url": "kanokpolkulsri.netlify.com",
                            "category": [
                                "application",
                                "network",
                                "datascience",
                                "consulting",
                                "iot",
                                "etc"
                            ]
                        },
                        {
                            "_id": "5c852a9ba7cd113ae750874a",
                            "name": "บริษัท พรีเมียร์ เอ็ดดูเคชั่น จำกัด",
                            "url": "www.facebook.com/ton2plam",
                            "category": [
                                "application",
                                "consulting",
                                "iot",
                                "etc"
                            ]
                        }
                    ]
                */
            }
        })
    }

    render () {
        return (
            <div>
            <span className="breadcrumb-admin">Announcement > Company Lists </span><br/>
            <Row>
                <Col span={12}> 
                    <Row>
                        <span className="input-label">Name: </span>
                        <Input className="event-input" placeholder="Name" onBlur={this.handleConfirmBlur} value={this.state.name}  />
                    </Row> <br/>
                    <Row>
                        <span className="input-label">Url: </span>
                        <Input className="event-input" placeholder="Url" onBlur={this.handleConfirmBlur} value={this.state.url}/>
                    </Row><br/>
                    <Row>
                        <span className="input-label">Category: </span>
                            <Select
                                mode="multiple"
                                style={{ width: '80%' }}
                                value={this.state.category}
                                placeholder="Please select"
                                onChange={this.handleSelectChange}
                            >
                                {this.getCat()}
                            </Select>
                 
                    </Row>
                    <br/>
                    <Row className="row-submit-btn">
                        <Button className="submit-btn" onClick={this.submitItem}>Submit</Button>
                    </Row>
                </Col>
            </Row>
            <br/>
            <Row>
                Company Lists <i className="material-icons delete-btn" onClick={this.deleteItem}>delete</i>
            </Row>
            <br/>
            {this.getCompany()}
            </div>
           
        )
    }
}

class Faq extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {"cate":"",
            "topic":"",
            "question":"",
            "answer":"",
            "data":[ 
                {"_id":{"$oid":"5c852a6aa7cd113ae7508736"},"question":"1. แจ้งเตือนการจัดส่งเอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)","answer":"หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)\n1. ซองบรรจุชุดเอกสารต่างๆ (ที่ได้รับในวันปฐมนิเทศ) พร้อมกรอกข้อมูลให้เรียบร้อย\n2. แบบประเมินผลนิสิตจากสถานประกอบการ (ใส่ซองปิดผนึก)\n3. แบบประเมินรายงานจากสถานประกอบการ (ใส่ซองปิดผนึก)\n4. รูปเล่มรายงานการฝึกสหกิจศึกษา (ภาษาอังกฤษ)\nโดยเอกสารทั้งหมดให้จัดส่งที่ ** ห้องธุรการ ภาควิชาฯ ** ที่เดียวเท่านั้น"},
                {"_id":{"$oid":"5c852a6ea7cd113ae7508739"},"question":"2. เอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)","answer":"หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)"}
            ]
        }
    }

    onCheckChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    chooseItem = (option) => {

        this.setState({"question":option.question,
        "answer":option.answer});
    }

    submitItem = () => {

    }

    deleteItem = () => {

    }

    getFAQ = () => {
        const event = this.state.data.map((option,idx)=>
        <div className="div-item">
        <Row>
            <Col span={1}>
                <Checkbox onChange={this.onCheckChange}>
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

    API_POST_ADD = () => {
        let values = "" // {"question": "...", "answer": "..."}
        API_FAQ.POST_ADD(values)
        .then(response => {
            if(response.code === 1){
              console.log(response)
              // request successfully
            }
        })
    }

    API_POST_UPDATE = () => {
        let values = "" // {"_id": "...", "question": "...", "answer": "..."}
        API_FAQ.POST_UPDATE(values)
        .then(response => {
            if(response.code === 1){
              console.log(response)
              // request successfully
            }
        })
    }

    API_POST_DELETE = () => {
        let values = "" // {"_id": "..."}
        API_FAQ.POST_DELETE(values)
        .then(response => {
            if(response.code === 1){
              console.log(response)
              // request successfully
            }
        })
    }

    API_GET_FAQ = () => {
        API_FAQ.GET_FAQ()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully

                //response.data
                /*
                data = [
                    {
                        answer: "ได้ แต่ต้องได้รับการพิจารณาจากอาจารย์ผู้รับผิดชอบ",
                        question: "สามารถฝึกงานในตำแหน่งที่ไม่เกี่ยวข้องกับโปรแกรมมิ่งได้หรือไม่",
                        _id: "5c9e15341a28591c19fb41f4"
                    },
                    {
                        answer: "ได้ แต่ต้องได้รับการพิจารณาจากอาจารย์ผู้รับผิดชอบ",
                        question: "หากมีการลาขณะฝึกงานเกิดจำนวนวันที่กำหนด สามารถทำงานเพิ่มเติมชดเชยวันที่ลาได้หรือไม่",
                        _id: "5c9e15881a28591c19fb41fc"
                    }
                ]
                */

            }
        })
    }

    render () {
        return (
            <div>
            <span className="breadcrumb-admin">FAQs > FAQ Lists </span><br/>
            <Row>
                <Col span={15}> 
                    <Row>
                        <span className="input-label">Question: </span>
                        <TextArea className="event-input" placeholder="Question" onBlur={this.handleConfirmBlur} value={this.state.question} autosize />
                    </Row> <br/>
                    <Row>
                        <span className="input-label">Answer: </span>
                        <TextArea className="event-input" placeholder="Answer" onBlur={this.handleConfirmBlur} value={this.state.answer} autosize={{ minRows: 2, maxRows: 6 }}/>
                    </Row>
                    <br/>
                    <Row className="row-submit-btn">
                        <Button className="submit-btn" onClick={this.submitItem}>Submit</Button>
                    </Row>
                </Col>
            </Row>
            <br/>
            <Row>
                FAQ Lists <i className="material-icons delete-btn" onClick={this.deleteItem}>delete</i>
            </Row>
            <br/>
            {this.getFAQ()}
            </div>
           
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