import React from 'react'
import {Form, Input, Button, Row, Col} from 'antd'
import '../../css/Form.css'

class Form_3 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            token_username: "",
            token_status: ""
        }
    }

    componentDidMount = () => {

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
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
                        <span className="input-label"><b>ชื่อสถานประกอบการ </b>(ไทยหรืออังกฤษ) </span>
                        {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '73%'}} placeholder="" />)}
                    </Form.Item>
                    <Form.Item>
                        <span className="input-label"><b>สถานที่ตั้ง ณ อำเภอ/เขต </b></span>
                        {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก สถานที่ตั้ง ณ อำเภอ/เขต' }],})( <Input className="event-input" style={{width: '20%'}} placeholder="" />)}
                        <span className="input-label"><b>จังหวัด </b></span>
                        {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก จังหวัด' }],})( <Input className="event-input" style={{width: '20%'}} placeholder="" />)}
                        <span className="input-label"><b>โทรศัพท์/โทรสาร </b></span>
                        {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์/โทรสาร' }],})( <Input className="event-input" style={{width: '20%'}} placeholder="" />)}
                    </Form.Item>
                    <span>
                        <b>รายนามนิสิตที่ได้รับการนิเทศงานในสถานประกอบการแห่งนี้</b>
                        <Form.Item>
                            <span className="input-label tab">1. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <span className="input-label">JOB NO.</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก JOB NO.' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">สาขาวิชา</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก สาขาวิชา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="" />)}
                            <br/>

                            <span className="input-label tab">2. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <span className="input-label">JOB NO.</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก JOB NO.' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">สาขาวิชา</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก สาขาวิชา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="" />)}
                            <br/>

                            <span className="input-label tab">3. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <span className="input-label">JOB NO.</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก JOB NO.' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">สาขาวิชา</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก สาขาวิชา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="" />)}
                            <br/>

                            <span className="input-label tab">4. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <span className="input-label">JOB NO.</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก JOB NO.' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">สาขาวิชา</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก สาขาวิชา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="" />)}
                            <br/>
                        </Form.Item>

                        <div align="right">
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก สาขาวิชา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="e.g., รศ.ประดนเดช นีละคุปต์" />)}
                            <br/>
                            <span className="input-label align-right-signature">อาจารย์ที่ปรึกษาสหกิจศึกษาผู้นิเทศงาน</span>
                        </div>

                        <span><b>รายนามคณาจารย์ผู้ร่วมนิเทศงาน</b></span>
                        <Form.Item>
                            <span className="input-label tab">1. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label tab">2. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label tab">3. ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <br/>
                        </Form.Item>
                    </span>
                    <hr/><br/>
                    <span>
                        <b>คำชี้แจง</b><br/>
                        โปรดบันทึกหมายเลข 5, 4, 3, 2, 1 หรือ - ตามความเห็นของท่านในแต่ละหัวข้อการประเมิน โดยใช้เกณฑ์การประเมินค่าสำหรับระดับความคิดเห็น  ดังนี้ <br/>
                        <ul>
                            <li>5  หมายถึง  เห็นด้วยกับข้อความนั้นมากที่สุด  หรือเหมาะสมมากที่สุด</li>
                            <li>4  หมายถึง  เห็นด้วยกับข้อความนั้นมาก  หรือเหมาะสมมาก</li>
                            <li>3  หมายถึง  เห็นด้วยกับข้อความนั้นปานกลาง หรือเหมาะสมปานกลาง</li>
                            <li>2  หมายถึง  เห็นด้วยกับข้อความนั้นน้อย  หรือเหมาะสมน้อย</li>
                            <li>1  หมายถึง  เห็นด้วยกับข้อความนั้นน้อยที่สุด  หรือเหมาะสมน้อยที่สุด</li>
                            <li>-  หมายถึง  ไม่สามารถให้ระดับคะแนนได้ เช่น ไม่มีความเห็น ไม่มีข้อมูล ไม่ต้องการประเมิน เป็นต้น</li>
                        </ul>
                    </span>
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

export default Form.create({ name: 'form_3' })(Form_3)