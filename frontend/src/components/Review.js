import React from 'react'
import StarRatings from 'react-star-ratings'
import { NavLink } from "react-router-dom"
import { Tag, Row, Col, Select, message, Checkbox, Button } from 'antd'
import debounce from 'lodash/debounce'

import '../css/App.css'
import '../css/Review.css'
import "antd/dist/antd.css"

const VariableConfig = require('../api/VariableConfig')
const API_REVIEW = require('../api/Review')
const Option = Select.Option
const CheckableTag = Tag.CheckableTag
const transTag = VariableConfig.transTag
const tagList = VariableConfig.tagList
const paymentRange =  VariableConfig.paymentRange

let timeout
let currentValue

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTags: [],
            allreview: [],
            currentReview: [],
            sortProp:'name',
            sortOrder:1,
            data: [],
            searchValue: undefined,
            paymentValue: undefined,
            jobDescValue: undefined,
            transValue: undefined,
            indeterminate: true,
            checkAll: false,

           
        }
        this.lastFetchId = 0
        this.fetchCompany = debounce(this.fetchCompany, 800)
  }
 

  fetchCompany = (value) => {
    console.log('fetching company', value)
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })

    API_REVIEW.POST_SEARCH_NAME_COMPANY(value)
    .then(response => {
        if(response.code === 1){
            console.log(response.data)
        }
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return
        }
        const data = response.data.map(company => (
            {
                text: `${company.companyName}`,
                value: `${company.companyName}`,
            }
        ))
        this.setState({ data, fetching: false })
    })
  }
    fetchData = (value, callback) => {
        console.log('fetchhh')
        
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        currentValue = value
    
        function fake() {
        //   const str = querystring.encode({
        //     code: 'utf-8',
        //     q: value,
        //   })
          API_REVIEW.POST_SEARCH_NAME_COMPANY(value)
          .then(response => {
              console.log('responsee',response)
              
              if (currentValue === value) {
                const result = response.data
                const data = []
                result.forEach((r) => {
                  data.push({
                    value: r.companyName,
                    text: r.companyName,
                  })
                })
                callback(data)
              }
            })
        }
      
        timeout = setTimeout(fake, 300)
      }


      //sort search filter
      searchFilter = () => {
        let tmp = this.state.allreview
        if(this.state.searchValue !== undefined){
            tmp = tmp.filter(element => element.companyName === this.state.searchValue)
        }


        if(this.state.jobDescValue !== undefined){
            var jobDesc = this.state.jobDescValue
            tmp = tmp.filter(function(array_el){
                return jobDesc.filter(function(job){
                    console.log(job)
                    
                   return array_el.jobDescriptionTitle.includes(job.toLowerCase())
                }).length === jobDesc.length
            })
        }
        
        var lowRange
        var highRange
        if(this.state.paymentValue !== undefined){
            if(this.state.paymentValue === "All"){
                tmp = tmp.filter(element => element.payment)
            }else if(this.state.paymentValue !== "more than 1000"){
                console.log("less thn")
                lowRange = parseInt(this.state.paymentValue.split('-')[0])
                highRange = parseInt(this.state.paymentValue.split('-')[1])
                tmp = tmp.filter(element => (element.payment >= lowRange && element.payment <= highRange))
            }else{
                console.log("more than")
                tmp = tmp.filter(element => element.payment >= 1001)
            }
        }
       


//        tmp = tmp.filter(element => this.state.jobDescValue.includes(element.jobDesc))
        if(this.state.selectedTags.length !== 0){
            var selectedTags = this.state.selectedTags
            tmp = tmp.filter(function(array_el){
                return selectedTags.filter(function(tag){
                    console.log(tag)
                    
                   return array_el.transportationTitle.includes(tag.toLowerCase())
                }).length === selectedTags.length
            })
        }
        
        console.log(tmp)

        if(this.state.currentReview !== tmp)
            this.setState({currentReview :tmp})
      }

      clearSearch = () => {
        this.setState({ searchValue : undefined },() => {this.searchFilter()})
      }
      clearFilter = () => {
        this.setState({
            jobDescValue: [],
            indeterminate: false,
            checkAll: false,
            paymentValue:"All",selectedTags:[]},() => {this.searchFilter()})
      }
  
    onJobDescChange = (value) => {
        this.setState({
            jobDescValue:value,
            indeterminate: true,
            },() => {this.searchFilter()})
        
    }

    handleSearch = (value) => {
        this.fetchData(value, data => this.setState({ data }))
    }

    
    handleSearchChange = (value) => {
        this.setState({ searchValue : value },() => {this.searchFilter()})
    }

    handlePaymentChange = (value) => {
        console.log("selected" ,value)
        this.setState({ paymentValue : value },() => {this.searchFilter()})

    }

    handleChange = (tag, checked) => {
        const { selectedTags } = this.state
        const nextSelectedTags = checked
          ? [...selectedTags, tag]
          : selectedTags.filter(t => t !== tag)
        console.log('You are interested in: ', nextSelectedTags)
        this.setState({ selectedTags: nextSelectedTags },()=>{this.searchFilter()})

    }

    onClick = ({ key }) => {
        message.info(`Click on item ${key}`)
    }

    genJobDesc = (j) => {
        let jobDesc = this.state.currentReview[j].jobDescriptionTitle[0]
        for(let i = 1; i < this.state.currentReview[j].jobDescriptionTitle.length; i++){
            jobDesc += ", "+this.state.currentReview[j].jobDescriptionTitle[i]
        }
        return jobDesc
    }
    getTransTag = (j) =>{
        let transShortTag = []
        for (let i = 0; i < this.state.currentReview[j].transportationTitle.length; i++){
            transShortTag.push(<span className={`tag trans-tag rv ${this.state.currentReview[j].transportationTitle[i]}`}>{this.state.currentReview[j].transportationTitle[i]}</span>)
        }
        return transShortTag
    }

    sortCompany = (change,value) => {
        var order = this.state.sortOrder
        var prop = this.state.sortProp
        
        if(change === "order")
            order = value
        else 
            prop = value
        console.log('prop',prop)

        var tmp
        if(prop === 'companyName')
            tmp = this.state.currentReview.sort((a,b) => order * a["companyName"].localeCompare(b["companyName"]))
        else
            tmp = this.state.currentReview.sort((a,b)=> order * (parseInt(a[prop]) - parseInt(b[prop])))
            // tmp = this.state.allreview.sort((a,b) => order * a["companyName"].localeCompare(b["companyName"]))
            console.log(this.state.sortProp,this.state.sortOrder,tmp)
        this.setState({currentReview:tmp})
    }

    genResult = () => {
        let result = this.state.currentReview.map((option,idx) => 
            <div className="rv company">
            <Row>
                <Col span={6}> 
                    <img src={option.logo} alt={option.logo} className="rv company-logo" href="#"/>
                </Col>
                <Col span={18}> 
                    <div className="company-detail">
                    <Col span={20}>
                        <NavLink to={`${this.props.match.url}/${option._id}`} component="">{option.companyName}</NavLink>
                        <p> Job description: {this.genJobDesc(idx)} <br/>
                            Payment: {option.payment} Baht <br/>
                            Transportation option: {this.getTransTag(idx)}
                        </p>
                    </Col>
                    <Col span={4}>
                        <div className="star-ratings">  <StarRatings
                            rating={option.star}
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
        console.log(value)
        this.setState({sortOrder: value})
        this.sortCompany("order",value)
    }
    handlePropChange = (value) =>{
        console.log(value)
        
        this.setState({sortProp: value})
        this.sortCompany("prop",value)
    }

    getJobDescChoice = () => {
        const choice = tagList.map((option) => 
        <Col span={24}><Checkbox value={option}>{option}</Checkbox></Col>
        )
        return choice
    }

    API_GET_DATA = () => {
        API_REVIEW.GET_DATA()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({allreview:response.data,currentReview:response.data})
                this.sortCompany("prop","companyName")
            }
        })
    }
    componentDidMount = () => {
        this.API_GET_DATA()
    }

    render() {
        const { selectedTags } = this.state
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)
        return (
            <div>
            <div className="cut-more-than-861">
            <Row>
                <Col span={6}>
                <div className="col-menu"> 
                    <span className="menu-header"><span><i className="fa fa-search"></i>  Search</span>
                    <Button className="menu-clear" onClick={ this.clearSearch }>Clear</Button>
                    </span>
                    <div className="menu-content">  
                    <Select
                            showSearch
                            className="input-search"
                            value={this.state.searchValue}
                            placeholder="Enter Company Name"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearch}
                            onChange={this.handleSearchChange}
                            notFoundContent={null}
                        >
                        {options}
                    </Select>
                    </div>
                    <span className="menu-header"><span><i className="material-icons">tune</i>  Filter </span>
                    <Button className="menu-clear" onClick={ this.clearFilter }>Clear</Button>
                    </span>
                    <div className="menu-content">
                        <span className="filter-topic">Job Description</span>
                        <div className="form-check">
                        <Checkbox.Group style={{ width: '100%' }} value={this.state.jobDescValue}  onChange={this.onJobDescChange}>
                            <Row>    
                                {this.getJobDescChoice()}                    
                            </Row>
                        </Checkbox.Group>
                        </div>
                        <span className="filter-topic">Payment Range</span>
                        <Select    
                            placeholder="Select a payment range"
                            style={{ width: 200 }} 
                            onChange={this.handlePaymentChange}>
                            {paymentRange.map(range => <Option key={range}>{range}</Option>)}
                        </Select>
                        <span className="filter-topic">Transportation options</span>
                        {transTag.map(tag => (
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
                            <Select defaultValue={1} className="sort-select sort-asending" onChange={this.handleOrderChange}>
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
            </div>
            
            <div className="cut-less-than-861">
            <Row>
                <div className="col-menu"> 
                    <span className="menu-header"><span><i className="fa fa-search"></i>  Search</span>
                    <Button className="menu-clear" onClick={ this.clearSearch }>Clear</Button>
                    </span>
                    <div className="menu-content">  
                    <Select
                            showSearch
                            className="input-search"
                            value={this.state.searchValue}
                            placeholder="Enter Company Name"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearch}
                            onChange={this.handleSearchChange}
                            notFoundContent={null}
                        >
                        {options}
                    </Select>
                    </div>
                    <span className="menu-header"><span><i className="material-icons">tune</i>  Filter </span>
                    <Button className="menu-clear" onClick={ this.clearFilter }>Clear</Button>
                    </span>
                    <div className="menu-content">
                        <span className="filter-topic">Job Description</span>
                        <div className="form-check">
                        <Checkbox.Group style={{ width: '100%' }} value={this.state.jobDescValue}  onChange={this.onJobDescChange}>
                            <Row>    
                                {this.getJobDescChoice()}                    
                            </Row>
                        </Checkbox.Group>
                        </div>
                        <span className="filter-topic">Payment Range</span>
                        <Select    
                            placeholder="Select a payment range"
                            style={{ width: 200 }} 
                            onChange={this.handlePaymentChange}>
                            {paymentRange.map(range => <Option key={range}>{range}</Option>)}
                        </Select>
                        <span className="filter-topic">Transportation options</span>
                        {transTag.map(tag => (
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
                            <Select defaultValue={1} className="sort-select sort-asending" onChange={this.handleOrderChange}>
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
            </Row>
            </div>
            </div>
            )
    }
}

export default Review