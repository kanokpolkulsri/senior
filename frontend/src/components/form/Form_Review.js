import React from 'react'
import {Form, Input, Button, Row, Col, Select, Icon, Divider} from 'antd'
import '../../css/Form.css'
import debounce from 'lodash/debounce'

const Option = Select.Option;
const { TextArea } = Input;
const API_REVIEW = require('../../api/Review')

let timeout
let currentValue


class Form_Review extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            data: [],
            searchValue: undefined,
            options:[],
            companyName:'',
        }

    }

    componentDidMount = () => {

    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
      }
      
    handleBlur = () => {
        console.log('blur');
      }
      
    handleFocus = () => {
        console.log('focus');
      }
      
    handleSearchChange = (value) => {
        this.setState({ searchValue : value },() => {})
    }

    addCompany = () => {

    }

    addCompanyToState = () => {
        const val = document.getElementById('companyAdd').value
        this.setState({companyName: val })
    }

    getOptions = () => {
        return <div></div>
    }
    render() {
        const { getFieldDecorator } = this.props.form

        return(
            <div className="container">
                <Row>
                    <Col span={30}>
                    <span>
                        <center>
                        <b> Student Internship Review </b><br/>
                        <span>

                        <Select
                            style={{ width: 120 }}
                            dropdownRender={menu => (
                            <div>
                                {menu}
                                <Divider style={{ margin: '4px 0' }} />
                                <div onClick={this.addCompany} style={{ padding: '8px', cursor: 'pointer' }}>
                                <Icon type="plus" /> Add Company
                                </div>
                            </div>
                            )}
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {this.getOptions}
                        
                        </Select>
                        <br/>
                        <div>
                            <Input id="companyAdd"/>
                            <Button onClick={this.addCompanyToState}>Add Company</Button>
                        </div>
                        </span>
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
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" />)}
                            <span className="input-label">รหัสประจำตัว</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก รหัสประจำตัว' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">สาขาภาควิชา</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก สาขาภาควิชา' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมคอมพิวเตอร์" />)}
                            <span className="input-label">คณะ</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คณะ' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมศาสตร์" />)}
                            <br/>
                            <span className="input-label">ปฏิบัติงานสหกิจศึกษา ณ สถานประกอบการ (ภาษาไทยหรือภาษาอังกฤษ) </span>
                            {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '55%'}} placeholder="" />)}
                            <br/>
                            <span className="input-label">ตำแหน่งงาน</span>
                            {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ตำแหน่งงาน' }],})( <Input className="event-input" style={{width: '40%'}} placeholder="" />)}
                            ใคร่ขอเรียนแจ้ง รายละเอียดการปฏิบัติงานสหกิจศึกษา ดังนี้
                            <br/>
                        </Form.Item>
                    </span><br/>

                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>รายละเอียดเนื้องานที่ปฏิบัติ </b>(Job Description)  (นิสิตควรขอคำปรึกษาจากอาจารย์ที่ปรึกษาสหกิจศึกษาก่อนเขียนเพื่อความถูกต้องทางด้านวิชาการ หรือดูตัวอย่างประกอบ)</div><br/>
                            <Form.Item>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก รายละเอียดเนื้องานที่ปฏิบัติ' }],})( <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 10 }} />)}
                            </Form.Item>
                        </span>
                    </div><br/>

                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>หัวข้อรายงาน </b>(Report Title)</div><br/>
                            <Form.Item>
                                <span className="input-label">ภาษาไทย </span>
                                {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก หัวข้อรายงานภาษาไทย' }],})( <Input className="event-input" style={{width: '90%'}}  placeholder="" />)}<br/>
                                <span className="input-label">ภาษาอังกฤษ </span>
                                {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก หัวข้อรายงานภาษาอังกฤษ' }],})( <Input className="event-input" style={{width: '88%'}}  placeholder="" />)}
                            </Form.Item>
                        </span>
                    </div><br/><br/>

                    

                    <div align="right">
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก นิสิตผู้ปฏิบัติงานสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                        <br/>
                        <span className="input-label align-right-signature">นิสิตผู้ปฏิบัติงานสหกิจศึกษา</span>
                        <br/>
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก พนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                        <br/>
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ตำแหน่งพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ตำแหน่ง" />)}
                        <br/>
                        <span className="input-label align-right-signature">พนักงานที่ปรึกษา</span>
                    </div>
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

export default Form.create({ name: 'form_review' })(Form_Review)