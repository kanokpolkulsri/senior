import React from 'react'
import '../css/StudentAssignment.css';

const API_STUDENT = require('../api/Assignment_Student')
const API_TOKEN = require('../api/Token')


class StudentAssignment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token_username: "",
            token_firstname: "",
            token_lastname: "",
            token_status: "",
        }
    }

    API_POST_ID = (username, id) => {
        API_STUDENT.POST_ID(username, id)
        .then(response => {
            if(response.code === 1){
                console.log('response studentassi',response.data);
            }
        })
    }

    API_POST_UPDATE = (values) => {
        API_STUDENT.POST_UPDATE(values)
        .then(response => {
            if(response.code === 1){

                
            }
        })
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let firstname = response.token_firstname
            let lastname = response.token_lastname
            let status = response.token_status
            this.setState({token_username: username, token_firstname: firstname, token_lastname: lastname, token_status: status})
            this.API_POST_ID(this.state.token_username,this.props.match.params.idAssignment)


        })   
    }

    componentDidMount = () => {
        this.POST_CHECK_TOKEN()
    }
    componentDidUpdate = (prevProps,prevState) => {
        if(this.state.token_status !== prevState.token_status){
            this.POST_CHECK_TOKEN()
        }
        if(this.props.match.params.idAssignment !== prevProps.match.params.idAssignment){
            this.API_POST_ID(this.state.token_username,this.props.match.params.idAssignment)
        }
    }
    render() {
        return (
            <div></div>
        )
    }
    
}

export default StudentAssignment