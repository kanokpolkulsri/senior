import React from 'react'
import moment from 'moment'

import { Upload, Button, Icon, Input , Row, Col} from 'antd'
import '../css/StudentAnswer.css'


const API_STUDENT = require('../api/Assignment_Student')
const API_TOKEN = require('../api/Token')

const { TextArea } = Input



class StudentAnswer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            token_status: "",
            data:[],
        }
    }

    API_POST_ID = (username, id) => {
        API_STUDENT.POST_ID(username, id)
        .then(response => {
            if(response.code === 1){
                console.log('response studentassi',response.data);
                this.setState({data:response.data[0]})
            }
        })
    }

    componentDidMount = () => {
        console.log("didmount");
        this.POST_CHECK_TOKEN()
        this.API_POST_ID(this.props.match.params.idStudent,this.props.match.params.idProcess)

    }
    componentDidUpdate = (prevProps,prevState) => {
        if(this.state.token_status !== prevState.token_status){
            console.log("token_change");
            this.POST_CHECK_TOKEN()
        }
        else if(this.props.match.params.idAssignment !== prevProps.match.params.idAssignment)
            this.API_POST_ID(this.props.match.params.idStudent,this.props.match.params.idAssignment)
    }
    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let status = response.token_status
            this.setState({token_status: status})
        })   
    }

    getFormItem = () => {
        console.log(this.state.data.formData)
        if(this.state.data.formData){
            const formItem = this.state.data.formData.map((element)=>
            <div>
            <span className="input-label">{element.title} : </span>
            {
                     element.option === "short"?  
                     <Input className="question event-input" value={element.data} placeholder={element.title} /> :
                     element.option === "multiple"?
                     <TextArea className="event-input" value={element.data} placeholder={element.title} onBlur={this.handleConfirmBlur}  autosize />:
                    <div>upload</div>
            }
            <br/><br/>
            </div>
            )
          return formItem
        }
        return <div></div>
      }


    render() {
        return(
        <div>
        {
            this.state.data?
            <span className="breadcrumb-admin">Assignment > {this.state.data.assignmentName} </span>: <span></span>
        }
         <div className="container student-answer-container">
        {
            this.state.data !== []?
            <div>
            <span className="">Due {moment(this.state.data.deadline).format('llll')}</span>
            <span className="status">status: {this.state.data.status===0?"not submit":"submitted"}</span>
            <br/><br/>
            <span className="assignment-title bold">{this.state.data.assignmentName}</span>
            <br/><br/>

            <span className="bold description">Description</span>
            <span>{this.state.data.assignmentDescription}</span>
            <br/><br/>
            <Row>
                <Col span={16}>
                        {this.getFormItem()}
                        <br/><br/>
                    
                </Col>
            </Row>
            </div>:
            <div></div>

        }
        </div>
       
        </div>
        )}
}
export default StudentAnswer;