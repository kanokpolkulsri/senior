import React from 'react'
import {Form, Input, Button, Row, Col} from 'antd'
import '../../css/Form.css'
import moment from 'moment'

const API_TOKEN = require('../../api/Token')
const API_ASSIGNMENT_STUDENT = require('../../api/Assignment_Student')

class Form_1 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 1,
            token_username: "",
            token_status: ""
        }
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let status = response.token_status
            this.setState({token_username: username, token_status: status})
        })
    }

    POST_UPDATE_FORM = (values) => {
        let params = {username: this.state.token_username, defaultForm: this.state.defaultForm, formData: values, status: 1, statusDescription: "turnedin", submitDate: moment()}
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

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
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
                    <Form onSubmit={this.handleSubmit}>
                    <span><center><b><u>ข้อมูลสถานประกอบการในโครงการสหกิจศึกษา มหาวิทยาลัยเกษตรศาสตร์</u></b></center></span>
                    <br/>
                    <hr/>
                    <br/>
                    <span><b>ชื่อสถานประกอบการ (ที่เป็นทางการ)</b></span><br/><br/>
                    <span><b>ข้อมูลส่วนของนิสิต</b></span>
                    <Form.Item>
                        <span className="input-label">ชื่อ-นามสกุล(ภาษาไทย) </span>
                        {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล(ภาษาไทย)' }],})( <Input className="event-input" style={{width: '29%'}} placeholder="" />)}
                        <span className="input-label">ชื่อ-นามสกุล (ภาษาอังกฤษ) </span>
                        {getFieldDecorator('f1_student_engFullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล(ภาษาอังกฤษ)' }],})( <Input className="event-input" style={{width: '29%'}} placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">ที่อยู่ของนิสิต </span>
                        {getFieldDecorator('f1_student_address', {rules: [{ required: true, message: 'กรุณากรอก ที่อยู่นิสิต' }],})( <Input className="event-input" style={{width: '84%'}}  placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">รหัสไปรษณีย์ </span>
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                        <span className="input-label">เว็บไซต์หน่วยงาน (ถ้ามี) </span>
                        {getFieldDecorator('f1_student_website')( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">หน่วยงานที่รับผิดชอบนิสิตสหกิจศึกษา </span>
                        {getFieldDecorator('f1_student_organization', {rules: [{ required: true, message: 'กรุณากรอก หน่วยงานที่รับผิดชอบนิสิตสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '70%'}}  placeholder="" />)}
                    </Form.Item>

                    <hr/>
                    <span><b>ข้อมูลส่วนของผู้ประสานงาน</b></span>
                    <Form.Item>
                        <span className="input-label">ชื่อผู้ประสานงาน </span>
                        {getFieldDecorator('f1_coordiator_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อผู้ประสานงาน' }],})( <Input className="event-input" style={{width: '36%'}}  placeholder="" />)}
                        <span className="input-label">ตำแหน่ง </span>
                        {getFieldDecorator('f1_coordiator_position', {rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '36%'}}  placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">ที่อยู่สถานที่ติดต่อ </span>
                        {getFieldDecorator('f1_coordiator_address', {rules: [{ required: true, message: 'กรุณากรอก ที่อยู่สถานที่ติดต่อ' }],})( <Input className="event-input" style={{width: '81%'}}  placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">รหัสไปรษณีย์ </span>
                        {getFieldDecorator('f1_coordiator_postcode', {rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                        <span className="input-label">โทรศัพท์/โทรสาร </span>
                        {getFieldDecorator('f1_coordiator_phone', {rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์/โทรสาร' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">Email Address </span>
                        {getFieldDecorator('f1_coordiator_email', {rules: [{ required: true, message: 'กรุณากรอก Email address' }],})( <Input className="event-input" style={{width: '35%'}}  placeholder="" />)}
                    </Form.Item>

                    <hr/>
                    <span><b>ข้อมูลส่วนของพนักงานที่ปรึกษา</b></span>
                    <Form.Item>
                        <span className="input-label">ชื่อผู้พนักงานที่ปรึกษา </span>
                        {getFieldDecorator('f1_supervisor_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ขื่อผู้พนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '36%'}}  placeholder="" />)}
                        <span className="input-label">ตำแหน่ง </span>
                        {getFieldDecorator('f1_supervisor_position', {rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '36%'}}  placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">ที่อยู่สถานที่ติดต่อ </span>
                        {getFieldDecorator('f1_supervisor_address', {rules: [{ required: true, message: 'กรุณากรอก ที่อยู่สถานที่ติดต่อ' }],})( <Input className="event-input" style={{width: '81%'}}  placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">รหัสไปรษณีย์ </span>
                        {getFieldDecorator('f1_supervisor_postcode', {rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                        <span className="input-label">โทรศัพท์/โทรสาร </span>
                        {getFieldDecorator('f1_supervisor_phone', {rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์/โทรสาร' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label">E-mail </span>
                        {getFieldDecorator('f1_supervisor_email', {rules: [{ required: true, message: 'กรุณากรอก E-mail' }],})( <Input className="event-input" style={{width: '35%'}}  placeholder="" />)}
                    </Form.Item>


                    <br/><br/>
                    <Form.Item>
                        <center>
                            <Button htmlType="submit">ยืนยันข้อมูล</Button><br/>
                            <span>หมายเหตุ: ข้อมูลไม่สามารถแก้ภายหลังได้ กรุณาตรวจสอบข้อมูลก่อนยืนยันข้อมูล</span>
                        </center>
                    </Form.Item>
                    </Form>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Form.create({ name: 'form_1' })(Form_1)