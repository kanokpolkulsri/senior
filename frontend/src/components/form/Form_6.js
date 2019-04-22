import React from 'react'
import {Form, Input, Button, Row, Col} from 'antd'
import '../../css/Form.css'
import moment from 'moment'

const API_TOKEN = require('../../api/Token')
const API_ASSIGNMENT_STUDENT = require('../../api/Assignment_Student')

class Form_6 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 6,
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
                console.log(response.data)
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
                    <span>
                        <center>
                        <b>แบบแจ้งแผนปฏิบัติงานสหกิจศึกษา</b><br/>
                        <span>โครงการนำร่องสหกิจศึกษาของทบวงมหาวิทยาลัย</span>
                        </center>
                    </span>
                    <br/>
                    <hr/>
                    <br/>
                    <span>
                    <b>ผู้ให้ข้อมูล : <u>นิสิต</u>ร่วมกัน<u>พนักงานที่ปรึกษา</u></b><br/>
                    </span>
                        
                    <Form onSubmit={this.handleSubmit}>
                    <span>
                        <Form.Item>
                            <span className="input-label">ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f4_fullName', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" />)}
                            <span className="input-label">รหัสประจำตัว</span>
                            {getFieldDecorator('f4_id', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก รหัสประจำตัว' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">สาขาภาควิชา</span>
                            {getFieldDecorator('f4_department', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก สาขาภาควิชา' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมคอมพิวเตอร์" />)}
                            <span className="input-label">คณะ</span>
                            {getFieldDecorator('f4_faculty', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก คณะ' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมศาสตร์" />)}
                            <br/>
                            <span className="input-label">ปฏิบัติงานสหกิจศึกษา ณ  สถานประกอบการ </span>
                            {getFieldDecorator('f4_companyName', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '70%'}} placeholder="" />)}
                            <br/>
                        </Form.Item>
                        <br/><br/>
                        <center><b>แผนปฏิบัติงานสหกิจศึกษา</b></center><br/><br/>
                        {/* table */}
                        
                        <div align="right">
                            {getFieldDecorator('f6_nisit_sign', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อนิสิตผู้ปฏิบัติงานสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                            <br/>
                            <span className="input-label align-right-signature">นิสิตผู้ปฏิบัติงานสหกิจศึกษา</span>
                            <br/>
                            {getFieldDecorator('f6_sup_name', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                            <br/>
                            {getFieldDecorator('f6_sup_position', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ตำแหน่งพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ตำแหน่ง" />)}
                            <br/>
                            <span className="input-label align-right-signature">พนักงานที่ปรึกษา</span>
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

export default Form.create({ name: 'form_6' })(Form_6)