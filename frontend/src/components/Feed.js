import React from 'react'
import '../css/Feed.css'
import { Tag,message,Row,Col,Button, Icon } from 'antd'
import Slider from "react-slick"
import moment from 'moment'

import "antd/dist/antd.css"

const API_FEED = require('../api/Feed')
const API_TOKEN = require('../api/Token')
const VariableConfig = require('../api/VariableConfig')
const CheckableTag = Tag.CheckableTag
const tagList = VariableConfig.tagList

class Feed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "Feed",
            selectedTags: [],
            Event: [],
            Announcement: [],
            Company: [],
            eventColor: ["pink","orange","green","blue"],
            token_username: "",
            token_status: ""
        }
    }

    onClick = ({ key }) => {
        message.info(`Click on item ${key}`)
    }

    eventInterest = (e) => {
        console.log(e.target)
        if(this.state.token_status === "student")
            e.target.classList.toggle("clicked")
        e.target.blur()
    }

    eventInterestData = (option) => {
        if(this.state.token_status !== "student"){
            message.error('You have to log in as a student to perform this one',6)
        }else{
            let values = option
            if(values["members"].includes(this.state.token_username)){
                values["members"].splice( values["members"].indexOf(this.state.token_username), 1 )
                values["register"] -= 1
            }else{
                values["members"].push(this.state.token_username)
                values["register"] += 1
            }
            API_FEED.POST_UPDATE_EVENT(values)
            .then(response => {
                if(response.code === 1){
                    this.API_GET_EVENT()
                }
            })
        }
    }

    getAnnouncement = () => {
        const announcement = this.state.Announcement.map((option,idx)=>
            <div>
                <p className="announce-topic content">{option.title}</p>
                <p className="content announce-content">{option.description}</p>
            </div>
        )
        return (announcement)
    }

    calMember = (member) => {
        let classBtn = "event-btn"
        if(this.state.token_status === "student"){
            if(member.length > 0)
                if(member.includes(this.state.token_username)){
                    classBtn += " clicked"
                }
        }
        return classBtn
    }
  
    getEvent = () => {
        const event = this.state.Event.map((option,idx)=>
            <div className={`event-block ${this.state.eventColor[idx%4]}`}>
                <div className="event-color-tab"></div>
                <Row>
                    <Col span={6}>
                        <span className="event-date">{moment(option.date).date()}</span>
                    </Col>
                    <Col span={13} offset={2}>
                        <span className="event-month">{moment(option.date).format('MMMM')}</span>
                        <span className="event-time">{`${moment(option.startTime).format('HH:mm')} - ${moment(option.endTime).format('HH:mm')}`}</span>
                    </Col>
                </Row>
                <span className="event-name">{option.name}</span><br/>
                <span className="event-place">place: {option.location}</span>
                <span className="people-event-interest">{option.register} people interested</span><br/>
                <Button onClick={(e) => {this.eventInterest(e); this.eventInterestData(option)}} className={this.calMember(option.members)}><i className="material-icons"></i> interested </Button><br/>

            </div> 
        )
        return event
    }
    
    genCompany = () =>{
        const company = []
        for(var i = 0; i < this.state.Company.length; i++){
            var checkTag = false
            var cat = this.state.Company[i].category
            var allTag = []
            for(var j = 0; j < cat.length; j++){
                if(this.state.selectedTags.includes(cat[j]))
                    checkTag = true
                allTag.push( <span className="tag job-desc-tag" key={j}>{cat[j]}</span> )
            }
               
            if(checkTag || this.state.selectedTags.length === 0){
                company.push(   
                    <div className="company">
                        <span className="content feed-company-name">{this.state.Company[i].name}</span> 
                        {allTag}
                        <br/>  
                    </div>  
                )
            }
        }
        return company
    }

    handleChange = (tag, checked) => {
        const { selectedTags } = this.state
        const nextSelectedTags = checked
          ? [...selectedTags, tag]
          : selectedTags.filter(t => t !== tag)
        this.setState({ selectedTags: nextSelectedTags })

        this.genCompany()
    }

    API_GET_EVENT = () => {
        API_FEED.GET_EVENT()
        .then(response => {
            if(response.code === 1){
                this.setState({Event : response.data})
                
            }
        })
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let status = response.token_status
            this.setState({token_username: username, token_status: status})
        })
    }

    POST_CHECK_TOKEN_AND_GET_EVENT = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let status = response.token_status
            this.setState({token_username: username, token_status: status})
            this.API_GET_EVENT()
        })
        
    }

    API_GET_ANNOUNCEMENT = () => {
        API_FEED.GET_ANNOUNCEMENT()
        .then(response => {
            if(response.code === 1){
                this.setState({Announcement : response.data})
            }
        })
    }

    API_GET_COMPANY = () => {
        API_FEED.GET_COMPANY()
        .then(response => {
            if(response.code === 1){
                this.setState({Company : response.data})
            }
        })
    }

    componentDidMount = () => {
        this.API_GET_ANNOUNCEMENT()
        this.API_GET_COMPANY()
        this.POST_CHECK_TOKEN_AND_GET_EVENT()
    }

    componentDidUpdate = (prevProps,prevState) => {
        if(this.state.token_status !== prevState.token_status)
            this.POST_CHECK_TOKEN_AND_GET_EVENT()
    }

    render() {
        const { selectedTags } = this.state
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            // slidesPerRow: 4,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          }

        return (
            <div>
                <div className="header-feed">
                    <div className="feed-head-text">
                        <p className="feed-logo"> INTERNSHIP PROGRAM </p>
                        <p className="feed-head-detail">Department of Computer Engineering <br/>
                        Kasetsart University
                        </p>
                    </div>
                 
                </div>
                <div className="feed-content container">
                    <p className="feed-title"><Icon type="star" className="icon-from-antd" /> Upcoming Events</p>
                    {/* <div className="all-event"> */}
                    <Slider {...settings}>
                        {this.getEvent()}
                    </Slider>
                    {/* </div> */}
                    <br/><br/>
                    <p className="feed-title"><Icon type="notification" className="icon-from-antd" /> Announcement</p>
                        {this.getAnnouncement()}
                    <br/>
                    <p className="feed-title"><Icon type="profile" className="icon-from-antd" /> Company Lists</p>
                    <span className="job-desc-text">Job Description:</span> {tagList.map(tag => (
                        <CheckableTag
                            color="#F06050"
                            key={tag}
                            checked={selectedTags.indexOf(tag) > -1}
                            className={"tag-check"}
                            onChange={checked => this.handleChange(tag, checked)}
                        >
                            {tag}
                        </CheckableTag>
                        ))}
                        <br/>
                        <div className="set-of-company">
                            {this.genCompany()}
                        </div>
                </div>
              
            </div>      
        )
    }
}

export default Feed