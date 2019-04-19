import React from 'react'
import '../css/StudentAssignment.css';

const API_STUDENT = require('../api/Assignment_Student')

class StudentAssignment extends React.Component {
    constructor(props) {
        super(props)
    }

    API_POST_ID = (username, id) => {
        API_STUDENT.POST_STUDENT(username, id)
        .then(response => {
            if(response.code === 1){
                
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

    componentDidMount = () => {

    }
    componentDidUpdate = (prevProps) => {
        // if(this.props.idAssignment === prevProps.idAssignment){
        //     this.A
        // }
    }
    render() {
        return (
            <div></div>
        )
    }
    
}

export default StudentAssignment