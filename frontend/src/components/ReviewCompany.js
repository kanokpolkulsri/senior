import React from 'react'
import StarRatings from 'react-star-ratings';
import { Collapse, Row, Col } from 'antd';

// var Template = require('./Review.jsx')
import '../css/ReviewCompany.css';
import '../css/Review.css';
import "antd/dist/antd.css";

const Panel = Collapse.Panel;


class ReviewCompany extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: `
            A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.
            `,
        }
        
    }
  
    callback = (key) => {
        console.log(key);
    }

    render() {

        return (
        
            <div class="container">
                <p> {this.props.match.params.company} </p>
                <hr/>
                <Row>
                    
                    <Col span={18}>
                        
                        <span class="topic new-line review-topic">Company Background</span>
                        <br/>
                        <span></span>
                        <span class="topic new-line">Job Description</span>
                        <Col span={22}>
                            <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                                <Panel header="This is panel header 1" key="1">
                                <p>{this.state.text}</p>
                                </Panel>
                                <Panel header="This is panel header 2" key="2">
                                <p>{this.state.text}</p>
                                </Panel>
                            </Collapse>
                        </Col>
                       
            

                        <span class="topic new-line review-topic">Payment</span>
                        <br/>

                        <span></span>
                        <span class="topic review-topic">Transportation Options</span>
                        <span class="tag trans-tag">Bus</span>
                        <span class="tag trans-tag">BTS</span>
                        <span class="tag trans-tag">MRT</span>
                        <br/>

                        <span></span>
                        <span class="topic new-line review-topic">Activities</span>
                        <br/>

                        <span></span>
                        <span class="topic new-line review-topic">Previous CPSK Interns</span>
                        <span class="tag cpe-tag">CPE</span>
                        <span class="tag ske-tag">SKE</span>
                        <br/>


                        <span class="topic new-line review-topic">Comments</span>
                        <div class="comment-block col-11">
                            <img class="comment-img col-2"></img>
                            <div class="comment-content col-8 ">
                                <StarRatings
                                rating={3}
                                starRatedColor={"#F7CD1F"}
                                numberOfStars={3}
                                name='rating'
                                isSelectable='false'
                                starDimension="15px"
                                starSpacing="0px"
                                />
                                <span></span>
                            </div>
                            
                        </div>

                    </Col>
                    <Col span={6}>
                        <div class="short-desc">
                            <span class="topic new-line">Company Name</span>
                            <StarRatings
                                rating={3}
                                starRatedColor={"#F7CD1F"}
                                numberOfStars={3}
                                name='rating'
                                isSelectable='false'
                                starDimension="15px"
                                starSpacing="0px"
                                />
                            <img class="company-logo"></img>
                            <span>Job Description: </span>
                            <br/>
                            <span>Payment: </span>
                            <br/>
                            <span>Transportation Options: </span> 
                            <br/>
                        </div>
                    </Col>
                </Row>
               
            </div>
            )
    }
}

export default ReviewCompany