import React from 'react'
import StarRatings from 'react-star-ratings';
import { NavLink } from "react-router-dom";
import { Tag, Row, Col, Select, message, Spin } from 'antd';
import debounce from 'lodash/debounce';


// var Template = require('./Review.jsx')
import '../css/App.css';
import '../css/Review.css';
import "antd/dist/antd.css";
import { API_SEARCH_NAME } from '../api/Review';

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
            currentReview: [],
            allComName:[],
            currentComName:[],
            sortProp:'',
            sortOrder:'',
            data: [],
            value: [],
            fetching: false,
        }
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
  }


  fetchCompany = (value) => {
    console.log('fetching company', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch(`${API_SEARCH_NAME}/${value}`)
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  }

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
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

    
   
    sortCompany = (change,value) => {
        var order = this.state.sortOrder;
        var prop = this.state.sortProp;
        console.log('prop',prop);
        
        if(change === "order")
            order = value;
        else 
            prop = value;
        var tmp;
        // if(prop === 'companyName')
        //     tmp = this.state.allreview.sort((a,b) => order * ((a[prop] > b[prop]) - (b[prop] > a[prop])))
        // else
        //     tmp = this.state.allreview.sort((a,b)=> order * parseInt(a[prop]) - parseInt(b[prop]))
        tmp = this.state.allreview.sort((a,b) => order * a["companyName"].localeCompare(b["companyName"]))
            console.log(this.state.sortProp,this.state.sortOrder,tmp);
        this.setState({currentReview:tmp})
        

    }

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

    handleOrderChange = (value) =>{
        console.log(value);
        this.setState({sortOrder: value})
        this.sortCompany("order",value);
    }
    handlePropChange = (value) =>{
        console.log(value);
        
        this.setState({sortProp: value})
        this.sortCompany("prop",value);
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
                this.setState({allComName:response.data, currentComName:response.data})

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
    API_POST_SEARCH_NAME_COMPANY = (text) => {
        // text = "exxon"
        API_REVIEW.POST_SEARCH_NAME_COMPANY(text)
        .then(response => {
            if(response.code === 1){
                console.log(response.data)
            }
        })
    }
    componentDidMount = () => {
        this.API_GET_DATA()
        this.API_GET_SEARCH_NAME_COMPANY()
        this.API_POST_SEARCH_NAME_COMPANY("exxo")
    }

    render() {
        const { selectedTags } = this.state;
        const { fetching, data, value } = this.state;

        return (
        
            <Row>
                <Col span={6}>
                <div className="col-menu">
                    <span className="menu-header"><i className="fa fa-search"></i>  Search</span>
                    <div className="menu-content">  
                    <Select
                        className="col-11 form-control"
                        mode="multiple"
                        labelInValue
                        value={value}
                        placeholder="Enter any keyword"
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                        filterOption={false}
                        onSearch={this.fetchCompany}
                        onChange={this.handleChange}
                        style={{ width: '100%' }}
                    >
                        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                    </Select></div>
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
                            <Select defaultValue="companyName" className="sort-select sort-name" onChange={this.handlePropChange}> 
                                <Option value="companyName">
                                    Name
                                </Option>
                                <Option value="payment">
                                    Payment
                                </Option>
                                <Option value="star">
                                    Rating
                                </Option>
                            </Select>
                            <Select defaultValue="ascending" className="sort-select sort-asending" onChange={this.handleOrderChange}>
                                <Option value={1}>
                                    Ascending
                                </Option>
                                <Option value={-1}>
                                    Descending
                                </Option>
                            </Select>
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