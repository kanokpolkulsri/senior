import React from 'react'
import {Form, Input, Button, Row, Col,DatePicker,TimePicker} from 'antd'
import {   Link } from 'react-router-dom'
import '../../css/Form.css'
import moment from 'moment'

import axios from 'axios'
const Config = require('../../Config')
const prePath = Config.API_URL + "/images/"
const API_URL = Config.API_URL + "/upload"
const format = 'HH:mm'

const API_TOKEN = require('../../api/Token')
const API_ASSIGNMENT_STUDENT = require('../../api/Assignment_Student')

class Form_4 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 4,
            token_username: "",
            token_status: "student",
            readonly: "value",
            formField: {},
            nameUploadedFile: "",
        }
    }

    POST_FORM_DATA = (username) => {
        let params = {username: username, defaultForm: this.state.defaultForm}
        const forms = this.props.form
        API_ASSIGNMENT_STUDENT.POST_FORM_DATA(params)
        .then(response => {
            if(response.code === 1){
                // console.log(response.data)
                forms.setFieldsValue(response.data[0].formData)
                let readonlyVal = this.state.token_status === "admin"? "readOnly":"value"
        
                this.setState({readonly:readonlyVal, formField: {'f4_map': response.data[0].formData.f4_map}, nameUploadedFile: response.data[0].formData.f4_map !== "" ? response.data[0].formData.f4_map.split('/')[4] : ""})
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
                this.POST_FORM_DATA(this.props.match.params.idStudent)
            }
            else if(status === "student"){
                this.POST_FORM_DATA(username)
            }
            this.setState({token_username: username, token_status: status})
        })
    }

    POST_UPDATE_FORM = (values) => {
        let params = {username: this.state.token_username, defaultForm: this.state.defaultForm, formData: values, status: 1, statusDescription: "turned in", submitDate: moment()}
        API_ASSIGNMENT_STUDENT.POST_UPDATE_FORM(params)
        .then(response => {
            if(response.code === 1){
                this.props.history.push("/assignment/assigned")
            }
        })
    }

    componentDidMount = () => {
        this.POST_CHECK_TOKEN()
    }

    handleFile = (e) => {
        let newField = e.target.name
        let newFormField = this.state.formField
        let pathFile = ""
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append('file', file)
        axios.post(API_URL, formData, {})
        .then(response => {
            
            if(response.status === 200){
                let filename = response.data.filename
                if(filename !== undefined){
                    pathFile = prePath + filename
                    newFormField[newField] = pathFile
                    this.setState({formField: newFormField})
                }
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values)
            const params = {}
            let formField = this.state.formField
            Object.keys(values).forEach(key => params[key] = values[key])
            Object.keys(formField).forEach(key => params[key] = formField[key])
            // console.log('Received values of form: ', params)
            this.POST_UPDATE_FORM(params)
          }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return(
            <div className="container">
                <Row>
                    <Col span={30}>
                    <div>
                        <span className="breadcrumb-admin">Process > <Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/assignment"> Assignment </Link> > ข้อมูลสถานประกอบการในโครงการสหกิจศึกษา มหาวิทยาลัยเกษตรศาสตร์</span><br/>
                        <span className="input-label">Assignment Deadline: </span>
                        <DatePicker className="event-date" onChange={this.onChange} />
                        <span className="input-label">Time: </span>
                        <TimePicker format={format}  onChange={this.onStartDateChange}/> 
                        <Button className="update-deadline-form" onClick={this.updateDeadline}>Save an update</Button>
                    </div>
                    <br/>
                    <br/>
                    <span>
                        <center>
                        <b>แบบแจ้งรายละเอียดที่พักระหว่างการปฏิบัติงานสหกิจศึกษา</b><br/>
                        <span>โครงการนำร่องสหกิจศึกษาของทบวงมหาวิทยาลัย</span>
                        </center>
                    </span>
                    <br/>
                    <hr/>
                    <br/>
                    <span>
                    <b>ผู้ให้ข้อมูล : <u>นิสิต</u></b><br/>
                    <b>เรียนหัวหน้าโครงการสหกิจศึกษามหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตบางเขน</b>
                    </span>
                    
                    <Form onSubmit={this.handleSubmit}>
                    <span>
                        <Form.Item>
                            <span className="input-label">ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f4_fullName', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" />)}
                            <span className="input-label">รหัสประจำตัว</span>
                            {getFieldDecorator('f4_id', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก รหัสประจำตัว' }],})( <Input className="event-input" style={{width: '23%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">สาขาภาควิชา</span>
                            {getFieldDecorator('f4_department', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก สาขาภาควิชา' }],})( <Input className="event-input" style={{width: '39%'}}  placeholder="วิศวกรรมคอมพิวเตอร์" />)}
                            <span className="input-label">คณะ</span>
                            {getFieldDecorator('f4_faculty', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก คณะ' }],})( <Input className="event-input" style={{width: '39%'}}  placeholder="วิศวกรรมศาสตร์" />)}
                            <br/>
                            <span className="input-label">ชื่อสถานประกอบการ (ภาษาอังกฤษ) </span>
                            {getFieldDecorator('f4_companyName', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '80%'}} placeholder="" />)}
                            <br/>ขอแจ้งรายละเอียดเกี่ยวกับที่พักระหว่างปฏิบัติงานสหกิจศึกษา ดังนี้<br/>	
                            <span className="input-label">เลขที่</span>
                            {getFieldDecorator('f4_dorm_1', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก เลขที่' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ถนน</span>
                            {getFieldDecorator('f4_dorm_2', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ถนน' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ซอย</span>
                            {getFieldDecorator('f4_dorm_3', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ซอย' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ตำบล</span>
                            {getFieldDecorator('f4_dorm_4', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ตำบล' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">อำเภอ</span>
                            {getFieldDecorator('f4_dorm_5', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก อำเภอ' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">จังหวัด</span>
                            {getFieldDecorator('f4_dorm_6', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก จังหวัด' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">รหัสไปรษณีย์</span>
                            {getFieldDecorator('f4_dorm_7', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">โทรศัพท์</span>
                            {getFieldDecorator('f4_dorm_8', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">โทรสาร</span>
                            {getFieldDecorator('f4_dorm_9', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/>ชื่อที่อยู่ ผู้ที่สามารถติดต่อได้ในกรณีฉุกเฉิน {getFieldDecorator('f4_emergency_1', {rules: [{ required: true, message: 'กรุณากรอก xxxxx' }],})( <Input className="event-input" style={{width: '68%'}}  placeholder="" />)}
                            <br/>	
                            <span className="input-label">เลขที่</span>
                            {getFieldDecorator('f4_emergency_2', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก เลขที่' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ถนน</span>
                            {getFieldDecorator('f4_emergency_3', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ถนน' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ซอย</span>
                            {getFieldDecorator('f4_emergency_4', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ซอย' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ตำบล</span>
                            {getFieldDecorator('f4_emergency_5', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ตำบล' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">อำเภอ</span>
                            {getFieldDecorator('f4_emergency_6', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก อำเภอ' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">จังหวัด</span>
                            {getFieldDecorator('f4_emergency_7', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก จังหวัด' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">รหัสไปรษณีย์</span>
                            {getFieldDecorator('f4_emergency_8', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">โทรศัพท์</span>
                            {getFieldDecorator('f4_emergency_9', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">โทรสาร</span>
                            {getFieldDecorator('f4_emergency_10', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/><b><u>แผนที่แสดงตำแหน่งที่พักอาศัย</u></b><br/>
                            เพื่อความสะดวกในการนิเทศงานของคณาจารย์ โปรดระบุชื่อถนนและสถานที่สำคัญใกล้เคียงที่สามารถเข้าใจโดยง่าย<br/>
                            <input type ="file" name="f4_map" onChange={(e)=>this.handleFile(e)} />
                            <span>ไฟล์อัพโหลด : <a href={this.state.formField.f4_map}>{this.state.nameUploadedFile}</a></span>
                            
                        </Form.Item>
                        <div align="right">
                            {getFieldDecorator('f4_nisit_sign', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ชื่อนิสิตผู้ปฏิบัติงานสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label align-right-signature">นิสิตผู้ปฏิบัติงานสหกิจศึกษา</span>
                        </div>

                    </span>
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

export default Form.create({ name: 'form_4' })(Form_4)