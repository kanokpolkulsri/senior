import React from 'react'
import {Form, Input, Button, Row, Col} from 'antd'
import '../../css/Form.css'
const { TextArea } = Input;

class Form_7 extends React.Component {
    
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
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" />)}
                            <span className="input-label">รหัสประจำตัว</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก รหัสประจำตัว' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">สาขาภาควิชา</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก สาขาภาควิชา' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมคอมพิวเตอร์" />)}
                            <span className="input-label">คณะ</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คณะ' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมศาสตร์" />)}
                            <br/>
                            <span className="input-label">ปฏิบัติงานสหกิจศึกษา ณ  สถานประกอบการ </span>
                            {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '70%'}} placeholder="" />)}
                            <br/>
                            <span className="input-label">เลขที่</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก เลขที่' }],})( <Input className="event-input" style={{width: '18%'}}  placeholder="" />)}
                            <span className="input-label">ถนน</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ถนน' }],})( <Input className="event-input" style={{width: '18%'}}  placeholder="" />)}
                            <span className="input-label">ซอย</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ซอย' }],})( <Input className="event-input" style={{width: '18%'}}  placeholder="" />)}
                            <span className="input-label">ตำบล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ตำบล' }],})( <Input className="event-input" style={{width: '18%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">อำเภอ</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก อำเภอ' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">จังหวัด</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก จังหวัด' }],})( <Input className="event-input" style={{width: '25%'}}  placeholder="" />)}
                            <span className="input-label">รหัสไปรษณีย์</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก รหัสไปรษณีย์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">โทรศัพท์</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก โทรศัพท์' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                            <span className="input-label">โทรสาร</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก โทรสาร' }],})( <Input className="event-input" style={{width: '20%'}}  placeholder="" />)}
                        </Form.Item>
                    </span><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>1. หัวข้อรายงาน (Report Title) </b><i>(อาจจะขอเปลี่ยนแปลงหรือแก้ไขเพิ่มเติมได้ในภายหลัง)</i></div><br/>
                            <Form.Item>
                                <span className="input-label">ภาษาไทย </span>
                                {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก หัวข้อรายงานภาษาไทย' }],})( <Input className="event-input" style={{width: '82%'}}  placeholder="" />)}<br/>
                                <span className="input-label">ภาษาอังกฤษ </span>
                                {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก หัวข้อรายงานภาษาอังกฤษ' }],})( <Input className="event-input" style={{width: '80%'}}  placeholder="" />)}
                            </Form.Item>
                        </span>
                    </div><br/><br/>

                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b>2. รายละเอียดเนื้อหาของรายงาน </b><i>(อาจจะขอเปลี่ยนแปลงหรือแก้ไขเพิ่มเติมได้ในภายหลัง)</i></div><br/>
                            <Form.Item>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก รายละเอียดเนื้อหาของรายงาน' }],})( <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 10 }} />)}
                            </Form.Item>
                        </span>
                    </div><br/><br/>

                    <div align="right">
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อนิสิตผู้ปฏิบัติงานสหกิจศึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                        <br/>
                        <span className="input-label align-right-signature">นิสิตผู้ปฏิบัติงานสหกิจศึกษา</span>
                        <br/>
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
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

export default Form.create({ name: 'form_7' })(Form_7)