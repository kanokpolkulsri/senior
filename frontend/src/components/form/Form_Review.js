import React from 'react'
import {Form, Input, Button, Row, Col, Select, Icon, Divider,  Rate} from 'antd'
import '../../css/Form.css'
import moment from 'moment'

import axios from 'axios'
const Config = require('../../Config')
const prePath = Config.API_URL + "/images/"
const API_URL = Config.API_URL + "/upload"

const Option = Select.Option;
const { TextArea } = Input;
const API_REVIEW = require('../../api/Review')
const API_TOKEN = require('../../api/Token')
const API_ASSIGNMENT_STUDENT = require('../../api/Assignment_Student')
const API_ASSIGNMENT_ADMIN = require('../../api/Assignment_Admin')
const VariableConfig = require('../../api/VariableConfig')

class Form_Review extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            defaultForm: 12,
            data: [],
            companyList: [],
            searchValue: undefined,
            options:[],
            companyName:'',
            transSelect:[],
            jobSelect:[],
            status:0,
            token_username: "",
            token_status: "student",
            token_firstname: "",
            token_lastname: "",
            readonly: "value",
            dataCompany:[],
            studentStatus:0,
            _id:"",
            formField: {},
            logoPathName: ""
        }
    }

    getCurrentId = (year) => {
        let params = {defaultForm: this.state.defaultForm, year: year}
        API_ASSIGNMENT_ADMIN.POST_DEADLINE_DEFAULTFORM_YEAR(params)
        .then(response => {
            if(response.code === 1){
                console.log(response.data)
            }
        })
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

    componentDidMount = () => {
        this.POST_CHECK_TOKEN()        
        this.API_GET_ALL_COMPANY_NAME()
    }

    handleChange = (value) => {
        if(value === "addCompany")
            this.addCompany()
        else{
            this.API_GET_DATA_ID_COMPANY(value)
            this.refs["addCompanyBlock"].classList.add("hidden")

        }
      }
      
    handleBlur = () => {
        console.log('blur');
      }
      
    handleFocus = () => {
        console.log('focus');
      }
      
  

    addCompany = () => {
        
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

    POST_FORM_DATA = (username) => {
        let params = {username: username, defaultForm: this.state.defaultForm}
        API_ASSIGNMENT_STUDENT.POST_FORM_DATA(params)
        .then(response => {
            if(response.code === 1){
                console.log('student',response.data)
                let readonlyVal = this.state.token_status === "admin"? "readOnly":"value"
                this.setState({readonly:readonlyVal})
                const status = response.data[0].status;
                this.setState({data:response.data[0].formData,status:1,studentStatus:status,_id:response.data[0]._id})
                response.data = response.data[0].formData
                let comment = response.data.comments.filter(comment => comment["username"] === username)
                this.props.form.setFieldsValue({companyName:response.data.companyName,
                companyBackground:response.data.companyBackground,
                payment:response.data.payment,
                activities:response.data.activities,
                jobDescriptionTitle:response.data.jobDescriptionTitle,
                jobDescriptionContent:response.data.jobDescriptionTitle,                
                transportationTitle: response.data.transportationTitle,
                transportation: response.data.transportationTitle,
                comments:comment[0].content,
                star:comment[0]["star"]})
                this.setState({formField: {'logo': response.data.logo}, logoPathName: (response.data.logo) === undefined ? "" : (response.data.logo).split('/')[4], companyName: response.data.companyName, transSelect: response.data.transportationTitle, jobSelect: response.data.jobDescriptionTitle })
            }
        })
    }

    API_GET_ALL_COMPANY_NAME = () => {
        API_REVIEW.GET_ALL_COMPANY_NAME()
        .then(response => {
            // console.log(response);
            if(response.code === 1){
                this.setState({companyList:response.data})
            }
        })
    }

    POST_UPDATE_FORM = (values) => {
        let params = {username: this.state.token_username, defaultForm: this.state.defaultForm, formData: values, status: 1, statusDescription: "turned in", submitDate: moment()}
        API_ASSIGNMENT_STUDENT.POST_UPDATE_FORM(params)
        .then(response => {
            if(response.code === 1){
                // console.log(params);
                this.props.history.push("/assignment/assigned")
            }
        })
    }

    API_POST_UPDATE = (values) => {
        // console.log("update api",values);
        API_REVIEW.POST_UPDATE(values)
        .then(response => {
            if(response.code === 1){
                // this.props.history.push("/assignment/assigned")
                // console.log("update",response);
            }
        })
    }

    API_POST_ADD = (values) => {
        // console.log("add",values);
        API_REVIEW.POST_ADD(values)
        .then(response => {
            if(response.code === 1){
                // this.props.history.push("/assignment/assigned")
            }
        })
    }

    API_GET_DATA_ID_COMPANY = (id) => {
        API_REVIEW.GET_DATA_ID_COMPANY(id)
        .then(response => {
            if(response.code === 1){
                this.setState({data:response.data,status:1})
                this.setState({_id:response.data._id})
                this.props.form.setFieldsValue({companyName:response.data.companyName,
                companyBackground:response.data.companyBackground,
                payment:response.data.payment,
                activities:response.data.activities,
                
                transportationTitle: response.data.transportationTitle,
                transportation: response.data.transportationTitle})
                this.setState({formField: {'logo': response.data.logo}, logoPathName: (response.data.logo).split('/')[4], companyName: response.data.companyName, transSelect: response.data.transportationTitle })
            }
        })
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let firstname = response.token_firstname
            let lastname = response.token_lastname
            let username = response.token_username
            let status = response.token_status
            if(status === "admin"){
                this.POST_FORM_DATA(this.props.match.params.idStudent)
            }else if(status === "student"){
                this.POST_FORM_DATA(username)
            }

            this.setState({token_username: username, token_status: status, token_firstname: firstname, token_lastname: lastname})
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
                console.log("values ", values)
                values['logo'] = this.state.formField.logo
                let valuesUpdate = Object.assign({},values)
                let trans = {}
                values.transportation.forEach((key)=>{trans[key] = values[key]})
                // console.log(trans)
                values.transportation = trans
                if(this.state.studentStatus === 1){
                    this.state.data.comments.forEach((comment)=>{
                        if(comment.username === this.state.token_username){
                            comment.star = values["star"]
                            comment.content = values["comments"]
                        }
                    })
                    values["comments"] = this.state.data.comments
                    let checkJob = false;
                    // console.log("jobContent",this.state.data.jobDescriptionContent);
                    
                    let jobTmp = Object.assign({},this.state.data.jobDescriptionContent)

                    values.jobDescriptionTitle.forEach((key)=> {
                        if(jobTmp[key]){
                            jobTmp[key].forEach((job)=>{
                                if(job.username === this.state.token_username){
                                    job.content = values[key]
                                    checkJob = true
                                }
                                
                            })
                            if(!checkJob)
                                jobTmp[key].push({"username":this.state.token_username,"content":values[key]})
                        }
                        else{
                            jobTmp[key] = [{"username":this.state.token_username,"content":values[key]}]
                        }
                
                    })
                    values.jobDescriptionContent = jobTmp
                    let keyJob = Object.keys(jobTmp)
                    console.log("keyJob",keyJob)
                    values.jobDescriptionTitle = keyJob
                    
                    // console.log('this.state.job',this.state.data.jobDescriptionTitle);
                    // console.log('jobTmp',jobTmp);
                }else{
                    let year = parseInt("25"+this.state.token_username.substring(0,2)) - 540
                    if(this.state.status === 1){
                        let check = false
                        this.state.data["previousIntern"].forEach((internYear)=>{
                            if(internYear.year === year){
                                internYear.members.push(this.state.token_firstname+" "+this.state.token_lastname)
                                check = true
                            }
                        })
                        if(!check)
                            this.state.data["previousIntern"].push({"year":year.toString(),"members":[this.state.token_firstname+" "+this.state.token_lastname]})
                       values["previousIntern"] = this.state.data["previousIntern"]
                        // console.log("values.jobContent",  values.jobDescriptionContent);

                       values.jobDescriptionTitle.forEach((key)=> {
                            if(this.state.data.jobDescriptionContent[key]){
                                this.state.data.jobDescriptionContent[key].push({"username":this.state.token_username ,"content":values[key]})  
                            }
                            else{
                                this.state.data.jobDescriptionContent[key] = [{"username":this.state.token_username,"content":values[key]}]
                            }
                        })
                        values.jobDescriptionContent = this.state.data.jobDescriptionContent

                        let keyJob = Object.keys(values.jobDescriptionContent)
                        console.log("keyJob",keyJob)
                        values.jobDescriptionTitle = keyJob

                        const comment = {"star":values["star"],"content":values["comments"],"username":this.state.token_username}
                        this.state.data.comments.push(comment)
                        values.comments = this.state.data.comments

                    }else if(this.state.status === 0){
                        console.log(values.jobDescriptionContent);
                        values.jobDescriptionContent = {}
                        values.jobDescriptionTitle.forEach((key)=> {
                            values.jobDescriptionContent[key] = [{"username":this.state.token_username,"content":values[key]}]
                        })
                        const comment = {"star":values["star"],"content":values["comments"],"username":this.state.token_username}
                        values.comments = []
                        values.comments.push(comment)
                        this.state.data["previousIntern"] = [{"year":year.toString(),"members":[this.state.token_firstname+" "+this.state.token_lastname]}]
                        values.previousIntern = this.state.data["previousIntern"]
                    }
                }
                this.state.status === 1 || this.state.studentStatus===1? this.API_POST_UPDATE(values): this.API_POST_ADD(values)
                this.POST_UPDATE_FORM(values)
            }
        })

    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        getFieldDecorator('transportation', { initialValue: this.state.data.transportationTitle?this.state.data.transportationTitle:this.state.transSelect});
        getFieldDecorator('jobDescriptionTitle',{ initialValue: this.state.jobSelect })
        const transport = getFieldValue('transportation');
        const jobDesc = getFieldValue('jobDescriptionTitle')

        const tranItems = this.state.transSelect.length > 0? transport.map((k, index) => (
            <Form.Item required={false} key={index}>
                <span className="tag trans-tag">{k}</span>       
            {getFieldDecorator(`${k}`, {
            valuePropName:this.state.readonly,
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
                valuePropName:this.state.readonly,
                // initialValue: this.state.data[k]?this.state.data[k]:"",
                initialValue: this.state.studentStatus === 1?(this.state.data[k]?this.state.data[k]:""):"",
                // initialValue: this.state.studentStatus === 1? 
                // this.state.data.jobDescriptionContent?
                // this.state.data.jobDescriptionContent[k.toLowerCase()].filter((job)=> job.username === this.state.token_username)[0]["content"]
                // :"":"",
                rules: [{
                required: false,
                whitespace: true,
                message: "Please input more information about your work",
              }],
            })(
                <Input className="question event-input" placeholder="Please input more information about your work" />
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
                            // dropdownRender={menu => (
                            // <div>
                            //     {menu}
                            //     <Divider style={{ margin: '4px 0' }} />
                            //     <div onClick={this.addCompany}  style={{ padding: '8px', cursor: 'pointer' }}>
                            //     <Icon type="plus" /> Add Company
                            //     </div>
                            // </div>
                            // )}
                            showSearch
                            value={this.state.studentStatus === 1? this.state.companyName:""}
                            disabled={this.state.studentStatus === 1? true:false}
                            ref="selectCompany"
                            style={{ width: 200 }}
                            placeholder="Select a company"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            onFocus={this.handleFocus}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {this.getOptions()}
                        <Option value="addCompany"><Icon type="plus" /> Add Company</Option>
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
                            {getFieldDecorator('companyName', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'please select company' }],})( <Input className="event-input" style={{width: '50%'}}  placeholder="" disabled={true}/>)}<br/>
                            <span className="input-label">Company Background</span>
                            {getFieldDecorator('companyBackground', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'please input company background' }],})( <TextArea className="event-input" style={{width: '55%'}}  placeholder=""  autosize />)}
                            <br/>

                            <span className="input-label">Logo</span>
                            <input type ="file" name="logo" onChange={(e)=>this.handleFile(e)} />
                            <span>ไฟล์อัพโหลด : <a href={this.state.formField.logo}>{this.state.logoPathName}</a></span>
                            <br/>

                            <span className="input-label">Job Description</span>
                            {getFieldDecorator('jobDescriptionTitle',{valuePropName:this.state.readonly,})(<Select
                                mode="multiple"
                                style={{ width: '30%' }}
                                placeholder=""
                                onChange={this.handleJobDescChange}
                            >
                                {this.getJobDesc()}
                            </Select>)}
                            {jobDescItems}           
                            <span className="input-label">Payment</span>
                            {getFieldDecorator('payment', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'please input payment' }],})( <Input className="event-input" style={{width: '10%'}}  placeholder=""  />)}
                            <br/>
                            <span className="input-label">Transportation Options</span>
                            {getFieldDecorator('transportationTitle',{valuePropName:this.state.readonly,})(<Select
                                mode="tags"
                                style={{ width: '30%' }}
                                placeholder="Bus,BTS,MRT"
                                onChange={this.handleTransportChange}
                            >
                                {this.getTransTag()}
                            </Select>)}
                            {tranItems}
                            <span className="input-label">Activity</span>
                            {getFieldDecorator('activities', {valuePropName:this.state.readonly,rules: [{ required: false, message: 'please input activity' }],})( <TextArea className="event-input" style={{width: '55%'}} placeholder="" autosize/>)}
                            <br/>
                            <span className="input-label">Comments</span>
                            {getFieldDecorator('star', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'please rate your internship experience' }],})( <Rate count={3} />)}
                            {getFieldDecorator('comments', {valuePropName:this.state.readonly,rules: [{ required: true, message: 'please input some comment or feedback' }],})( <TextArea className="event-input" style={{width: '40%'}} placeholder="" autosize/>)}
                            <br/>
                        </Form.Item>
                    </span><br/>
                    {       
                    this.state.token_status === "student"?
                    <Form.Item>
                        <center>
                        <Button htmlType="submit" className="submit-btn">Submit Assignment</Button><br/>
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

export default Form.create({ name: 'form_review' })(Form_Review)