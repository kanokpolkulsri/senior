import React from 'react'
import {Form, Input, Button, Row, Col,DatePicker,TimePicker,Radio} from 'antd'
import {   Link } from 'react-router-dom'
import '../../css/Form.css'
import moment from 'moment'

const RadioGroup = Radio.Group;
const { TextArea } = Input;
const API_TOKEN = require('../../api/Token')
const API_ASSIGNMENT_STUDENT = require('../../api/Assignment_Student')
const format = 'HH:mm'

class Form_5 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 5,
            token_username: "",
            token_status: "student",
            readonly: "value"
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
                this.setState({readonly:readonlyVal}) 
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
                // this.props.history.push("/assignment/assigned")
                this.POST_SEND_EMAI_TO_SUP(values.f5_15, values.f5_sup_name, this.state.token_username)
            }
        })
    }

    POST_SEND_EMAI_TO_SUP = (email, supervisorName, username) => {
        let params = {email: email, supervisorName: supervisorName, username: username}
        API_ASSIGNMENT_STUDENT.POST_SEND_EMAIT_TO_SUP(params)
        .then(response => {
            if(response.code === 1){
                console.log(response.data)
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
                        <DatePicker className="event-date" onChange={this.onChange} />
                        <span className="input-label">Time: </span>
                        <TimePicker format={format}  onChange={this.onStartDateChange}/> 
                        <Button className="update-deadline-form" onClick={this.updateDeadline}>Save an update</Button>
                        </div>
                       :
                       (this.props.location.pathname.includes("/report/") && this.state.token_status==="admin")?
                       <div>
                        <span className="breadcrumb-admin"><Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/">Process </Link> > <Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/report"> Assignment </Link> > ข้อมูลสถานประกอบการในโครงการสหกิจศึกษา มหาวิทยาลัยเกษตรศาสตร์ > {this.props.match.params.idStudent}</span><br/>
                        </div>
                       :<span></span>
                    }
                    <br/>
                    <br/>
                    <span>
                        <center>
                        <b>แบบแจ้งรายละเอียดงานตำแหน่งงานพนักงานที่ปรึกษา</b><br/>
                        <span>โครงการนำร่องสหกิจศึกษาของทบวงมหาวิทยาลัย</span>
                        </center>
                    </span>
                    <br/>
                    <hr/>
                    <br/>
                    <span>
                    <b>ผู้ให้ข้อมูล : <u>นิสิต</u>และหรือ<u>พนักงานที่ปรึกษา</u></b><br/>
                    <b>เรียนหัวหน้าโครงการสหกิจศึกษามหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตบางเขน</b>
                    <b>คำชี้แจง</b><br/>
                    <span className="tab">เพื่อให้การประสานงานระหว่างโครงการสหกิจศึกษาฯ และสถานประกอบการ เป็นไปโดยความเรียบร้อยและมีประสิทธิภาพ จึงใคร่ขอความกรุณาผู้จัดการฝ่ายบุคคลหรือผู้ที่รับผิดชอบดูแลการปฏิบัติงานของนิสิตสหกิจศึกษาได้โปรดประสานงานกับพนักงานที่ปรึกษา (Job Supervisor)  เพื่อจัดทำข้อมูล ตำแหน่งงาน ลักษณะงานและพนักงานที่ปรึกษา (Job Position , Job Description and Job Supervisor) ตามแบบฟอร์มฉบับนี้</span>
                    </span><br/><br/>
                    <Form onSubmit={this.handleSubmit}>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>1. ชื่อและที่อยู่ของสถานประกอบการ</b></div><br/>
                            <span className="tab">โปรดให้ชื่อที่เป็นทางการเพื่อจะนำไประบุในใบรับรองภาษาอังกฤษให้แก่นิสิตได้อย่างถูกต้อง
    ที่อยู่ (เพื่อประกอบการเดินทางไปนิเทศงานนิสิตที่ถูกต้อง โปรดระบุที่อยู่ตามสถานที่ที่นิสิตปฏิบัติงาน)</span>
                            <Form.Item>
                                <span className="input-label"><b>ชื่อสถานประกอบการ</b> (ภาษาไทย)</span>
                                {getFieldDecorator('f5_name_th', {valuePropName:this.state.readonly, valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการภาษาไทย' }],})( <Input className="event-input" style={{width: '75%'}}  placeholder="" />)}<br/>
                                <span className="input-label"><b>ชื่อสถานประกอบการ</b> (ภาษาอังกฤษ)</span>
                                {getFieldDecorator('f5_name_en', {valuePropName:this.state.readonly, valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการภาษาอังกฤษ' }],})( <Input className="event-input" style={{width: '75%'}}  placeholder="" />)}
                                <br/>
                                <span className="input-label">เลขที่</span>
                                {getFieldDecorator('f5_address', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก เลขที่' }],})( <Input className="event-input" style={{width: '18%'}}  placeholder="" />)}
                                <span className="input-label">ถนน</span>
                                {getFieldDecorator('f5_street', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ถนน' }],})( <Input className="event-input" style={{width: '18%'}}  placeholder="" />)}
                                <span className="input-label">ซอย</span>
                                {getFieldDecorator('f5_soi', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ซอย' }],})( <Input className="event-input" style={{width: '18%'}}  placeholder="" />)}
                                <span className="input-label">ตำบล</span>
                                {getFieldDecorator('f5_tambon', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ตำบล' }],})( <Input className="event-input" style={{width: '18%'}}  placeholder="" />)}
                                <br/>
                                <span className="input-label">อำเภอ</span>
                                {getFieldDecorator('f5_amphur', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก อำเภอ' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                                <span className="input-label">จังหวัด</span>
                                {getFieldDecorator('f5_province', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก จังหวัด' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                                <span className="input-label">รหัสไปรษณีย์</span>
                                {getFieldDecorator('f5_postcode', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                                <br/>
                                <span className="input-label">โทรศัพท์</span>
                                {getFieldDecorator('f5_phone', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                                <span className="input-label">โทรสาร</span>
                                {getFieldDecorator('f5_call', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            </Form.Item>
                        </span>
                    </div>
                    <br/><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>2. ผู้จัดการทั่วไป / ผู้จัดการโรงงาน และผู้ได้รับมอบหมายให้ประสานงาน</b></div><br/>
                            <Form.Item>
                                <span className="input-label">ชื่อผู้จัดการสถานประกอบการ </span>
                                {getFieldDecorator('f5_1', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อผู้จัดการสถานประกอบการ' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" />)}
                                <span className="input-label">ตำแหน่ง</span>
                                {getFieldDecorator('f5_2', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                                <br/>
                                <span className="input-label">โทรศัพท์</span>
                                {getFieldDecorator('f5_3', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '22%'}}  placeholder="" />)}
                                <span className="input-label">โทรสาร</span>
                                {getFieldDecorator('f5_4', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '22%'}}  placeholder="" />)}
                                <span className="input-label">E-mail</span>
                                {getFieldDecorator('f5_5', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก E-mail' }],})( <Input className="event-input" style={{width: '22%'}}  placeholder="" />)}
                                <br/>การติดต่อประสานงานกับมหาวิทยาลัย (การนิเทศงานนิสิต และอื่นๆ) ขอมอบให้<br/>
                                <Form.Item>
                                    {getFieldDecorator('radiogroup')(
                                    <RadioGroup>
                                        <Radio value={1}>ไม่ขัดข้องและยินดีต้อนรับคณะนิเทศงานสหกิจศึกษาในวันและเวลาดังกล่าว</Radio><br/>
                                        <Radio value={2}>ไม่สะดวกที่จะต้อนรับในวันและเวลาดังกล่าว</Radio>
                                        <br/>
                                        <div className="tab">
                                            <span className="input-label">ชื่อ-นามสกุล </span>
                                            {getFieldDecorator('f5_6', {valuePropName:this.state.readonly, rules: [{ required: false, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '70%'}}  placeholder="" />)}
                                            <br/>
                                            <span className="input-label">ตำแหน่ง</span>
                                            {getFieldDecorator('f5_7', {valuePropName:this.state.readonly, rules: [{ required: false, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                                            <span className="input-label">แผนก</span>
                                            {getFieldDecorator('f5_8', {valuePropName:this.state.readonly, rules: [{ required: false, message: 'กรุณากรอก แผนก' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                                            <br/>
                                            <span className="input-label">โทรศัพท์</span>
                                            {getFieldDecorator('f5_9', {valuePropName:this.state.readonly, rules: [{ required: false, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                                            <span className="input-label">โทรสาร</span>
                                            {getFieldDecorator('f5_10', {valuePropName:this.state.readonly, rules: [{ required: false, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                                            <br/>
                                            <span className="input-label">E-mail</span>
                                            {getFieldDecorator('f5_11', {valuePropName:this.state.readonly, rules: [{ required: false, message: 'กรุณากรอก E-mail' }],})( <Input className="event-input" style={{width: '70%'}}  placeholder="" />)}
                                        </div>
                                    </RadioGroup>
                                    )}
                                </Form.Item>

                                </Form.Item>
                        </span>
                    </div><br/><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>3. พนักงานที่ปรึกษา (Job Supervisor)</b></div><br/>
                            <Form.Item>
                                <span className="input-label">ชื่อ-นามสกุล </span>
                                {getFieldDecorator('f5_sup_name', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '55%'}}  placeholder="" />)}
                                <span className="input-label">ตำแหน่ง</span>
                                {getFieldDecorator('f5_sup_position', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                                <br/>
                                <span className="input-label">แผนก</span>
                                {getFieldDecorator('f5_sup_division', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก แผนก' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="" />)}
                                <span className="input-label">* E-mail</span>
                                {getFieldDecorator('f5_15', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก E-mail' }],})( <Input className="event-input" style={{width: '35%'}}  placeholder="" />)}
                                <br/>
                                <span className="input-label">โทรศัพท์</span>
                                {getFieldDecorator('f5_16', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                                <span className="input-label">โทรสาร</span>
                                {getFieldDecorator('f5_17', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                                
                            </Form.Item>
                        </span>
                    </div><br/><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>4. งานที่มอบหมายนิสิต</b></div><br/>
                            <Form.Item>
                                <span className="input-label">ชื่อ-นามสกุลของนิสิต (ภาษาไทย) </span>
                                {getFieldDecorator('f5_18', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุลของนิสิต' }],})( <Input className="event-input" style={{width: '75%'}}  placeholder="" />)}
                                <br/>
                                <span className="input-label">ตำแหน่งงานที่นิสิตปฏิบัติ (Job Position)</span>
                                {getFieldDecorator('f5_19', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ตำแหน่งงานที่นิสิตปฏิบัติ' }],})( <Input className="event-input" style={{width: '70%'}}  placeholder="" />)}
                                <br/>
                                <span className="input-label">ลักษณะงานที่นิสิตปฏิบัติ (Job Description)</span>
                                {getFieldDecorator('f5_20', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ลักษณะงานที่นิสิตปฏิบัติ' }],})( <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />)}
                                
                            </Form.Item>
                        </span>
                    </div><br/><br/>
                    <div align="right">
                        {getFieldDecorator('f5_nisit_sign', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อนิสิตผู้ปฏิบัติงานสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="" />)}
                        <br/>
                        <span className="input-label align-right-signature">นิสิตผู้ปฏิบัติงานสหกิจศึกษา</span>
                    </div>
                    <br/><br/>
                    {
                        this.state.token_status === "student"?
                        <Form.Item>
                        <center>
                            <Button htmlType="submit">ยืนยันข้อมูล</Button><br/>
                            <span>หมายเหตุ: แบบฟอร์มนี้มีผลต่อการประเมินของนิสิต กรุณาตรวจสอบก่อนกรอกข้อมูลอย่างละเอียด</span>
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

export default Form.create({ name: 'form_5' })(Form_5)