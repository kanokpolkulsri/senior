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

class Form_7 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 7,
            token_username: "",
            token_status: "student",
            readonly: "value"
        }
    }

    updateDeadline = (id, year, newDeadline) => {
        let params = {id: id, year: year, deadline: newDeadline}
        API_ASSIGNMENT_ADMIN.POST_UPDATE_DEADLINE_FORMREVIEW(params)
        .then(response => {
            if(response.code === 1){
                console.log("yeah!")
            }
        })
    }

    POST_FORM_DATA = (username) => {
        let params = {username: username, defaultForm: this.state.defaultForm}
        const forms = this.props.form
        API_ASSIGNMENT_STUDENT.POST_FORM_DATA(params)
        .then(response => {
            if(response.code === 1){
                if(response.data[0].formData.f4_companyName === "" || response.data[0].formData.f5_address === ""){
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
                        <b>แบบแจ้งโครงร่างรายงานการปฏิบัติงาน</b><br/>
                        <span>โครงการนำร่องสหกิจศึกษาของทบวงมหาวิทยาลัย</span>
                        </center>
                    </span>
                    <br/>
                    <hr/>
                    <br/>
                    <span>
                    <b>ผู้ให้ข้อมูล : <u>นิสิต</u>และหรือ<u>พนักงานที่ปรึกษา</u></b><br/>
                    <b>คำชี้แจง</b><br/>
                    <span className="tab">รายงานถือเป็นส่วนหนึ่งของการปฎิบัติงานสหกิจศึกษา  มีวัตถุประสงค์เพื่อฝึกฝนทักษะการสื่อสาร (Communication Skill) ของนิสิต และจัดทำข้อมูลที่เป็นประโยชน์สำหรับสถานประกอบการ นิสิตจะต้องขอรับคำปรึกษาจากพนักงานที่ปรึกษา (Job Supervisor) เพื่อกำหนดหัวข้อรายงานที่เหมาะสม โดยคำนึงถึงความต้องการของสถานประกอบการเป็นหลัก ตัวอย่างของรายงานได้แก่ ผลงานวิจัยที่นิสิตปฏิบัติ รายงานวิชาการที่น่าสนใจ การสรุป ข้อมูลหรือสถิติบางประการ การวิเคราะห์และประเมินผลข้อมูล เป็นต้น ทั้งนี้รายงานอาจจะจัดทำเป็นกลุ่มของนิสิตสหกิจศึกษามากกว่า 1 คนก็ได้</span><br/>
                    <span className="tab">ในกรณีที่สถานประกอบการไม่ต้องการรายงานในหัวข้อข้างต้น นิสิตจะต้องพิจารณาเรื่องที่ตนสนใจและหยิบยกมาทำรายงาน โดยปรึกษากับพนักงานที่ปรึกษาเสียก่อน ตัวอย่างหัวข้อที่จะใช้เขียนรายงาน ได้แก่ รายงานวิชาการที่นิสิตสนใจ รายงานการปฏิบัติงานที่ได้รับมอบหมาย หรือแผนและวิธีการปฏิบัติงานที่จะทำให้บรรลุถึงวัตถุประสงค์ของการเรียนรู้ที่นิสิตวางเป้าหมายไว้จากการปฏิบัติงานสหกิจศึกษาครั้งนี้ (Learning Objectives) เมื่อกำหนดหัวข้อได้แล้ว ให้นิสิตจัดทำโครงร่างของเนื้อหารายงานพอสังเขป ตามแบบฟอร์ม Work Term Report Outline ฉบับนี้ ทั้งนี้ให้ปรึกษากับพนักงานที่ปรึกษาเสียก่อนแล้วจึงส่งกลับมายังโครงการสหกิจศึกษาฯ ภายใน 3 สัปดาห์ แรกของการปฏิบัติงาน</span><br/>
                    <span className="tab">โครงการสหกิจศึกษาฯ จะรวบรวมนำเสนออาจารย์ที่ปรึกษาสหกิจศึกษาเพื่อพิจารณา หากอาจารย์มีข้อเสนอแนะใด ๆ ก็จะส่งกลับมาให้นิสิตทราบภายใน 2 สัปดาห์ และเพื่อมิให้เป็นการเสียเวลานิสิตควรดำเนินการเขียนรายงานโดยทันที</span>
                    </span><br/><br/>
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
                    </span><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>1. หัวข้อรายงาน (Report Title) </b><i>(อาจจะขอเปลี่ยนแปลงหรือแก้ไขเพิ่มเติมได้ในภายหลัง)</i></div><br/>
                            <Form.Item>
                                <span className="input-label">ภาษาไทย </span>
                                {getFieldDecorator('f7_1', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก หัวข้อรายงานภาษาไทย' }],})( <Input className="event-input" style={{width: '82%'}}  placeholder="" />)}<br/>
                                <span className="input-label">ภาษาอังกฤษ </span>
                                {getFieldDecorator('f7_2', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก หัวข้อรายงานภาษาอังกฤษ' }],})( <Input className="event-input" style={{width: '80%'}}  placeholder="" />)}
                            </Form.Item>
                        </span>
                    </div><br/><br/>

                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>2. รายละเอียดเนื้อหาของรายงาน </b><i>(อาจจะขอเปลี่ยนแปลงหรือแก้ไขเพิ่มเติมได้ในภายหลัง)</i></div><br/>
                            <Form.Item>
                            {getFieldDecorator('f7_3', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก รายละเอียดเนื้อหาของรายงาน' }],})( <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 10 }} />)}
                            </Form.Item>
                        </span>
                    </div><br/><br/>

                    <div align="right">
                        {getFieldDecorator('f7_nisit_sign', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อนิสิตผู้ปฏิบัติงานสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                        <br/>
                        <span className="input-label align-right-signature">นิสิตผู้ปฏิบัติงานสหกิจศึกษา</span>
                        <br/>
                        {getFieldDecorator('f7_sup_sign', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ชื่อพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                        <br/>
                        {getFieldDecorator('f7_sup_position', {valuePropName:this.state.readonly, rules: [{ required: true, message: 'กรุณากรอก ตำแหน่งพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ตำแหน่ง" />)}
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

export default Form.create({ name: 'form_7' })(Form_7)