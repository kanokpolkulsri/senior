import React from 'react'

// var Template = require('./Review.jsx')
import '../css/ReviewCompany.css';

class ReviewCompany extends React.Component {

    render() {
        return (
            <div class="container">
                {this.props.match.params.company}
            </div>
        )
    }
}

export default ReviewCompany