import React from 'react'
import StarRatings from 'react-star-ratings';
import { Collapse, Row, Col, Icon } from 'antd';

// var Template = require('./Review.jsx')
import '../css/ReviewCompany.css';
import '../css/Review.css';
import "antd/dist/antd.css";

const API_REVIEW = require('../api/Review')

const Panel = Collapse.Panel;


class ReviewCompany extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            company:[],
            eventColor: ["pink","orange","green","blue"],
            imgSrc: ["https://bit.ly/2W1bWDr", "https://bit.ly/2UvpsOc", "https://bit.ly/2GAxBgo"],
        }      
    }
  
    genJobDesc = () => {
        let collapse=[]
        let i = 1;
        // console.log( this.state.company.jobDescriptionContent);
        
        if(this.state.company.jobDescriptionTitle){
            for (var k in this.state.company.jobDescriptionContent){
                // console.log("k",k);
                
                collapse.push(<Panel header={k} key={i}> 
                    <p className="review-content">
                    {this.state.company.jobDescriptionContent[k].map((job)=>
                        <p>{job.content}</p>)}
                    </p></Panel>)
                i++;
            }
        }
        return collapse
    }
    getJobDesc = () => {
        let jobDesc = ""
        if(this.state.company.jobDescriptionTitle){
            jobDesc = this.state.company.jobDescriptionTitle[0];
            for(var i = 1;i < this.state.company.jobDescriptionTitle.length;i++){
                jobDesc += ", "+this.state.company.jobDescriptionTitle[i];
            }
        }
    
        return jobDesc;
    }
    getTransTagDetail = () =>{
        let transTag = []
        if(this.state.company.transportation)
            for (var k in this.state.company.transportation){
                transTag.push(<div><span className={`tag trans-tag rvc ${k}`}>{k}</span><span className="trans-detail review-content">{this.state.company.transportation[k]}</span></div>)
            }
        return transTag
    }
    getTransTag = () =>{
        let transShortTag = []
        if(this.state.company.transportationTitle)
            for (var i = 0; i < this.state.company.transportationTitle.length; i++){
                transShortTag.push(<span className={`tag trans-tag rvc ${this.state.company.transportationTitle[i]}`}>{this.state.company.transportationTitle[i]}</span>)
            }
        return transShortTag
    }
    genComment = () =>{
        let comment = []
        if(this.state.company.comments)
            for (var i = 0; i < this.state.company.comments.length; i++){
                comment.push( <div className={`comment-block col-11`}>
                <img className={`comment-img`} alt="commect-img" src={this.state.imgSrc[this.state.company.comments[i].star - 1]}></img>
                <div className="comment-content col-8 ">
                    <StarRatings
                    rating={this.state.company.comments[i].star}
                    starRatedColor={"#F7CD1F"}
                    numberOfStars={3}
                    name='rating'
                    isSelectable='false'
                    starDimension="15px"
                    starSpacing="0px"
                    />
                    <p className="review-content">{this.state.company.comments[i].content}</p>
                </div>
                
            </div>)
            }
        return comment
    }
    genPreviousIntern = () =>{
        let interns = []
        // console.log();
        if(this.state.company.previousIntern)
            for (var i = 0; i<this.state.company.previousIntern.length;i++){
                let internTmp  = this.state.company.previousIntern[i]
                let year = <span className="tag trans-tag year rvc orange">{internTmp.year}</span>
                const intern = internTmp.members.map((option)=>
                    <div><p className="intern-name">{option}</p></div>
                )
                interns.push(<div className="previous-intern-year">{year}{intern}</div>)
            }
        return interns
    }

    callback = (key) => {
        console.log(key);
    }

    API_GET_DATA_ID_COMPANY = () => {
        API_REVIEW.GET_DATA_ID_COMPANY(this.props.match.params.company)
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({company:response.data})
            }
        })
    }

    componentDidMount(){
        this.API_GET_DATA_ID_COMPANY()
    }

    render() {

        return (
            <div className="container">
                <span><span className="back-to-review-button" onClick={()=>{this.props.history.push("/Review")}}> Review</span> > {this.state.company.companyName} </span><br/><br/>
                {
                    this.state.company !== []?
                    <div>
                    <p className="company-name"> {this.state.company.companyName} </p>
                    <hr/>
                    <Row>
                        
                        <Col span={16}>
                            
                            <p className="topic new-line review-topic"><Icon type="bank" className="icon-from-antd" /> Company Background</p>
                            <p>{this.state.company.companyBackground}</p>
                            <br/><p className="topic new-line"><Icon type="read" className="icon-from-antd" /> Job Description</p>
                            <Collapse className="job-desc" defaultActiveKey={['1']} onChange={this.callback}>
                                {this.genJobDesc()}
                            </Collapse>

                            <br/><p className="topic new-line review-topic"><Icon type="wallet" className="icon-from-antd" /> Payment</p>
                            <p>{this.state.company.payment} Baht</p>
                            <br/><p className="topic transport review-topic"><Icon type="compass" className="icon-from-antd" /> Transportation Options</p>
                            {this.getTransTagDetail()}

                            <br/>

                            <br/><p className="topic new-line review-topic"><Icon type="global" className="icon-from-antd" /> Activities</p>
                            <span className="review-content">{this.state.company.activities}</span>

                            <br/><br/><p className="topic new-line review-topic"><Icon type="user" className="icon-from-antd" /> Previous CPSK Interns</p>
                            {this.genPreviousIntern()}

                            <br/><p className="topic new-line review-topic"><Icon type="smile" className="icon-from-antd" /> Comments</p>
                            {this.genComment()}

                        </Col>
                        <Col span={6} offset={2}>
                            <div className="short-desc">
                                <span className="topic new-line">{this.state.company.companyName}</span>
                                <StarRatings
                                    rating={this.state.company.star}
                                    starRatedColor={"#F7CD1F"}
                                    numberOfStars={3}
                                    name='rating'
                                    isSelectable='false'
                                    starDimension="15px"
                                    starSpacing="0px"
                                    />
                                <br/><br/>
                                <img className="rv company-logo" alt="company-logo" src={this.state.company.logo}/>
                                <br/>
                                <span>Job Description: {this.getJobDesc()}</span>
                                <br/>
                                <span>Payment: {this.state.company.payment} Baht </span>
                                <br/>
                                <span>Transportation Options: {this.getTransTag()} </span> 
                                <br/>
                            </div>
                        </Col>
                    </Row></div>:
                    <span></span>
                        
                }
                
            </div>
        )
    }
}

export default ReviewCompany