import React from 'react'
import {Form, Input, Button, Row, Col} from 'antd'
import '../../css/Form.css'
import moment from 'moment'

const { TextArea } = Input
const API_TOKEN = require('../../api/Token')
const API_ASSIGNMENT_STUDENT = require('../../api/Assignment_Student')

class Form_11 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 11,
            token_username: "",
            token_status: "student",
            readonly: "value"        }
    }

    POST_FORM_DATA = (username) => {
        let params = {username: username, defaultForm: this.state.defaultForm}
        const forms = this.props.form
        API_ASSIGNMENT_STUDENT.POST_FORM_DATA(params)
        .then(response => {
            if(response.code === 1){
                if(response.data[0].formData.f4_companyName === ""){
                    // if no data from previous form
                    API_ASSIGNMENT_STUDENT.POST_DATA_PREVIOUS_FORM(params)
                    .then(tmp => {
                        let params = {}
                        let tmpObj = tmp.data
                        let responseObj = response.data[0].formData
                        Object.keys(response.data[0].formData).forEach(key => params[key] = responseObj[key])
                        Object.keys(tmp.data).forEach(key => params[key] = tmpObj[key])
                        // console.log(params)
                        forms.setFieldsValue(params)
                        let readonlyVal = this.state.token_status === "admin"? "readOnly":"value"
                        this.setState({readonly:readonlyVal}) 
                    })                    
                }else{
                    // console.log(response.data[0].formData)
                    forms.setFieldsValue(response.data[0].formData)
                    let readonlyVal = this.state.token_status === "admin"? "readOnly":"value"
                    this.setState({readonly:readonlyVal}) 
                }
                
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