import React from 'react'
import {Row, Col, Select,Form , Input, Button, DatePicker,
    TimePicker,Checkbox,Upload, Icon, message  } from 'antd';
import {  Route, Switch, Link, Redirect} from 'react-router-dom'
import moment from 'moment'

import '../css/Admin.css'

const API_ADMIN = require('../api/Assignment_Admin')
const { TextArea } = Input
const format = 'HH:mm'
const Option = Select.Option


class EditProcessForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            loading: false,
            data: [{assignmentName:""}],
            id:1
        }
    }

    


    API_POST_DELETE_ID_PROCESS = (id) => {
        API_ADMIN.POST_DELETE(id)
        .then(response => {
            if(response.code === 1){
                console.log(response)
            }
        })
    }

    API_POST_ID_PROCESS = (id) => {
        API_ADMIN.POST_ID_PROCESS(id)
        .then(response => {
            if(response.code === 1){
                console.log('response',response.data);
                this.setState({data:response.data[0]})
            }
        })
    }

    API_POST_UPDATE = (values) => {
        /*
            values = {
                "id": "20190416114450",
                "assignmentName": "add assignment 58",
                "assignmentDescription": "eiei",
                "status": 0,
                "statusDescription": "missing",
                "submitDate": "",
                "deadline": "2018-04-16T04:44:48.347Z",
                "defaultForm": 0,
                "requireIdSubmit": [],
                "requireIdSubmitData": [],
                "formData": [
                    {
                        "title": "a",
                        "option": "short",
                        "data": ""
                    },
                    {
                        "title": "b",
                        "option": "multiple",
                        "data": ""
                    }
                ],
                "year": 58
            }
        */
       API_ADMIN.POST_UPDATE(values)
       .then(response => {
            console.log(response)

           if(response.code === 1){
           }
       })
    }

    componentDidMount = () => {
        let id = this.props.match.params.idProcess /* id of each process */
        this.API_POST_ID_PROCESS(id)
    }

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
          return;
        }
    
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
      }
    
      add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat({title:"",option:"short",data:""})
        form.setFieldsValue({
          keys: nextKeys,
        });
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { keys, title , option,assignmentDescription, assignmentName,deadline,timeDeadline } = values;
            const tmp = keys.map((key,idx) => ({"title":title[idx],"option":option[idx],"data":""}))
            let params = this.state.data
            delete params["_id"]
            params["assignmentName"] = assignmentName
            params["assignmentDescription"] = assignmentDescription
            params["deadline"] = deadline.set({'hour':timeDeadline.hour(),'minute':timeDeadline.minute()})
            params["formData"] = tmp
            console.log(params)
            this.API_POST_UPDATE(params)
          }
        });
      }
    
  
    
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: this.state.data.formData});
        const keys = getFieldValue('keys');
        
        const formItems = this.state.data.formData? keys.map((k, index) => (
        <div>

            <Form.Item required={false} key={index}>
            <span className="input-label">Question {index+1}: </span>
            {getFieldDecorator(`title[${index}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: k.title,
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input question or delete this field.",
              }],
            })(
                <Input className="question event-input" placeholder="Question" />
            )}
            
          </Form.Item>
         <Form.Item style={{display:'inline-block'}}>
            <span className="input-label">Answer Type: </span>
            {getFieldDecorator(`option[${index}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: k.option,
              rules: [{
                required: true,
                message: "Please select question type or delete this field.",
              }],
            })(
                <Select style={{ width: 200 }}>
                    <Option value="short">Short Answer</Option>
                    <Option value="multiple">Multiple Line</Option>
                    <Option value="upload">File Upload</Option>
                </Select>            )}
                    
        </Form.Item>
          {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
        </div>
      
        )):<div></div>
        return (
            <div>  
                <span className="breadcrumb-admin">Process > <Link style={{ textDecoration: 'none', color: 'rgb(0,0,0,0.65)',padding:'0px 3px' }} to="/admin/process/assignment"> Assignment </Link> > {this.state.data.assignmentName}</span><br/>
                <Row>
                <Col span={16}> 
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <span className="input-label">Assignment Name: </span>
                        {getFieldDecorator('assignmentName', {
                            initialValue:this.state.data.assignmentName,
                            rules: [{ required: true, message: 'Please input answer!' }]
                        })(
                        <Input className="assignment-name" placeholder="Assignment Name" onBlur={this.handleConfirmBlur}  />
                        )}
                    </Form.Item> 
                    <Form.Item>                        
                        <span className="input-label">Assignment Description: </span>
                        {getFieldDecorator('assignmentDescription', {
                            initialValue:this.state.data.assignmentDescription,
                            rules: [{ required: true, message: 'Please input answer!' }]
                        })(
                        <TextArea className="assignment-desc" placeholder="Description" onBlur={this.handleConfirmBlur} autosize />
                        )}
                    </Form.Item><br/>
                    <Form.Item style={{display:"inline-block"}}>                        
                        <span className="input-label">Assignment Deadline: </span>
                        {getFieldDecorator('deadline', {
                            initialValue:moment(this.state.data.deadline),
                            rules: [{ required: true, message: 'Please input deadline!' }]
                        })(
                            <DatePicker className="event-date" onChange={this.onChange} />
                            )}
                    </Form.Item>
                    <Form.Item style={{display:"inline-block"}}>
                         <span className="input-label">Time: </span>
                        {getFieldDecorator('timeDeadline', {
                            initialValue:moment(this.state.data.deadline),
                            rules: [{ required: true, message: 'Please input deadline time!' }]
                        })(
                            <TimePicker format={format}  onChange={this.onStartDateChange}/>
                        )}
                    </Form.Item><br/><br/>
                     
                        {
                            formItems
                        }
                        <Form.Item>
                            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>Add question</Button>
                        </Form.Item><br/>
                        <Form.Item>
                            <Button htmlType="submit">Save an update</Button>
                            <Button onClick={() => this.API_POST_DELETE_ID_PROCESS(this.props.match.params.idProcess)}>Delete</Button>
                        </Form.Item>
                   </Form>

                </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create({ name: 'edit_process' })(EditProcessForm)
