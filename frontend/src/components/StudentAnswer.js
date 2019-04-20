import React from 'react'
import moment from 'moment'

class StudentAnswer extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        return <div>{this.props.match.params.idStudent}</div>
    }
}
export default StudentAnswer;