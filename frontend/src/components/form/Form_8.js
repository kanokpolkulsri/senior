import React from 'react'
import {Form, Input, Button, Row, Col, Radio} from 'antd'
import '../../css/Form.css'
const { TextArea } = Input;
const RadioGroup = Radio.Group;

class Form_8 extends React.Component {
    
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
                        <b>แบบประเมินผลนิสิตสหกิจศึกษา</b><br/>
                        <span>โครงการนำร่องสหกิจศึกษาของทบวงมหาวิทยาลัย</span>
                        </center>
                    </span>
                    <br/>
                    <hr/>
                    <br/>
                    <span>
                    <b>คำชี้แจง</b><br/>
                    <ol>
                        <li>ผู้ให้ข้อมูลในแบบประเมินนี้ต้องเป็นพนักงานที่ปรึกษา (Job supervisor) ของนิสิตสหกิจศึกษาหรือบุคคลที่ได้รับมอบหมายให้ทำหน้าที่แทน</li>
                        <li>แบบประเมินผลนี้มีทั้งหมด 18 ข้อ โปรดให้ข้อมูลครบทุกข้อ เพื่อความสมบูรณ์ของการประเมินผล</li>
                        <li>โปรดให้คะแนนในช่องในแต่ละหัวข้อการประเมิน หากไม่มีข้อมูลให้ใส่เครื่องหมาย - และโปรดให้ความคิดเห็นเพิ่มเติม (ถ้ามี)</li>
                    </ol>
                    </span>
                    <Form onSubmit={this.handleSubmit}>
                    <span>
                        <Form.Item>
                            <span className="input-label">ชื่อ-นามสกุล</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุล' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" />)}
                            <span className="input-label">รหัสประจำตัว</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก รหัสประจำตัว' }],})( <Input className="event-input" style={{width: '26%'}}  placeholder="" />)}
                            <br/>
                            <span className="input-label">สาขาภาควิชา</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก สาขาภาควิชา' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมคอมพิวเตอร์" />)}
                            <span className="input-label">คณะ</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คณะ' }],})( <Input className="event-input" style={{width: '40%'}}  placeholder="วิศวกรรมศาสตร์" />)}
                            <br/>
                            <span className="input-label">ชื่อสถานประกอบการ </span>
                            {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อสถานประกอบการ' }],})( <Input className="event-input" style={{width: '82%'}} placeholder="" />)}
                            <br/>
                            <span className="input-label">ชื่อ-นามสกุลผู้ประเมิน </span>
                            {getFieldDecorator('f1_student_thaiFullName', {rules: [{ required: true, message: 'กรุณากรอก ชื่อ-นามสกุลผู้ประเมิน' }],})( <Input className="event-input" style={{width: '82%'}} placeholder="" />)}
                            <br/>
                            <span className="input-label">ตำแหน่ง</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ตำแหน่ง' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                            <span className="input-label">แผนก</span>
                            {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก แผนก' }],})( <Input className="event-input" style={{width: '30%'}}  placeholder="" />)}
                        </Form.Item>
                    </span><br/>

                    <span><b>ผลสำเร็จของงาน (Work Achievement)</b></span><br/><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b><center>หัวข้อประเมิน/Items</center></b></div>
                            <Form.Item>
                                {/* 1 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>1. ปริมาณงาน (Quantity of work)</b></span><br/><br/>
                                        <span className="tab">
                                            ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่กำหนด (ในระดับที่นิสิตจะปฏิบัติได้) และเทียบกับนิสิตทั่ว ๆ ไป
                                        </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 2 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>2. คุณภาพงาน (Quality of work)</b></span><br/><br/>
                                        <span className="tab">
                                        ทำงานได้ถูกต้องครบถ้วนสมบูรณ์ มีความปราณีตเรียบร้อย มีความรอบคอบ ไม่เกิดปัญหาติดตามมา งานไม่ค้างคา ทำงานเสร็จทันเวลาหรือก่อนเวลาที่กำหนด
                                        </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                </Form.Item>
                        </span>
                    </div><br/><br/>

                    <span><b>ความรู้ความสามารถ (Knowledge and Ablility)</b></span><br/><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b><center>หัวข้อประเมิน/Items</center></b></div>
                            <Form.Item>
                                {/* 3 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>3. ความรู้ความสามารถทางวิชาการ (Academic ability)</b></span><br/><br/>
                                        <span className="tab">
                                        นิสิตมีความรู้ทางวิชาการเพียงพอ ที่จะทำงานตามที่ได้รับมอบหมาย (ในระดับที่นิสิตจะปฏิบัติได้)
                                        </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 4 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>4. ความสามารถในการเรียนรู้และประยุกต์วิชาการ (Ability to learn and apply knowledge)</b></span><br/><br/>
                                        <span className="tab">
                                        ความรวดเร็วในการเรียนรู้ เข้าใจข้อมูล ข่าวสาร และวิธีการทำงาน ตลอดจนการนำความรู้ไปประยุกต์ใช้งาน
                                        </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 5 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>5. ความรู้ความชำนาญด้านปฏิบัติการ (Practical ability)</b></span><br/><br/>
                                        <span className="tab">
                                        เช่น การปฏิบัติงานในภาคสนาม ในห้องปฏิบัติการ 
                                        </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 6 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>6. วิจารณญาณและการตัดสินใจ (Judgement  and  dicision  making)</b></span><br/><br/>
                                        <span className="tab">
                                        ตัดสินใจได้ดี ถูกต้อง รวดเร็ว มีการวิเคราะห์ ข้อมูลและปัญหาต่างๆ อย่างรอบคอบก่อนการตัดสินใจ สามารถแก้ปัญหาเฉพาะหน้า สามารถไว้วางใจให้ตัดสินใจได้ด้วยตนเอง
                                        </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 7 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>7. การจัดการและวางแผน (Organization and planning)</b></span><br/><br/>
                                        <span className="tab"></span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 8 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>8. ทักษะการสื่อสาร (Communication skills)</b></span><br/><br/>
                                        <span className="tab">
                                        ความสามารถในการติดต่อสื่อสาร การพูด การเขียน และการนำเสนอ (Presentation) สามารถสื่อให้เข้าใจได้ง่าย เรียบร้อย ชัดเจน ถูกต้อง รัดกุม มีลำดับขั้นตอนที่ดี ไม่ก่อให้เกิดความสับสนต่อการทำงาน  รู้จักสอบถาม รู้จักชี้แจงผลการปฏิบัติงานและข้อขัดข้องให้ทราบ
                                        </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 9 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>9. การพัฒนาด้านภาษาและวัฒนธรรมต่างประเทศ (Foreign language and cultural development)</b></span><br/><br/>
                                        <span className="tab">เช่น ภาษาอังกฤษ การทำงานกับชาวต่างชาติ</span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 10 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>10. ความเหมาะสมต่อตำแหน่งงานที่ได้รับมอบหมาย (Suitability for Job position)</b></span><br/><br/>
                                        <span className="tab">สามารถพัฒนาตนเองให้ปฏิบัติงานตาม Job position และ Job description ที่มอบหมายได้อย่างเหมาะสมหรือตำแหน่งงานนี้เหมาะสมกับนิสิตคนนี้หรือไม่เพียงใด
                                        </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                </Form.Item>
                        </span>
                    </div><br/><br/>

                    <span><b>ความรับผิดชอบต่อหน้าที่ (Responsibility)</b></span><br/><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b><center>หัวข้อประเมิน/Items</center></b></div>
                            <Form.Item>
                                {/* 11 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>11. ความรับผิดชอบและเป็นผู้ที่ไว้วางใจได้ (Resposibility  and  dependability)</b></span><br/><br/>
                                        <span className="tab">
                                        ดำเนินงานให้สำเร็จลุล่วงโดยคำนึงถึงเป้าหมาย และความสำเร็จของงานเป็นหลัก
                                        ยอมรับผลที่เกิดจากการทำงานอย่างมีเหตุผล สามารถปล่อยให้ทำงาน (กรณีงานประจำ)
                                        ได้โดยไม่ต้องควบคุมมากจนเกินไป ความจำเป็นในการตรวจสอบขั้นตอนและผลงานตลอดเวลา
                                        สามารถไว้วางใจให้รับผิดชอบงานที่มากกว่าเวลาประจำ สามารถไว้วางใจได้แทบทุกสถานการณ์                           
                                    </span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 12 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>12. ความสนใจ อุตสาหะในการทำงาน (Interest in work)</b></span><br/><br/>
                                        <span className="tab">
                                        ความสนใจและความกระตือรือร้นในการทำงาน มีความอุตสาหะ ความพยายาม
                                        ความตั้งใจที่จะทำงานได้สำเร็จ ความมานะบากบั่น ไม่ย่อท้อต่ออุปสรรคและปัญหา</span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 13 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>13. ความสามารถเริ่มต้นทำงานได้ด้วยตนเอง (Initiative or self starter)</b></span><br/><br/>
                                        <span className="tab">เมื่อได้รับคำชี้แนะ สามารถเริ่มทำงานได้เอง โดยไม่ต้องรอคำสั่ง (กรณีงานประจำ) เสนอตัวเข้า
                                        ช่วยงานแทบทุกอย่าง มาขอรับงานใหม่ ๆ ไปทำ ไม่ปล่อยเวลาว่างให้ล่วงเลยไปโดยเปล่าประโยชน์</span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 14 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>14. การตอบสนองต่อการสั่งการ (Response to supervision)</b></span><br/><br/>
                                        <span className="tab">ยินดีรับคำสั่ง คำแนะนำ คำวิจารณ์ ไม่แสดงความอึดอัดใจ เมื่อได้รับคำติเตือนและวิจารณ์ความรวดเร็วในการปฏิบัติตามคำสั่ง การปรับตัวปฏิบัติตามคำแนะนำ ข้อเสนอแนะและวิจารณ์</span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                            </Form.Item>
                        </span>
                    </div><br/><br/>

                    <span><b>ลักษณะส่วนบุคคล (Personality)</b></span><br/><br/>
                    <div className="border-form-5">
                        <span>
                            <div className="border-form-5-title"><b><center>หัวข้อประเมิน/Items</center></b></div>
                            <Form.Item>
                                {/* 15 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>15. บุคลิกภาพและการวางตัว (Personality)</b></span><br/><br/>
                                        <span className="tab">มีบุคลิกภาพและวางตัวได้เหมาะสม เช่น ทัศนคติ วุฒิภาวะ ความอ่อนน้อมถ่อมตน การแต่งกาย กิริยาวาจา การตรงต่อเวลา และอื่น ๆ</span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 16 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>16. มนุษยสัมพันธ์ (Interpersonal skills)</b></span><br/><br/>
                                        <span className="tab">สามารถร่วมงานกับผู้อื่น การทำงานเป็นทีม สร้างมนุษยสัมพันธ์ได้ดี เป็นที่รักใคร่ชอบพอของผู้ร่วมงาน เป็นผู้ที่ช่วยก่อให้เกิดความร่วมมือประสานงาน</span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 17 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>17. ความมีระเบียบวินัย ปฏิบัติตามวัฒนธรรมขององค์กร (Discipline and adaptability to formal organization)</b></span><br/><br/>
                                        <span className="tab">ความสนใจเรียนรู้ ศึกษา กฎระเบียบ นโยบาย ต่าง ๆ และปฏิบัติตามโดยเต็มใจ
                                        การปฏิบัติตามระเบียบบริหารงานบุคคล (การเข้างาน ลางาน) ปฏิบัติตามกฎการรักษา
                                        ความปลอดภัยในโรงงาน การควบคุมคุณภาพ 5 ส และอื่น ๆ</span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                                {/* 18 */}
                                <div className="sup-set">
                                    <div className="sup-label-box sup-label">
                                        <span><b>18. คุณธรรมและจริยธรรม (Ethics and morality)</b></span><br/><br/>
                                        <span className="tab">มีความซื่อสัตย์ สุจริต มีจิตใจสะอาด รู้จักเสียสละ ไม่เห็นแก่ตัว เอื้อเฟื้อช่วยเหลือผู้อื่น</span>
                                    </div>
                                    <div className="sup-score-box">
                                        <span><center><b>20 คะแนน</b></center></span>
                                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก คะแนน' }],})( <Input className="sup-score-input" placeholder="" />)}
                                    </div>
                                </div>
                            </Form.Item>
                        </span>
                    </div><br/><br/>

                    <span><b>โปรดให้ข้อคิดเห็นที่เป็นประโยชน์แก่นิสิต (Please give comments on the student)</b></span><br/><br/>
                    <div className="border-form-5-comments-box">
                    <span>
                        <div className="border-form-5-comments-title"><b><center>จุดเด่นของนิสิต (Strength)</center></b></div>
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก จุดเด่นของนิสิต' }],})( <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />)}
                        </span>
                    </div>
                    <div className="border-form-5-comments-box none-border-left">
                    <span>
                        <div className="border-form-5-comments-title"><b><center>ข้อควรปรับปรุงของนิสิต (Improvement)</center></b></div>
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ข้อควรปรับปรุงของนิสิต' }],})( <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />)}
                    </span>
                    </div><br/><br/>
                    <span><b>หากนิสิตผู้นี้สำเร็จการศึกษาแล้ว ท่านจะรับเข้าทำงานในสถานประกอบการนี้หรือไม่ </b><i>หากมีโอกาสเลือก</i><br/>
                    <b>Once this student graduats, will you be interested to offer him/her a job?</b></span><br/>
                    {getFieldDecorator('radio-group')(
                        <RadioGroup>
                            <Radio value={1}>รับ (Yes)</Radio>
                            <Radio value={2}>ไม่แน่ใจ (Not sure)</Radio>
                            <Radio value={3}>ไม่รับ (No)</Radio>
                        </RadioGroup>
                        )}
                    <br/><br/>
                    <Form.Item>
                        <span><b>ข้อคิดเห็นเพิ่มเติม (Other comments)</b></span>
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ข้อคิดเห็นเพิ่มเติม' }],})( <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 10 }} />)}
                    </Form.Item>
                    <br/><br/>

                    <div align="right">
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ชื่อพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ชื่อ-นามสกุล" />)}
                        <br/>
                        {getFieldDecorator('f1_student_postcode', {rules: [{ required: true, message: 'กรุณากรอก ตำแหน่งพนักงานที่ปรึกษา' }],})( <Input className="event-input" style={{width: '15%'}}  placeholder="ตำแหน่ง" />)}
                        <br/>
                        <span className="input-label align-right-signature">พนักงานที่ปรึกษา</span>
                    </div>
                    <br/><br/>

                    <span><b>หมายเหตุ : หากโครงการฯ ไม่ได้รับแบบประเมินนี้ภายในระยะเวลาที่กำหนด นิสิตจะไม่ผ่านการประเมินผล</b></span>

                    <div className="border-form-5-staff">
                        <span>
                        <center><b><u>สำหรับเจ้าหน้าที่สหกิจศึกษา (Co-op staff only)</u></b></center><br/>
                        <ul>
                            <li>คะแนนรวม ข้อ 1-2	 =   _____+1 = _____   คะแนน </li>
                            <li>คะแนนรวม ข้อ 3-10	 =   _____+4 = _____   คะแนน </li>
                            <li>คะแนนรวม ข้อ 11-14	 =   _____+2 = _____   คะแนน </li>
                            <li>คะแนนรวม ข้อ 15-18	 =   _____+2 = _____   คะแนน </li>
                        </ul>
                        <b>รวม = ____ /100 คะแนน</b>
                        </span>
                    </div><br/><br/>
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

export default Form.create({ name: 'form_8' })(Form_8)