import React from 'react'
import StarRatings from 'react-star-ratings';
import { NavLink } from "react-router-dom";
import { Tag, Row, Col, Select, message, } from 'antd';


// var Template = require('./Review.jsx')
import '../css/App.css';
import '../css/Review.css';
import "antd/dist/antd.css";

const Option = Select.Option;

const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Bus', 'BTS', 'MRT'];

const review = [{"_id":"5c6ba5a8e440f7d89bb8619f","companyName":"ExxonMobil Limited","jobDescriptionTitle":["Chatbot","Frontend Development","Backend Development","Business Process Improvement","SAP"],"payment":500,"star":3,"logo":"logo.png","transportationTitle":["bts","mrt","bus"]}];

const API_REVIEW = require('../api/Review')

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTags: [],
            allreview: [],
            paymentRange:  ["0-250","250-500","more than 500"],
            currentReview: []
        }
    }
    handlePaymentChange = (value) => {
        console.log(`selected ${value}`);
      }
      

    handleChange = (tag, checked) => {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked
          ? [...selectedTags, tag]
          : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
      }

    onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    genJobDesc = (j) => {
        let jobDesc = this.state.allreview[j].jobDescriptionTitle[0];
        for(var i = 1;i < this.state.allreview[j].jobDescriptionTitle.length;i++){
            jobDesc += ", "+this.state.allreview[j].jobDescriptionTitle[i];
        }
        return jobDesc;
    }
    getTransTag = (j) =>{
        let transShortTag = []
        for (var i = 0; i < this.state.allreview[j].transportationTitle.length; i++){
            transShortTag.push(<span className="tag trans-tag">{this.state.allreview[j].transportationTitle[i]}</span>)
        }
        return transShortTag
    }

    // sortCompany = () => {
    //     if()
    //     var tmp = this.state.allreview.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    // }

    genResult = () => {
        let result = this.state.currentReview.map((option,idx) => 
            <div className="company">
            <Row>
                <Col span={6}> 
                    <div className="company-logo"></div>
                </Col>
                <Col span={18}> 
                    <div className="company-detail">
                    <Col span={20}>
                        <NavLink to={`${this.props.match.url}/5c6ba5a8e440f7d89bb8619f`} component="">{option.companyName}</NavLink>
                        <p> Job description: {this.genJobDesc(idx)} <br/>
                            Payment: {option.payment} Baht <br/>
                            Transportation option: {this.getTransTag(idx)}
                        </p>
                    </Col>
                    <Col span={4}>
                        <div className="star-ratings">  <StarRatings
                            rating={3}
                            starRatedColor={"#F7CD1F"}
                            numberOfStars={3}
                            name='rating'
                            isSelectable='false'
                            starDimension="15px"
                            starSpacing="0px"
                            />
                        </div>
                    </Col>
                
                </div>
                </Col>
          
            </Row>
            </div>
        
            )
            
        return result
    }

    API_GET_DATA = () => {
        API_REVIEW.GET_DATA()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({allreview:response.data, currentReview:response.data})
           
                /*
                data = [
                    {
                        companyName: "ExxonMobil Limited",
                        jobDescriptionTitle: (5) ["Chatbot", "Frontend Development", "Backend Development", "Business Process Improvement", "SAP"],
                        logo: "logo.png",
                        payment: 500,
                        star: 3,
                        transportationTitle: (3) ["bts", "mrt", "bus"],
                        _id: "5c6ba5a8e440f7d89bb8619f"
                    },
                    {
                        companyName: "ExxonMobil Limited",
                        jobDescriptionTitle: (5) ["Chatbot", "Frontend Development", "Backend Development", "Business Process Improvement", "SAP"],
                        logo: "logo.png",
                        payment: 500,
                        star: 3,
                        transportationTitle: (3) ["bts", "mrt", "bus"],
                        _id: "5c6ba5a8e440f7d89bb8619f"
                    }
                ]
                */
            }
        })
    }

    API_GET_SEARCH_NAME_COMPANY = () => {
        API_REVIEW.GET_SEARCH_NAME_COMPANY()
        .then(response => {
            if(response.code === 1){
                console.log(response.data)

                /*
                data = [
                    {
                        companyName: "ExxonMobil Limited",
                        _id: "5c6ba5a8e440f7d89bb8619f"
                    }
                ]
                */
            }
        })
    }

    componentDidMount = () => {
        this.API_GET_DATA()
        this.API_GET_SEARCH_NAME_COMPANY()
    }

    render() {
        const { selectedTags } = this.state;

        return (
        
            <Row>
                <Col span={6}>
                <div className="col-menu">
                    <span className="menu-header"><i className="fa fa-search"></i>  Search</span>
                    <div className="menu-content"><input type="keyword" className="col-11 form-control" id="exampleInputKeyword1" aria-describedby="keywordHelp" placeholder="Enter any keyword"/></div>
                    <span className="menu-header"><i className="material-icons">tune</i>  Filter</span>
                    <div className="menu-content">
                        <span className="filter-topic">Job Description</span>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Frontend Development
                            </label>
                        </div>
                        <span className="filter-topic">Payment Range</span>
                        <Select    
                        placeholder="Select a payment range"
                        style={{ width: 200 }} onChange={this.handlePaymentChange()}>
                            {this.state.paymentRange.map(range => <Option key={range}>{range}</Option>)}

                        </Select>
                        <span className="filter-topic">Transportation options</span>
                        {tagsFromServer.map(tag => (
                        <CheckableTag
                            className="tag-check"
                            key={tag}
                            checked={selectedTags.indexOf(tag) > -1}
                            onChange={checked => this.handleChange(tag, checked)}
                        >
                            {tag}
                        </CheckableTag>
                        ))}
                    </div>
                  

                </div>
                </Col>

                <Col span={18}>
                <div className="container review-container">
                    <Row>
                    <div className="justify-content-end">
                        <Col span={8} offset={16}>
                        <div className="sort">
                            <span>Sort By: </span>
                            <select className="sort-select sort-name"> 
                                <option>
                                    Name
                                </option>
                            </select>
                            <select className="sort-select sort-asending">
                                <option>
                                    Ascending
                                </option>
                            </select>
                        </div>
            
                        </Col>
                        </div>
                        <br/>
                        <Row>
                            {this.genResult()}
                        </Row>
                        
                    </Row>
                
         

                </div>
                </Col>
               
             
            </Row>
            )
    }
}

export default Review