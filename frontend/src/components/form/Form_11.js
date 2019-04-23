import React from 'react'
import {Form, Input, Button, Row, Col,DatePicker,TimePicker} from 'antd'
import {   Link } from 'react-router-dom'
import '../../css/Form.css'
import moment from 'moment'

const { TextArea } = Input
const API_TOKEN = require('../../api/Token')
const API_ASSIGNMENT_STUDENT = require('../../api/Assignment_Student')
const API_ASSIGNMENT_ADMIN = require('../../api/Assignment_Admin')
const format = 'HH:mm'

class Form_11 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 11,
            token_username: "",
            token_status: "student",
            readonly: "value",
            deadline: moment(),
            dateData:moment(),
            timeData:moment(),
            data:[],
            id:""
        }
    }



    onDateChange = (date)=>{
        this.setState({dateData:date})
        
    }


    getCurrentId = (year) => {
        console.log("defaultform",this.state.defaultForm,"year",year);
        
        let params = {defaultForm: this.state.defaultForm, year: parseInt(year)}
        API_ASSIGNMENT_ADMIN.POST_DEADLINE_DEFAULTFORM_YEAR(params)
        .then(response => {
            if(response.code === 1){
                console.log("Resss",response.data[0])
                let data = response.data[0]
                this.setState({dateData:moment(data.deadline),timeData:moment(data.deadline),id:data.id})
         

            }
        })
    }

    updateDeadline = () => {
        let newDeadline = this.state.dateData.set({'hour':this.state.timeData.hour(),'minute':this.state.timeData.minute()})
        console.log("newDeadline",newDeadline);
        
        let params = {id: this.state.id, year: parseInt(this.props.match.params.year), deadline: newDeadline}
        console.log("params",params);
        
        API_ASSIGNMENT_ADMIN.POST_UPDATE_DEADLINE_FORMREVIEW(params)
        .then(response => {
            if(response.code === 1){
                console.log("yeah!")
            }
        })
    }

    onTimeChange = (time) => {
        this.setState({timeData:time})
        console.log("time",moment(time));
        
    }


    POST_FORM_DATA = (username) => {
        let params = {username: username, defaultForm: this.state.defaultForm}
        const forms = this.props.form
        API_ASSIGNMENT_STUDENT.POST_FORM_DATA(params)
        .then(response => {
            if(response.code === 1){
                
                forms.setFieldsValue(response.data[0].formData)
                let readonlyVal = this.state.token_status === "admin"? "readOnly":"value"
                this.setState({readonly:readonlyVal,data:response.data[0]}) 
            }
        })
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let status = response.token_status
        
            if(status === "admin"){
                if(this.props.location.pathname.includes("/report/"))
                    this.POST_FORM_DATA(this.props.match.params.idStudent)
                else if(this.props.location.pathname.includes("/assignment/")){
                    
                    let readonlyVal = status === "admin"? "readOnly":"value"
                    console.log(readonlyVal);
                    this.getCurrentId(this.props.match.params.year)
                    this.setState({readonly:readonlyVal}) 
                }
                    
            }
            else if(status === "student"){
                this.POST_FORM_DATA(username)
            }

            this.setState({token_username: username, token_status: status})

        })
    }

    POST_UPDATE_FORM = (values) => {
        let params = {username: this.state.token_username, defaultForm: this.state.defaultForm, formData: values, status: 1, statusDescription: "turned in", submitDate: moment()}
        params["status"] = 1
        params["statusDescription"] = moment().isSameOrBefore(this.state.data.deadline)? "turned in":"late"
        API_ASSIGNMENT_STUDENT.POST_UPDATE_FORM(params)
        .then(response => {
            if(response.code === 1){
                // console.log(params);
                this.props.history.push("/assignment/assigned")
            }
        })
    }

    componentDidMount = () => {
        this.POST_CHECK_TOKEN()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values)
            this.POST_UPDATE_FORM(values)
          }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return(
            <div className="container">
                <Row>
                    <Col span={30}>
                    {
                        (this.props.location.pathname.includes("/assignment/") && this.state.token_status==="admin")?
                        <div>
                        <span className="breadcrumb-admin"><Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/"> Process </Link> > <Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/assignment"> Assignment </Link> > ข้อมูลสถานประกอบการในโครงการสหกิจศึกษา มหาวิทยาลัยเกษตรศาสตร์</span><br/>
                        <span className="input-label">Assignment Deadline: </span>
                        <DatePicker ref="datePicker" selected={this.state.dateData} className="event-date datePicker" onChange={this.onDateChange} />
                        <span className="input-label">Time: </span>
                        <TimePicker ref="timePicker" selected={this.state.timeData} format={format}  onChange={this.onTimeChange}/> 
                        <Button className="update-deadline-form" onClick={this.updateDeadline}>Save an update</Button>
                        </div>
                       :
                       (this.props.location.pathname.includes("/report/") && this.state.token_status==="admin")?
                       <div>
                        <span className="breadcrumb-admin"><Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/">Process </Link> > <Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/report"> Assignment </Link> > ข้อมูลสถานประกอบการในโครงการสหกิจศึกษา มหาวิทยาลัยเกษตรศาสตร์ > {this.props.match.params.idStudent}</span><br/>
                        <span className="">Due {moment(this.state.data.deadline).format('llll')}</span>
                        <span className="status">status: {this.state.data.statusDescription}</span>
                        </div>
                   
                       : <div><span className="">Due {moment(this.state.data.deadline).format('llll')}</span>
                       <span className="status">status: {this.state.data.statusDescription}</span>
                           </div>
                    }
                   
                    <br/>
                    <br/>
                    <span>
                        <center>
                        <b> แบบแจ้งรายละเอียดเกี่ยวกับการปฏิบัติงานสหกิจศึกษา</b><br/>
                        <span>โครงการนำร่องสหกิจศึกษาของทบวงมหาวิทยาลัย</span>
                        </center>
                    </span>
                    <br/>
                    <hr/>
                    <br/>
                    <span>
                    <b>ผู้ให้ข้อมูล : <u>นิสิต</u> หลังกลับจากสถานประกอบการ</b><br/>
                    <b>เรียนหัวหน้าโครงการสหกิจศึกษามหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตบางเขน</b>
                    <b>คำชี้แจง</b><br/>
                    <span className="tab">โครงการสหกิจศึกษาฯ ต้องการข้อมูลเกี่ยวกับการปฏิบัติงานของนิสิตเพื่อจัดทำเป็นหนังสือสรุปผลการปฏิบัติงานประจำภาคการศึกษา โปรดเขียนข้อความด้วยตัวอักษรบรรจง และนำส่งสำนักงานโครงการสหกิจศึกษาฯ ทันทีที่กลับจากสถานประกอบการถึงสถาบัน เรียบร้อยแล้ว</span><br/>
                    </span><br/><br/>
                    <Form onSubmit={this.handleSubmit}>
                    <span>
                        <Form.Item>
                            <span className="input-label">ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f4_fullName', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" />)}
                            <span className="input-label">รหัสประจำตัว</span>
                            {getFieldDecorator('f4_id', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก รหัสประจำตัว' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">สาขาภาควิชา</span>
                            {getFieldDecorator('f4_department', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก สาขาภาควิชา' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมคอมพิวเตอร์" />)}
                            <span className="input-label">คณะ</span>
                            {getFieldDecorator('f4_faculty', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก คณะ' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมศาสตร์" />)}
                            <br/>
                            <span className="input-label">ปฏิบัติงานสหกิจศึกษา ณ สถานประกอบการ (ภาษาไทยหรือภาษาอังกฤษ) </span>
                            {getFieldDecorator('f4_companyName', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '55%'}} placeholder="" />)}
                            <br/>
                            <span className="input-label">ตำแหน่งงาน</span>
                            {getFieldDecorator('f11_1', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก ตำแหน่งงาน' }],})( <Input className="event-input" style={{width: '40%'}} placeholder="" />)}
                            ใคร่ขอเรียนแจ้ง รายละเอียดการปฏิบัติงานสหกิจศึกษา ดังนี้
                            <br/>
                        </Form.Item>
                    </span><br/>

                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>รายละเอียดเนื้องานที่ปฏิบัติ </b>(Job Description)  (นิสิตควรขอคำปรึกษาจากอาจารย์ที่ปรึกษาสหกิจศึกษาก่อนเขียนเพื่อความถูกต้องทางด้านวิชาการ หรือดูตัวอย่างประกอบ)</div><br/>
                            <Form.Item>
                            {getFieldDecorator('f11_2', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก รายละเอียดเนื้องานที่ปฏิบัติ' }],})( <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 10 }} />)}
                            </Form.Item>
                        </span>
                    </div><br/>

                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>หัวข้อรายงาน </b>(Report Title)</div><br/>
                            <Form.Item>
                                <span className="input-label">ภาษาไทย </span>
                                {getFieldDecorator('f11_3', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก หัวข้อรายงานภาษาไทย' }],})( <Input className="event-input" style={{width: '90%'}}  placeholder="" />)}<br/>
                                <span className="input-label">ภาษาอังกฤษ </span>
                                {getFieldDecorator('f11_4', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก หัวข้อรายงานภาษาอังกฤษ' }],})( <Input className="event-input" style={{width: '88%'}}  placeholder="" />)}
                            </Form.Item>
                        </span>
                    </div><br/><br/>

                    

                    <div align="right">
                        {getFieldDecorator('f11_nisit_sign', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก นิสิตผู้ปฏิบัติงานสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                        <br/>
                        <span className="input-label align-right-signature">นิสิตผู้ปฏิบัติงานสหกิจศึกษา</span>
                        <br/>
                        {getFieldDecorator('f11_sup_name', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก พนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                        <br/>
                        {getFieldDecorator('f11_sup_position', {valuePropName:this.state.readonly, rule: [{ required: false, message: 'กรุณากรอก ตำแหน่งพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ตำแหน่ง" />)}
                        <br/>
                        <span className="input-label align-right-signature">พนักงานที่ปรึกษา</span>
                    </div>
                    <br/><br/>
                    {
                        this.state.token_status === "student"?
                        <Form.Item>
                        <center>
                            <Button htmlType="submit">ยืนยันข้อมูล</Button><br/>
                            {/* <span>หมายเหตุ: ข้อมูลไม่สามารถแก้ภายหลังได้ กรุณาตรวจสอบข้อมูลก่อนยืนยันข้อมูล</span> */}
                        </center>
                        </Form.Item>:<div></div>
                    }
                    </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create({ name: 'form_11' })(Form_11)