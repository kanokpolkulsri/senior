import React from 'react'
import '../css/Feed.css';
import { Tag,message,Row,Col,Button } from 'antd';
import Slider from "react-slick";

import "antd/dist/antd.css";

const API_FEED = require('../api/Feed')
const VariableConfig = require('../api/VariableConfig')
const CheckableTag = Tag.CheckableTag;
const tagList = VariableConfig.tagList;


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
            interest: "  interested",
        }
    }

    onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    eventInterest = (e) => {
        console.log(e.target)
        e.target.classList.toggle("clicked")
        e.target.blur();
        
        // var icon = '<i className="material-icons">star_border</i>'
        // if(e.target.classList.contains("clicked"))
        //     var icon = "<i className='material-icons'>check</i>"
        // e.target.innerHTML = icon+"<span>"+this.state.interest+"</span>"
    }

    getAnnouncement = () => {
        const announcement = this.state.Announcement.map((option,idx)=>
            <div>
                <p className="announce-topic content">{option.title}</p>
                <p className="content announce-content">{option.description}</p>
            </div>
        );
        return (announcement);
    }
    getEvent = () => {
        const event = this.state.Event.map((option,idx)=>
            <div className={`event-block ${this.state.eventColor[idx%4]}`}>
                <div className="event-color-tab"></div>
                <Row>
                    <Col span={4}>
                        <span className="event-date">4</span>
                    </Col>
                    <Col span={15} offset={1}>
                        <span className="event-month">February</span>
                        <span className="event-time">13:00-16:00</span>
                    </Col>
                </Row>
                <span className="event-name">{option.name}</span><br/>
                <span className="event-place">place: {option.location}</span>
                <span className="people-event-interest">{option.register} people interested</span><br/>
                <Button onClick={this.eventInterest} className="event-btn"><i className="material-icons"></i> { this.state.interest }</Button><br/>
            </div> 
        );
        return event;
    }
    genCompany = () =>{
        const company = [];
        for(var i = 0; i < this.state.Company.length; i++){
            var checkTag = false;
            var cat = this.state.Company[i].category;
            var allTag = [];
            for(var j = 0; j < cat.length; j++){
                if(this.state.selectedTags.includes(cat[j]))
                    checkTag = true;
                allTag.push( <span className="tag job-desc-tag" key={j}>{cat[j]}</span> )
            }
               
            if(checkTag || this.state.selectedTags.length === 0){
                console.log("check")
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
        const { selectedTags } = this.state;
        const nextSelectedTags = checked
          ? [...selectedTags, tag]
          : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });

        this.genCompany();
    }

    API_GET_EVENT = () => {
        API_FEED.GET_EVENT()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({Event : response.data})
                // request successfully
                // response.data
            }
        })
    }

    API_GET_ANNOUNCEMENT = () => {
        API_FEED.GET_ANNOUNCEMENT()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({Announcement : response.data})
                //request successfully
                //response.data
            }
        })
    }

    API_GET_COMPANY = () => {
        API_FEED.GET_COMPANY()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                this.setState({Company : response.data})
                //request successfully
                //response.data
            }
        })
    }

    componentDidMount = () => {
        this.API_GET_EVENT()
        this.API_GET_ANNOUNCEMENT()
        this.API_GET_COMPANY()
    }


    render() {
        const { selectedTags } = this.state;
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
          };

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
                    <p className="feed-title">Upcoming Events</p>
                    {/* <div className="all-event"> */}
                    <Slider {...settings}>
                        {this.getEvent()}
                    </Slider>
                    {/* </div> */}
                    <p className="feed-title">Announcement</p>
                        {this.getAnnouncement()}
                     
                    <p className="feed-title">Company Lists</p>
                    {/* {console.log("variaable",tagList)} */}
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