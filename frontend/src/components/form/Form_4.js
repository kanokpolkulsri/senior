import React from 'react'
import {Form, Input, Button, Row, Col} from 'antd'
import '../../css/Form.css'

class Form_4 extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {}
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
                            {getFieldDecorator('f4_fullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" />)}
                            <span className="input-label">รหัสประจำตัว</span>
                            {getFieldDecorator('f4_id', {rules: [{ required: true, message: 'กรุณากรอก รหัสประจำตัว' }],})( <Input className="event-input" style={{width: '23%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">สาขาภาควิชา</span>
                            {getFieldDecorator('f4_department', {rules: [{ required: true, message: 'กรุณากรอก สาขาภาควิชา' }],})( <Input className="event-input" style={{width: '39%'}}  placeholder="วิศวกรรมคอมพิวเตอร์" />)}
                            <span className="input-label">คณะ</span>
                            {getFieldDecorator('f4_faculty', {rules: [{ required: true, message: 'กรุณากรอก คณะ' }],})( <Input className="event-input" style={{width: '39%'}}  placeholder="วิศวกรรมศาสตร์" />)}
                            <br/>
                            <span className="input-label">ชื่อสถานประกอบการ (ภาษาอังกฤษ) </span>
                            {getFieldDecorator('f4_companyName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '80%'}} placeholder="" />)}
                            <br/>ขอแจ้งรายละเอียดเกี่ยวกับที่พักระหว่างปฏิบัติงานสหกิจศึกษา ดังนี้<br/>	
                            <span className="input-label">เลขที่</span>
                            {getFieldDecorator('f4_dorm_1', {rules: [{ required: true, message: 'กรุณากรอก เลขที่' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ถนน</span>
                            {getFieldDecorator('f4_dorm_2', {rules: [{ required: true, message: 'กรุณากรอก ถนน' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ซอย</span>
                            {getFieldDecorator('f4_dorm_3', {rules: [{ required: true, message: 'กรุณากรอก ซอย' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ตำบล</span>
                            {getFieldDecorator('f4_dorm_4', {rules: [{ required: true, message: 'กรุณากรอก ตำบล' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">อำเภอ</span>
                            {getFieldDecorator('f4_dorm_5', {rules: [{ required: true, message: 'กรุณากรอก อำเภอ' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">จังหวัด</span>
                            {getFieldDecorator('f4_dorm_6', {rules: [{ required: true, message: 'กรุณากรอก จังหวัด' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">รหัสไปรษณีย์</span>
                            {getFieldDecorator('f4_dorm_7', {rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">โทรศัพท์</span>
                            {getFieldDecorator('f4_dorm_8', {rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">โทรสาร</span>
                            {getFieldDecorator('f4_dorm_9', {rules: [{ required: true, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/>ชื่อที่อยู่ ผู้ที่สามารถติดต่อได้ในกรณีฉุกเฉิน {getFieldDecorator('f4_emergency_1', {rules: [{ required: true, message: 'กรุณากรอก xxxxx' }],})( <Input className="event-input" style={{width: '68%'}}  placeholder="" />)}
                            <br/>	
                            <span className="input-label">เลขที่</span>
                            {getFieldDecorator('f4_emergency_2', {rules: [{ required: true, message: 'กรุณากรอก เลขที่' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ถนน</span>
                            {getFieldDecorator('f4_emergency_3', {rules: [{ required: true, message: 'กรุณากรอก ถนน' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ซอย</span>
                            {getFieldDecorator('f4_emergency_4', {rules: [{ required: true, message: 'กรุณากรอก ซอย' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <span className="input-label">ตำบล</span>
                            {getFieldDecorator('f4_emergency_5', {rules: [{ required: true, message: 'กรุณากรอก ตำบล' }],})( <Input className="event-input" style={{width: '17%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">อำเภอ</span>
                            {getFieldDecorator('f4_emergency_6', {rules: [{ required: true, message: 'กรุณากรอก อำเภอ' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">จังหวัด</span>
                            {getFieldDecorator('f4_emergency_7', {rules: [{ required: true, message: 'กรุณากรอก จังหวัด' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">รหัสไปรษณีย์</span>
                            {getFieldDecorator('f4_emergency_8', {rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">โทรศัพท์</span>
                            {getFieldDecorator('f4_emergency_9', {rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">โทรสาร</span>
                            {getFieldDecorator('f4_emergency_10', {rules: [{ required: true, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/><b><u>แผนที่แสดงตำแหน่งที่พักอาศัย</u></b><br/>
                            เพื่อความสะดวกในการนิเทศงานของคณาจารย์ โปรดระบุชื่อถนนและสถานที่สำคัญใกล้เคียงที่สามารถเข้าใจโดยง่าย<br/>
                            {/* upload button */}
                        </Form.Item>

                        <div align="right">
                            {getFieldDecorator('f4_nisit_sign', {rules: [{ required: true, message: 'กรุณากรอก ชื่อนิสิตผู้ปฏิบัติงานสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label align-right-signature">นิสิตผู้ปฏิบัติงานสหกิจศึกษา</span>
                        </div>

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

export default Form.create({ name: 'form_4' })(Form_4)