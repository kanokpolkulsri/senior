import React from 'react'
import {Form, Input, Button, Row, Col, DatePicker, TimePicker} from 'antd'
import '../../css/Form.css'
import moment from 'moment'

const format = 'HH:mm'
const API_TOKEN = require('../../api/Token')
const API_ASSIGNMENT_STUDENT = require('../../api/Assignment_Student')

class Form_2 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 2,
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
                        <b>แบบแจ้งยืนยันการนิเทศงานนิสิตสหกิจศึกษา</b><br/>
                        <span>โครงการนำร่องสหกิจศึกษาของทบวงมหาวิทยาลัย</span>
                        </center>
                    </span>
                    <br/>
                    <hr/>
                    <br/>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <span className="input-label">ชื่อสถานประกอบการ </span>
                        {getFieldDecorator('f2_companyName', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '80%'}} placeholder="" />)}
                    </Form.Item>
                    <span>
                        <b>หัวข้อที่จะหารือในระหว่างการนิเทศ</b> ได้แก่
                        <ol>
                            <li>หน้าที่ที่มอบหมายให้นิสิตปฏิบัติ และแผนการปฏิบัติงานตลอดระยะเวลาปฏิบัติงาน</li>
                            <li>การพัฒนาตนเองของนิสิต</li>
                            <li>หัวข้อรายงานและโครงร่างรายงาน</li>
                            <li>รับฟังความคิดเห็นจากสถานประกอบการเรื่องรูปแบบและปรัชญาของสหกิจศึกษา</li>
                            <li>ปัญหาต่างๆ ที่เกิดขึ้นในช่วงระยะเวลาที่ปฏิบัติงานผ่านมา</li>
                        </ol>
                    </span>
                    <span>
                        <b>ขั้นตอนการนิเทศ</b><br/>
                        <Form.Item className="tab">
                            <span className="input-label">1. ขอพบนิสิตก่อนโดยลำพัง</span>
                            <span className="input-label tab">วันที่ </span>
                            {getFieldDecorator('f2_nisit_date', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก วันที่' }],})( <DatePicker className="date-input" style={{width: '15%'}} onChange={this.onChange} />)}
                            <span className="input-label tab">เวลา </span>
                            {getFieldDecorator('f2_nisit_time', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก เวลา' }],})( <TimePicker className="date-input" style={{width: '15%'}} format={format} onChange={this.onStartDateChange}/>)}
                        </Form.Item>
                        <Form.Item className="tab">
                            <span className="input-label">2. ขอพบ Job Supervisor โดยลำพัง</span>
                            <span className="input-label tab">วันที่ </span>
                            {getFieldDecorator('f2_sup_date', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก วันที่' }],})( <DatePicker className="date-input" style={{width: '15%'}} onChange={this.onChange} />)}
                            <span className="input-label tab">เวลา </span>
                            {getFieldDecorator('f2_sup_time', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก เวลา' }],})( <TimePicker className="date-input" style={{width: '15%'}} format={format}  onChange={this.onStartDateChange}/>)}
                        </Form.Item>
                        <Form.Item className="tab">
                            <span className="input-label">3. เยี่ยมชมสถานประกอบการ (แล้วแต่ความเหมาะสมและความสะดวกของสถานประกอบการ)</span>
                        </Form.Item>
                    </span>
                    <span>
                        <b>คณะผู้นิเทศสหกิจศึกษา</b> ของมหาวิทยาลัยฯ ประกอบด้วย
                        <Form.Item>
                            <span className="input-label tab">1. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f2_1_name', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="" />)}
                            <span className="input-label">ตำแหน่ง</span>
                            {getFieldDecorator('f2_1_position', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label tab">2. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f2_2_name', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="" />)}
                            <span className="input-label">ตำแหน่ง</span>
                            {getFieldDecorator('f2_2_position', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label tab">3. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f2_3_name', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="" />)}
                            <span className="input-label">ตำแหน่ง</span>
                            {getFieldDecorator('f2_3_position', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label tab">4. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f2_4_name', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="" />)}
                            <span className="input-label">ตำแหน่ง</span>
                            {getFieldDecorator('f2_4_position', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <br/>
                        </Form.Item>
                        <span className="tab">สถานประกอบการได้รับทราบกำหนดการนิเทศงานนิสิตสหกิจศึกษา ในวันที่ </span>
                        {getFieldDecorator('f2_company_date', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก วันที่' }],})( <DatePicker className="date-input" style={{width: '15%'}} onChange={this.onChange} />)}
                        <span className="tab">เวลา </span>
                        {getFieldDecorator('f2_comp_time', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'กรุณากรอก เวลา' }],})( <TimePicker className="date-input" style={{width: '15%'}} format={format}  onChange={this.onStartDateChange}/>)}
                        <span className="tab">ตลอดจนขั้นตอนรายละเอียดการนิเทศงานดังกล่าวข้างต้นโดยชัดเจนแล้ว และใคร่ขอแจ้งให้โครงการฯ ทราบว่า</span>
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

export default Form.create({ name: 'form_2' })(Form_2)