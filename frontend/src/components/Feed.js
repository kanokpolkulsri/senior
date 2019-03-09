import React from 'react'
import '../css/Feed.css';
import { Tag,message } from 'antd';

import "antd/dist/antd.css";


const API = require('../api/Feed')
const CheckableTag = Tag.CheckableTag;

const tagList = ["Application Development","Network","Data Science","IoT","etc."]
/*
const feed = {
    "_id" : ObjectId("5c726ee7e440f7d89bb87217"),
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
                "datascience", 
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
                "datascience", 
                "etc"
            ]
        }, 
        {
            "name" : "บริษัท แม็กซิม อินทริเกรดเต็ด โปรดักส์ (ประเทศไทย) จำกัด",
            "url" : "www.instagram.com/tonplamm",
            "category" : [ 
                "datascience", 
                "etc"
            ]
        }
    ]
}*/

class Feed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "Feed",
            selectedTags: []
            // feed: feed
        }
    }

    addTagClass = (tag) =>{
        console.log(tag)
        // alert(checked)
        // return checked? "tag-check job-desc-checked" : "tag-check";
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

    getAnnouncement = () => {
        const announcement = this.state.feed.Announcement.map((option,idx)=>
            <div>
                <p className="content">{option.title}</p>
                <p className="content">{option.description}</p>
            </div>
        );
        return ({announcement});
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
                    <p className="feed-title">Announcement</p>
                        <p className="announce-topic content">1. แจ้งเตือนการจัดส่งเอกสารสหกิจศึกษา (ภายในวันจันทร์ที่ 14 มกราคม 2562)</p>
                        <p className="content">หลังเสร็จสิ้นสหกิจศึกษา นิสิตจะต้องส่งเอกสารดังต่อไปนี้ (แยกชุดตามจำนวนสถานประกอบการ) <br/>
                        1. ซองบรรจุชุดเอกสารต่างๆ (ที่ได้รับในวันปฐมนิเทศ) พร้อมกรอกข้อมูลให้เรียบร้อย <br/>
                        2. แบบประเมินผลนิสิตจากสถานประกอบการ (ใส่ซองปิดผนึก) <br/>
                        3. แบบประเมินรายงานจากสถานประกอบการ (ใส่ซองปิดผนึก) <br/>
                        4. รูปเล่มรายงานการฝึกสหกิจศึกษา (ภาษาอังกฤษ) <br/>
                        โดยเอกสารทั้งหมดให้จัดส่งที่ ** ห้องธุรการ ภาควิชาฯ ** ที่เดียวเท่านั้น
                        </p>
                    <p className="feed-title">Company Lists</p>
                    Job Description: {tagList.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={selectedTags.indexOf(tag) > -1}
                            className={this.addTagClass(tag)}
                            onChange={checked => this.handleChange(tag, checked)}
                        >
                            {tag}
                        </CheckableTag>
                        ))}
                        <br/>
                        <div class="set-of-company">
                            <span className="content">บริษัท เอ-โฮสต์ จำกัด</span> <span className="tag job-desc-tag">Data Science</span> <br/>
                            <span className="content">บริษัท พรีเมียร์ เอ็ดดูเคชั่น จำกัด</span> <br/>
                            <span className="content">บริษัท อัฟวาแลนท์ จำกัด</span> <br/>
                        </div>
                  
                      
                </div>
              
            </div>      
        )
    }
}

export default Feed