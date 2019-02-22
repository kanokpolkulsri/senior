import React from 'react'
import StarRatings from 'react-star-ratings';
import { NavLink } from "react-router-dom";
import { Tag, Row, Col, Menu, Dropdown, Icon, message, } from 'antd';

// var Template = require('./Review.jsx')
import '../css/Review.css';
import "antd/dist/antd.css";


const CheckableTag = Tag.CheckableTag;
const tagsFromServer = ['Bus', 'BTS', 'MRT'];

const review = [{"_id":"5c6ba5a8e440f7d89bb8619f","companyName":"ExxonMobil Limited","jobDesc`  riptionTitle":["Chatbot","Frontend Development","Backend Development","Business Process Improvement","SAP"],"payment":500,"star":3,"logo":"logo.png","transportationTitle":["bts","mrt","bus"]}];







class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTags: [],
    
        }
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

    menu = () =>{
        const menuList = ["0-250","250-500","more than 500"]
        const menuItem = menuList.map((option,idx)=>
            <Menu.Item key={idx}>{option}</Menu.Item>
        );
        return (<Menu onClick={this.onClick}>{menuItem}</Menu>);
    }
    
    

    render() {
        const { selectedTags } = this.state;

        return (
        
            <Row>
                <Col span={6}>
                <div className="col-search-filter">
                    <span className="search-filter-header"><i className="fa fa-search"></i>  Search</span>
                    <div className="search-filter-content"><input type="keyword" className="col-11 form-control" id="exampleInputKeyword1" aria-describedby="keywordHelp" placeholder="Enter any keyword"/></div>
                    <span className="search-filter-header"><i className="material-icons">tune</i>  Filter</span>
                    <div className="search-filter-content">
                        <span className="filter-topic">Job Description</span>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Frontend Development
                            </label>
                        </div>
                        <span className="filter-topic">Payment Range</span>
                        <Dropdown overlay={this.menu}>
                            <a className="ant-dropdown-link" href="#">
                            Hover me, Click menu item <Icon type="down" />
                            </a>
                        </Dropdown>
                        <span className="filter-topic">Transportation options</span>
                        {tagsFromServer.map(tag => (
                        <CheckableTag
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
                        <div className="company">
                        <div className="company-logo"></div>
                        <Row>
                        <div className="company-detail">
                            <Col span={20}>
                                <NavLink to={`${this.props.match.url}/exxon mobil`} component="">Company Name</NavLink>
                                <p> Job description: <br/>
                                    Payment:    <br/>
                                    Transportation option:
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
                        </Row>
               
                
                        </div>

                        </Row>
                        
                    </Row>
                
         

                </div>
                </Col>
               
             
            </Row>
            )
    }
}

export default Review