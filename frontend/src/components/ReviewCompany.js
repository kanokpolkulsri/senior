import React from 'react'
import StarRatings from 'react-star-ratings';
import { Collapse, Row, Col } from 'antd';

// var Template = require('./Review.jsx')
import '../css/ReviewCompany.css';
import '../css/Review.css';
import "antd/dist/antd.css";

const Panel = Collapse.Panel;

const rvcpn = [{"_id":"5c6ba5a8e440f7d89bb8619f","companyName":"ExxonMobil Limited","companyBackground":"Exxon Mobil Corporation, doing business as ExxonMobil, is an American multinational oil and gas corporation headquartered in Irving, Texas. It is the largest direct descendant of John D. Rockefeller's Standard Oil Company, and was formed on November 30, 1999 by the merger of Exxon (formerly the Standard Oil Company of New Jersey) and Mobil (formerly the Standard Oil Company of New York). ExxonMobil's primary brands are Exxon, Mobil, Esso, and ExxonMobil Chemical.","jobDescriptionTitle":["Chatbot","Frontend Development","Backend Development","Business Process Improvement","SAP"],"jobDescriptionContent":{"Chatbot":"Chatbot content","Frontend Development":"Frontend Development content","Backend Development":"Backend Development content","Business Process Improvement":"Business Process Improvement content","SAP":"SAP content"},"payment":500,"star":3,"logo":"logo.png","transportationTitle":["bts","mrt","bus"],"transportation":{"bts":"BTS Saladang แล้วเดินผ่านลานจอดรถไปด้านหลังสีลมคอมเพล็กซ์ เดินตรงไปในซอย...","mrt":"MRT Silom จะไกลกว่าเดินจาก BTS เล็กน้อย เปิดกูเกิ้ลแมปเอานะ...","bus":"Bus..."},"activities":"กิจกรรมมีให้ทำเยอะมากๆๆๆ toastmaster อันนี้ช่วยฝึก public speaking ได้ดีมากๆ ให้ออกไปพูดตามหัวข้อข้างหน้าภาษาอังกฤษ UCD101 อันนี้สอนเกี่ยวกับ user centered design bootcamp อันนี้เค้าจะจำลอง startup ในบริษัท ให้เสนอไอเดีย รวมทีมละก็ตีๆๆไอเดียให้มันเวิร์กแล้ว pitch ขอทุนจากบริษัท เหมือนแข่งสตาร์ทอัพเลยย","previousIntern":[{"year":"2018","cpe":["Thanjira Sukkree"],"ske":["Piromsurang Rungserichai"]},{"year":"2017","cpe":["Thanjira Sukkree"],"ske":["Piromsurang Rungserichai"]}],"comments":[{"star":3,"content":"อยู่สีลมเลยมีที่ให้เลือกกินเยอะ ร้านอาหารแถวบอเยอะมากๆ แล้วก็ได้กินฟรีบ่อยมาก มีโอกาสได้รู้จักเพื่อนอินเทิร์นเยอะ เพราะมีกิจกรรมร่วมกันตลอด"},{"star":2,"content":"เพื่อนดี แต่งานชิวเกิน  ถ้าอยากได้ความรู้โปรแกรมมิ่งมากๆอาจจะไม่ชอบ"}]}];

class ReviewCompany extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: `
            A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.
            `,
            company: rvcpn[0]
        }
        
    }
  
    genJobDesc = () => {
        let collapse=[]
        let i = 1;
        for (var k in this.state.company.jobDescriptionContent){
            collapse.push(<Panel header={k} key={i}> 
                <p>{this.state.company.jobDescriptionContent[k]}</p></Panel>)
            i++;
        }
        return collapse
    }
    getJobDesc = () => {
        let jobDesc = this.state.company.jobDescriptionTitle[0];
        for(var i = 1;i < this.state.company.jobDescriptionTitle.length;i++){
            jobDesc += ", "+this.state.company.jobDescriptionTitle[i];
        }
        return jobDesc;
    }
    getTransTagDetail = () =>{
        let transTag = []
        for (var k in this.state.company.transportation){
            transTag.push(<div><span className="tag trans-tag">{k}</span><span className="trans-detail">{this.state.company.transportation[k]}</span></div>)
        }
        return transTag
    }
    getTransTag = () =>{
        let transShortTag = []
        for (var i = 0; i < this.state.company.transportationTitle.length; i++){
            transShortTag.push(<span className="tag trans-tag">{this.state.company.transportationTitle[i]}</span>)
        }
        return transShortTag
    }
    genComment = () =>{
        let comment = []
        for (var i = 0; i < this.state.company.comments.length; i++){
            comment.push( <div className="comment-block col-11">
            <img className="comment-img col-2"></img>
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
                <p>{this.state.company.comments[i].content}</p>
            </div>
            
        </div>)
        }
        return comment
    }
    genPreviousIntern = () =>{
        let intern = []
        for (var i = 0; i<this.state.company.previousIntern.length;i++){
            let internTmp  =this.state.company.previousIntern[i]
            let year = <span className="year">{internTmp.year}</span>
            const cpe = internTmp.cpe.map((option,idx)=>
                <div> <span className="tag cpe-tag">CPE</span><p class="intern-name">{option}</p></div>
            );
            const ske = internTmp.ske.map((option,idx)=>
                <div> <span className="tag ske-tag">SKE</span><p class="intern-name">{option}</p></div>
            );
            intern.push(<div className="previous-intern-year">{year}{cpe}{ske}</div>)
        }
        return intern
    }

    callback = (key) => {
        console.log(key);
    }

    render() {

        return (
            <div className="container">
            {/* {this.props.match.params.company} */}
                <p className="company-name"> {this.state.company.companyName} </p>
                <hr/>
                <Row>
                    
                    <Col span={16}>
                        
                        <p className="topic new-line review-topic">Company Background</p>
                        <p>{this.state.company.companyBackground}</p>
                        <p className="topic new-line">Job Description</p>
                        <Collapse className="job-desc" defaultActiveKey={['1']} onChange={this.callback}>
                            {this.genJobDesc()}
                        </Collapse>

                        <p className="topic new-line review-topic">Payment</p>
                        <p>{this.state.company.payment} Baht</p>
                        <span className="topic transport review-topic">Transportation Options</span>
                        {this.getTransTagDetail()}

                        <br/>

                        <p className="topic new-line review-topic">Activities</p>

                        <span>{this.state.company.activities}</span>
                        <br/>

                        <p className="topic new-line review-topic">Previous CPSK Interns</p>
                        {this.genPreviousIntern()}
                        <br/>


                        <p className="topic new-line review-topic">Comments</p>
                        {this.genComment()}

                    </Col>
                    <Col span={6} offset={2}>
                        <div className="short-desc">
                            <span className="topic new-line">{this.state.company.companyName}</span>
                            <StarRatings
                                rating={3}
                                starRatedColor={"#F7CD1F"}
                                numberOfStars={3}
                                name='rating'
                                isSelectable='false'
                                starDimension="15px"
                                starSpacing="0px"
                                />
                            <img className="company-logo"></img>
                            <span>Job Description: {this.getJobDesc()}</span>
                            <br/>
                            <span>Payment: {this.state.company.payment} Baht </span>
                            <br/>
                            <span>Transportation Options: {this.getTransTag()} </span> 
                            <br/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ReviewCompany