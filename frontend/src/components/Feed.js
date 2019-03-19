import React from 'react'
import '../css/Feed.css';
import { Tag,message,Row,Col,Button } from 'antd';

import "antd/dist/antd.css";

const API_FEED = require('../api/Feed')
const CheckableTag = Tag.CheckableTag;

const tagList = ["application","network","data science","iot","etc"]

const feed = {
    // "_id" : ObjectId("5c726ee7e440f7d89bb87217"),
    "Event" : [ 
        {
            "name" : "Getting to know more about Wongnai",
            "location" : "E203",
            "date" : "04/Feb/2019",
            "register" : 20
        }, 
        {
            "name" : "CPSK Job Fair",
            "location" : "1st floor",
            "date" : "04/Feb/2019",
            "register" : 178
        }
    ],
    "Announcement" : [ 
        {
            "title" : "1. แจ้งเตือนการจัดส่งเอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)",
            "description" : "หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)\n1. ซองบรรจุชุดเอกสารต่างๆ (ที่ได้รับในวันปฐมนิเทศ) พร้อมกรอกข้อมูลให้เรียบร้อย\n2. แบบประเมินผลนิสิตจากสถานประกอบการ (ใส่ซองปิดผนึก)\n3. แบบประเมินรายงานจากสถานประกอบการ (ใส่ซองปิดผนึก)\n4. รูปเล่มรายงานการฝึกสหกิจศึกษา (ภาษาอังกฤษ)\nโดยเอกสารทั้งหมดให้จัดส่งที่ ** ห้องธุรการ ภาควิชาฯ ** ที่เดียวเท่านั้น"
        },
        {
            "title" : "2. เอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)",
            "description" : "หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)"
        }
    ],
    "Company" : [ 
        {
            "name" : "บริษัท เอ-โอสต์ จำกัด",
            "url" : "kanokpolkulsri.netlify.com",
            "category" : [ 
                "application", 
                "network", 
                "data science", 
                "consulting", 
                "iot", 
                "etc"
            ]
        }, 
        {
            "name" : "บริษัท พรีเมียร์ เอ็ดดูเคชั่น จำกัด",
            "url" : "www.facebook.com/ton2plam",
            "category" : [ 
                "application", 
                "consulting", 
                "iot", 
                "etc"
            ]
        }, 
        {
            "name" : "บริษัท อัฟวาแลนท์ จำกัด",
            "url" : "github.com/ton2plam",
            "category" : [ 
                "network", 
                "data science", 
                "etc"
            ]
        }, 
        {
            "name" : "บริษัท แม็กซิม อินทริเกรดเต็ด โปรดักส์ (ประเทศไทย) จำกัด",
            "url" : "www.instagram.com/tonplamm",
            "category" : [ 
                "data science", 
                "etc"
            ]
        }
    ]
}

