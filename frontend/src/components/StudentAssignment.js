import React from 'react'
import '../css/StudentAssignment.css';

const API_STUDENT = require('../api/Assignment_Student')

class StudentAssignment extends React.Component {
    constructor(props) {
        super(props)
    }

    API_POST_STUDENT_YEAR = (year) => {
        API_STUDENT.POST_STUDENT_YEAR(year)
        .then(response => {
            if(response.code === 1){

            }
        })
    }

    API_POST_STUDENT= (username) => {
        API_STUDENT.POST_STUDENT(username)
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

    render() {
        return (
            <div></div>
        )
    }
    
}

export default StudentAssignment