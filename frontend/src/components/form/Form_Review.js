import React from 'react'
import {Form, Input, Button, Row, Col, Select, Icon, Divider,  Rate} from 'antd'
import '../../css/Form.css'

import axios from 'axios'
const Config = require('../../Config')
const prePath = Config.API_URL + "/images/"
const API_URL = Config.API_URL + "/upload"

const Option = Select.Option;
const { TextArea } = Input;
const API_REVIEW = require('../../api/Review')
const VariableConfig = require('../../api/VariableConfig')
const API_ASSIGNMENT_ADMIN = require('../../api/Assignment_Admin')

class Form_Review extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            data: [],
            companyList: [],
            searchValue: undefined,
            options:[],
            companyName:'',
            transSelect:[],
            jobSelect:[],
            status:0,
            formField: {},
            logoPathFiel: ""
        }
    }

    componentDidMount = () => {
        console.log("didmount");
        
        this.API_GET_ALL_COMPANY_NAME()
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
      
        this.API_GET_DATA_ID_COMPANY(value)
      }
      
    handleBlur = () => {
        console.log('blur');
      }
      
    handleFocus = () => {
        console.log('focus');
      }
      
  

    addCompany = () => {
        console.log("add company");
        
        this.refs["addCompanyBlock"].classList.remove("hidden")
    }

    addCompanyToState = () => {
        const val = document.getElementById('companyAdd').value
        this.setState({companyName: val,status:0 })
        this.props.form.setFieldsValue({companyName:val})
        
    }

    getOptions = () => {
        const options = this.state.companyList.map((option)=>
            <Option value={option._id} >{option.companyName}</Option>
        )
        return options
    }

    getTransTag = () => {
        const transTag = VariableConfig.transTag.map((tag)=>
            <Option value={tag.toLowerCase()}>{tag.toLowerCase()}</Option>
        )
        return transTag
    }
    getJobDesc = () => {
        const tag = VariableConfig.tagList.map((tag)=>
            <Option value={tag.toLowerCase()}>{tag}</Option>
        )
        return tag
    }

    handleTransportChange = (value) => {
        console.log(value);
        
        this.setState({transSelect: value})
        const { form } = this.props;
        // const keys = form.getFieldValue('transport');
        const nextKeys = value
        form.setFieldsValue({
          transportation: nextKeys,
        });
    }


    handleJobDescChange = (value) => {
        console.log(value);
        
        this.setState({jobSelect: value})
        const { form } = this.props;
        // const keys = form.getFieldValue('transport');
        const nextKeys = value
        form.setFieldsValue({
          jobDescriptionContent: nextKeys,
        });
    }


    API_GET_ALL_COMPANY_NAME = () => {
        API_REVIEW.GET_ALL_COMPANY_NAME()
        .then(response => {
            console.log(response);
            
            if(response.code === 1){
                this.setState({companyList:response.data})
            }
        })
    }

    API_POST_UPDATE = (values) => {
        console.log(values);
        
        /*
            values = {
                "_id": "***** must have ******"
                "companyName" : "Thomson Reuters",
                "companyBackground" : "Refinitiv",
                "jobDescriptionTitle" : [ 
                    "application", 
                    "network", 
                    "datascience", 
                    "iot"
                ],
                "jobDescriptionContent" : {
                    "application" : "Chatbot content",
                    "network" : "Frontend Development content",
                    "datascience" : "Backend Development content",
                    "iot" : "Business Process Improvement content"
                },
                "payment" : 500,
                "star" : 3,
                "logo" : "logo.png",
                "transportationTitle" : [ 
                    "bts", 
                    "mrt", 
                    "bus"
                ],
                "transportation" : {
                    "bts" : "BTS Saladang แล้วเดินผ่านลานจอดรถไปด้านหลังสีลมคอมเพล็กซ์ เดินตรงไปในซอย...",
                    "mrt" : "MRT Silom จะไกลกว่าเดินจาก BTS เล็กน้อย เปิดกูเกิ้ลแมปเอานะ...",
                    "bus" : "Bus..."
                },
                "activities" : "กิจกรรมมีให้ทำเยอะมากๆๆๆ toastmaster อันนี้ช่วยฝึก public speaking ได้ดีมากๆ ให้ออกไปพูดตามหัวข้อข้างหน้าภาษาอังกฤษ UCD101 อันนี้สอนเกี่ยวกับ user centered design bootcamp อันนี้เค้าจะจำลอง startup ในบริษัท ให้เสนอไอเดีย รวมทีมละก็ตีๆๆไอเดียให้มันเวิร์กแล้ว pitch ขอทุนจากบริษัท เหมือนแข่งสตาร์ทอัพเลยย",
                "previousIntern" : [ 
                    {
                        "year" : "2018",
                        "cpe" : [ 
                            "Thanjira Sukkree"
                        ],
                        "ske" : [ 
                            "Piromsurang Rungserichai"
                        ]
                    }, 
                    {
                        "year" : "2017",
                        "cpe" : [ 
                            "Thanjira Sukkree"
                        ],
                        "ske" : [ 
                            "Piromsurang Rungserichai"
                        ]
                    }
                ],
                "comments" : [ 
                    {
                        "star" : 3,
                        "content" : "อยู่สีลมเลยมีที่ให้เลือกกินเยอะ ร้านอาหารแถวบอเยอะมากๆ แล้วก็ได้กินฟรีบ่อยมาก มีโอกาสได้รู้จักเพื่อนอินเทิร์นเยอะ เพราะมีกิจกรรมร่วมกันตลอด"
                    }, 
                    {
                        "star" : 2,
                        "content" : "เพื่อนดี แต่งานชิวเกิน  ถ้าอยากได้ความรู้โปรแกรมมิ่งมากๆอาจจะไม่ชอบ"
                    }
                ]
            }
        */
    //    API_REVIEW.POST_UPDATE(values)
    //    .then(response => {
    //        if(response.code === 1){
    //             console.log(response);
                
    //        }
    //    })
    }

    API_POST_ADD = (values) => {
        console.log(values);
        
        /*
            values = {
                "companyName" : "Thomson Reuters",
                "companyBackground" : "Refinitiv",
                "jobDescriptionTitle" : [ 
                    "application", 
                    "network", 
                    "datascience", 
                    "iot"
                ],
                "jobDescriptionContent" : {
                    "application" : "Chatbot content",
                    "network" : "Frontend Development content",
                    "datascience" : "Backend Development content",
                    "iot" : "Business Process Improvement content"
                },
                "payment" : 500,
                "star" : 3,
                "logo" : "logo.png",
                "transportationTitle" : [ 
                    "bts", 
                    "mrt", 
                    "bus"
                ],
                "transportation" : {
                    "bts" : "BTS Saladang แล้วเดินผ่านลานจอดรถไปด้านหลังสีลมคอมเพล็กซ์ เดินตรงไปในซอย...",
                    "mrt" : "MRT Silom จะไกลกว่าเดินจาก BTS เล็กน้อย เปิดกูเกิ้ลแมปเอานะ...",
                    "bus" : "Bus..."
                },
                "activities" : "กิจกรรมมีให้ทำเยอะมากๆๆๆ toastmaster อันนี้ช่วยฝึก public speaking ได้ดีมากๆ ให้ออกไปพูดตามหัวข้อข้างหน้าภาษาอังกฤษ UCD101 อันนี้สอนเกี่ยวกับ user centered design bootcamp อันนี้เค้าจะจำลอง startup ในบริษัท ให้เสนอไอเดีย รวมทีมละก็ตีๆๆไอเดียให้มันเวิร์กแล้ว pitch ขอทุนจากบริษัท เหมือนแข่งสตาร์ทอัพเลยย",
                "previousIntern" : [ 
                    {
                        "year" : "2018",
                        "cpe" : [ 
                            "Thanjira Sukkree"
                        ],
                        "ske" : [ 
                            "Piromsurang Rungserichai"
                        ]
                    }, 
                    {
                        "year" : "2017",
                        "cpe" : [ 
                            "Thanjira Sukkree"
                        ],
                        "ske" : [ 
                            "Piromsurang Rungserichai"
                        ]
                    }
                ],
                "comments" : [ 
                    {
                        "star" : 3,
                        "content" : "อยู่สีลมเลยมีที่ให้เลือกกินเยอะ ร้านอาหารแถวบอเยอะมากๆ แล้วก็ได้กินฟรีบ่อยมาก มีโอกาสได้รู้จักเพื่อนอินเทิร์นเยอะ เพราะมีกิจกรรมร่วมกันตลอด"
                    }, 
                    {
                        "star" : 2,
                        "content" : "เพื่อนดี แต่งานชิวเกิน  ถ้าอยากได้ความรู้โปรแกรมมิ่งมากๆอาจจะไม่ชอบ"
                    }
                ]
            }
        */
        // API_REVIEW.POST_ADD(values)
        // .then(response => {
        //     if(response.code === 1){

        //     }
        // })
    }

    API_GET_DATA_ID_COMPANY = (id) => {
        API_REVIEW.GET_DATA_ID_COMPANY(id)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({data:response.data,status:1})
                this.props.form.setFieldsValue({companyName:response.data.companyName,
                companyBackground:response.data.companyBackground,
                payment:response.data.payment,
                activities:response.data.activities,
                transportationTitle: response.data.transportationTitle,
                transportation: response.data.transportationTitle})
                this.setState({companyName: response.data.companyName, transSelect: response.data.transportationTitle })
            }
        })
    }

    handleFile = (e) => {
        let newField = e.target.name
        let newFormField = this.state.formField
        let pathFile = ""
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append('file', file)
        axios.post(API_URL, formData, {})
        .then(response => {
            
            if(response.status === 200){
                let filename = response.data.filename
                if(filename !== undefined){
                    pathFile = prePath + filename
                    newFormField[newField] = pathFile
                    this.setState({formField: newFormField})
                }
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // plam to add path logo
                // const params = {}
                // let formField = this.state.formField
                // Object.keys(values).forEach(key => params[key] = values[key])
                // Object.keys(formField).forEach(key => params[key] = formField[key])
                // console.log(params)

                console.log(values)
                const trans = values.transportation.map((key)=>({key:values[key]}))
                values.transportation = trans
                
                if(this.state.status === 1){
                    values.jobDescriptionContent.forEach((key)=> {
                        if(this.state.data.jobDescriptionContent.key){
                            this.state.data.jobDescriptionContent.key += "\n"+ values[key]   
                        }
                        else{
                            this.state.data.jobDescriptionContent.key = values[key]
                        }
                
                    })
                    values.jobDescriptionContent = this.state.data.jobDescriptionContent
                    const comment = {"star":values["star"],"content":values["comments"]}
                    let comments = this.state.data.comments
                    comments.push(comment)
                    values.comments = comment
                }
                else if(this.state.status === 0){
                    values.jobDescriptionContent.forEach((key)=> {
                        values.jobDescriptionContent.key = values[key]
                    })
                    const comment = {"star":values["star"],"content":values["comments"]}
                    values.comment = []
                    values.comments.push(comment)
                }
                this.state.status === 1? this.API_POST_UPDATE(values): this.API_POST_ADD(values)
            }
        })

    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        getFieldDecorator('transportation', { initialValue: this.state.data.transportationTitle?this.state.data.transportationTitle:this.state.transSelect});
        getFieldDecorator('jobDescriptionContent',{ initialValue: this.state.jobSelect })
        const transport = getFieldValue('transportation');
        const jobDesc = getFieldValue('jobDescriptionContent')

        const tranItems = this.state.transSelect.length > 0? transport.map((k, index) => (
            <Form.Item required={false} key={index}>
                <span className="tag trans-tag">{k}</span>       
            {getFieldDecorator(`${k}`, {
              initialValue: this.state.data.transportation?this.state.data.transportation[k.toLowerCase()]:"",
              rules: [{
                required: false,
                whitespace: true,
                message: "Please input more information about this kind of tranportation",
              }],
            })(
                <Input className="question event-input" placeholder={`please give more detail about your work`} />
            )}
          </Form.Item>
        )):<div></div>

        const jobDescItems = this.state.jobSelect.length > 0? jobDesc.map((k, index) => (
            <Form.Item required={true} key={index}>
                <span className="">{k}:</span>       
            {getFieldDecorator(`${k}`, {
              rules: [{
                required: false,
                whitespace: true,
                message: "Please input more information about your work",
              }],
            })(
                <Input className="question event-input" placeholder="please give more information about how you get to company" />
            )}
          </Form.Item>
        )):<div></div>


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
                            placeholder="Select a company"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {this.getOptions()}
                        
                        </Select>
                        <br/>
                        <div ref="addCompanyBlock" className="hidden">
                            <Input id="companyAdd" style={{ width: "40%" }}/>
                            <Button onClick={this.addCompanyToState}>Add Company</Button>
                        </div>
                        </span>
                        </center>
                    </span>
                    <br/>
                    <hr/>
                    <br/>

                    <Form onSubmit={this.handleSubmit}>
                    <span>
                        <Form.Item>
                            <span className="input-label">Company Name</span>
                            {getFieldDecorator('companyName', {rules: [{ required: true, message: 'please select company' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" disabled={true}/>)}<br/>
                            <span className="input-label">Company Background</span>
                            {getFieldDecorator('companyBackground', {rules: [{ required: true, message: 'please input company background' }],})( <TextArea className="event-input" style={{width: '55%'}}  placeholder=""  autosize />)}
                            <br/>



                            <span className="input-label">Logo</span>
                            <input type ="file" name="logo" onChange={(e)=>this.handleFile(e)} />
                            <span className="upload-span"><a href="">{this.logoPathFile}</a></span>
                            <br/>
               



                            <span className="input-label">Job Description</span>
                            {getFieldDecorator('jobDescriptionTitle')(<Select
                                mode="multiple"
                                style={{ width: '30%' }}
                                placeholder=""
                                onChange={this.handleJobDescChange}
                            >
                                {this.getJobDesc()}
                            </Select>)}
                            {jobDescItems}           
                            <span className="input-label">Payment</span>
                            {getFieldDecorator('payment', {rules: [{ required: true, message: 'please input payment' }],})( <Input className="event-input" style={{width: '10%'}}  placeholder=""  />)}
                            <br/>
                            <span className="input-label">Transportation Options</span>
                            {getFieldDecorator('transportationTitle')(<Select
                                mode="tags"
                                style={{ width: '30%' }}
                                placeholder="Bus,BTS,MRT"
                                onChange={this.handleTransportChange}
                            >
                                {this.getTransTag()}
                            </Select>)}
                            {tranItems}
                            <span className="input-label">Activity</span>
                            {getFieldDecorator('activities', {rules: [{ required: false, message: 'please input activity' }],})( <TextArea className="event-input" style={{width: '55%'}} placeholder="" autosize/>)}
                            <br/>
                            <span className="input-label">Comments</span>
                            {getFieldDecorator('star', {rules: [{ required: true, message: 'please rate your internship experience' }],})( <Rate count={3} />)}
                            {getFieldDecorator('comments', {rules: [{ required: true, message: 'please input some comment or feedback' }],})( <TextArea className="event-input" style={{width: '40%'}} placeholder="" autosize/>)}
                            <br/>
                        </Form.Item>
                    </span><br/>
                    <Form.Item>
                        <center>
                        <Button htmlType="submit" className="submit-btn">Submit Assignment</Button><br/>
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