class Feed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "Feed",
            selectedTags: [],
            feed: feed,
            eventColor: ["pink","orange","green","blue"],
            interest: "  interested"
        }
    }

    onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    eventInterest = (e) => {
        console.log(e.target)
        e.target.classList.toggle("clicked")
        e.target.blur();
        var icon = '<i className="material-icons">star_border</i>'
        if(e.target.classList.contains("clicked"))
            var icon = '<i className="material-icons">check</i>'
        e.target.innerHTML = icon+"<span>"+this.state.interest+"</span>"
    }

    getAnnouncement = () => {
        const announcement = this.state.feed.Announcement.map((option,idx)=>
            <div>
                <p className="announce-topic content">{option.title}</p>
                <p className="content announce-content">{option.description}</p>
            </div>
        );
        return (announcement);
    }
    getEvent = () => {
        const event = this.state.feed.Event.map((option,idx)=>
            <div className={`event-block ${this.state.eventColor[idx%4]}`}>
                <div className="event-color-tab"></div>
                <Row>
                    <Col span={4}>
                        <span className="event-date">4</span>
                    </Col>
                    <Col span={19} offset={1}>
                        <span className="event-month">February</span>
                        <span className="event-time">13:00-16:00</span>
                    </Col>
                </Row>
                <span className="event-name">{option.name}</span><br/>
                <span className="event-place">place: {option.location}</span>
                <span className="people-event-interest">{option.register} people interested</span><br/>
                <Button onClick={this.eventInterest} className="event-btn"><i className="material-icons">star_border</i> { this.state.interest }</Button><br/>
            </div> 
        );
        return event;
    }
    genCompany = () =>{
        const company = [];
        for(var i = 0; i < this.state.feed.Company.length; i++){
            var checkTag = false;
            var cat = this.state.feed.Company[i].category;
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
                    <span className="content feed-company-name">{this.state.feed.Company[i].name}</span> 
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

    componentDidMount = () => {
        API_FEED.GET_EVENT()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                // request successfully

                // response.data

                /* 
                data = [
                    {
                        date: "2019-02-02T16:00:00.000Z"
                        location: "1st floor"
                        name: "CPSK Job Fair"
                        register: 178
                        _id: "5c852a4fa7cd113ae7508727"
                    },
                    {
                        date: "2019-02-02T16:00:00.000Z"
                        location: "1st floor"
                        name: "CPSK Job Fair"
                        register: 178
                        _id: "5c852a4fa7cd113ae7508727"
                    }
                ]
                */
            }
        })
        API_FEED.GET_ANNOUCEMENT()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully

                //response.data

                /*
                data = [
                    {
                        description: "หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)↵1. ซองบรรจุชุดเอกสารต่างๆ (ที่ได้รับในวันปฐมนิเทศ) พร้อมกรอกข้อมูลให้เรียบร้อย↵2. แบบประเมินผลนิสิตจากสถานประกอบการ (ใส่ซองปิดผนึก)↵3. แบบประเมินรายงานจากสถานประกอบการ (ใส่ซองปิดผนึก)↵4. รูปเล่มรายงานการฝึกสหกิจศึกษา (ภาษาอังกฤษ)↵โดยเอกสารทั้งหมดให้จัดส่งที่ ** ห้องธุรการ ภาควิชาฯ ** ที่เดียวเท่านั้น",
                        title: "1. แจ้งเตือนการจัดส่งเอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)",
                        _id: "5c852a6aa7cd113ae7508736"
                    },
                    {
                        description: "หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ)↵1. ซองบรรจุชุดเอกสารต่างๆ (ที่ได้รับในวันปฐมนิเทศ) พร้อมกรอกข้อมูลให้เรียบร้อย↵2. แบบประเมินผลนิสิตจากสถานประกอบการ (ใส่ซองปิดผนึก)↵3. แบบประเมินรายงานจากสถานประกอบการ (ใส่ซองปิดผนึก)↵4. รูปเล่มรายงานการฝึกสหกิจศึกษา (ภาษาอังกฤษ)↵โดยเอกสารทั้งหมดให้จัดส่งที่ ** ห้องธุรการ ภาควิชาฯ ** ที่เดียวเท่านั้น",
                        title: "1. แจ้งเตือนการจัดส่งเอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)",
                        _id: "5c852a6aa7cd113ae7508736"
                    }
                ]
                */
            }
        })
        API_FEED.GET_COMPANY()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully

                //response.data

                /*
                data = [
                    {
                        category: (6) ["application", "network", "datascience", "consulting", "iot", "etc"],
                        name: "บริษัท เอ-โอสต์ จำกัด",
                        url: "kanokpolkulsri.netlify.com",
                        _id: "5c852a90a7cd113ae7508746"
                    },
                    {
                        category: (2) ["datascience", "etc"],
                        name: "บริษัท แม็กซิม อินทริเกรดเต็ด โปรดักส์ (ประเทศไทย) จำกัด",
                        url: "www.instagram.com/tonplamm",
                        _id: "5c852aaba7cd113ae7508751"
                    }
                ]
                */
            }
        })
    }


    render() {
        const { selectedTags } = this.state;

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
                    <div className="all-event">
                      {this.getEvent()}
                    </div>
                    <p className="feed-title">Announcement</p>
                        {this.getAnnouncement()}
                     
                    <p className="feed-title">Company Lists</p>
                    Job Description: {tagList.map(tag => (
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