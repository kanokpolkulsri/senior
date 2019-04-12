import React from 'react'
import {Row, Col, Select,Radio, Table , Input, Button, DatePicker,TimePicker,Checkbox,Upload, Icon, message    } from 'antd';
import {  Route, Switch, Link, Redirect} from 'react-router-dom'
import moment from 'moment';

import '../css/Admin.css';
import '../css/App.css';

const { TextArea } = Input;
const format = 'HH:mm';
const Option = Select.Option;
const API_FEED = require('../api/Feed')
const API_FAQ = require('../api/Faq')
const API_ADMIN = require('../api/Assignment_Admin')
const API_STUDENT = require('../api/Assignment_Student')

const VariableConfig = require('../api/VariableConfig')

// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {"cate":"",
        "topic":"",
        process:["test"]
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
        else if(this.props.match.params.cate === "process"){
            var tmp = this.props.match.params.topic
            console.log(tmp);
            
            if(tmp === null || tmp === undefined)
                this.refs["report"].classList.add("active")
            else
                this.refs[tmp].classList.add("active")
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
                         
                            </span>
                            <ul className="menu-ul">
                                <Link style={{ textDecoration: 'none' }} to="/admin/process/report" ><li ref="report" className="menu-li">Report</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/admin/process/assignment" ><li ref="assignment" className="menu-li">Assignment</li></Link>
                            </ul>
                        </div>
                    </Col>
                    <Col span={18} className="admin-workarea" >

                        <Switch>
                            <Route path="/admin/announcement/event" component={Event}/>
                            <Route path="/admin/announcement/announcement" component={Announcement}/>
                            <Route path="/admin/announcement/companylist" component={CompanyList}/>
                            <Route path="/admin/faq" component={Faq}/>
                            <Route path="/admin/process/report" component={StudentReport}/>
                            <Route exact path="/admin/process/assignment" component={Process}/>
                            <Route path="/admin/process/assignment/add" component={AddProcess}/>
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
            "date":moment(),
            "name":"",
            "place":"",
            "data":[]
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

    calStatus = (date) => {
        var tmpRes = "";
        if(moment(date).isBefore(moment()))
            tmpRes = <span className="upcoming">Upcoming</span>
        else if(moment(date).isAfter(moment()))
            tmpRes = <span className="outdate">Outdate</span>
        else
            tmpRes = <span>-</span>
        return tmpRes
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
                <span className="item-span">Date: {moment(option.date).format('l')}</span><br/>
                <span className="item-span">Interested people: {option.register} people</span><br/>
                <span className="item-span">status: {() => this.calStatus(option.date)}</span><br/>
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
               this.setState({data:response.data})
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
            {this.getEvent}
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
            "data":[]
        }
    }

    componentDidMount = () => {
        this.API_GET_ANNOUNCEMENT();
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
                
                this.setState({data:response.data})
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
                this.setState({data:response.data})
                //request successfully
                //response.data
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
            "data":[]
        }
    }

    componentDidMount = () => {
        this.API_GET_FAQ();
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
                this.setState({data:response.data})
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
        API_ADMIN.API_POST_DELETE_ID_PROCESS(id)
        .then(response => {
            if(response.code === 1){

            }
        })
    }

    componentDidMount = () => {
        let currentYear = (new Date()).getYear() - 50
        this.API_POST_YEAR(currentYear)
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

class AddProcess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            questionSet:[1]
        }
    }
    // onChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     this.setState({
    //       value: e.target.value,
    //     });
    //     if(e.target.value === 1){
    //         this.refs['form-show'].classList.remove('hidden')
    //         this.refs['file-show'].classList.add('hidden')
    //     }
    //     else{
    //         this.refs['form-show'].classList.add('hidden')
    //         this.refs['file-show'].classList.remove('hidden')
    //     }
           
    //   }
    
    moreQuestion = () => {
        let tmpArr = this.state.questionSet.concat(this.state.questionSet.length+1)
        this.setState({questionSet:tmpArr})
    }

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

           }
       })
    }

    render() {
        return (
            <div>  
                <span className="breadcrumb-admin">Process > <Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/assignment"> Assignment </Link> > New Assignment</span><br/>
                <Row>
                <Col span={12}> 
                    <Row>
                        <span className="input-label">Assignment Name: </span>
                        <Input className="assignment-name" placeholder="Assignment Name" onBlur={this.handleConfirmBlur}  />
                    </Row> <br/>
                    <Row>
                        <span className="input-label">Assignment Description: </span>
                        <TextArea className="assignment-desc" placeholder="Description" onBlur={this.handleConfirmBlur} autosize />
                    </Row> <br/> 
                    {/* <RadioGroup className="radio-set" onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>Form</Radio>
                        <Radio value={2}>File Upload</Radio>
                    </RadioGroup> <br/> */}
                    {/* <div ref="form-show" className=""> */}
                        {/* {this.genQuestion()} */}
                        {
                            this.state.questionSet.map((option)=>{ 
                                return <div>
                                    <Row>
                                        <Row>
                                            <span className="input-label">Question {option}: </span>
                                            <Input className="question event-input" placeholder="Question" onBlur={this.handleConfirmBlur}  />
                                        </Row>
                                        <br/>
                                        <span className="input-label">Answer Type: </span>
                                        <Select defaultValue="short" style={{ width: 200 }}>
                                            <Option value="short">Short Answer</Option>
                                            <Option value="multiple">Multiple Line</Option>
                                            <Option value="upload">File Upload</Option>
                                        </Select>
                                    </Row><br/>
                                    </div>
                            })
                            
                            
                        }
                        <Button onClick={this.moreQuestion}>Add more question</Button>
                        <Button>Create assignment</Button>
                    {/* </div>
                    <div ref="file-show" className="hidden">
                        <span>You select type of assignment to be file upload</span>

                    </div> */}

                </Col>
                </Row>
            </div>
        )
    }
}

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