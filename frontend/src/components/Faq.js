import React from 'react'
import { Collapse } from 'antd';
import '../css/Faq.css';

const API_FAQ = require('../api/Faq')
const Panel = Collapse.Panel;


class FAQ extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            faq : [{id:1,question:"aquestion",answer:"aaaaa"},{id:2,question:"bquestion",answer:"bbbbb"}]
        }
      }

    text = (
        <p style={{ paddingLeft: 24 }}>
          A dog is a type of domesticated animal.
          Known for its loyalty and faithfulness,
          it can be found as a welcome guest in many households across the world.
        </p>
      );

    getFaq = () => {
        const faq = this.state.faq.map((option,idx)=>
            <Panel header={option.question} key={idx+1}>{option.answer}</Panel>
        )
        return <Collapse bordered={false} defaultActiveKey={['1']}>{faq}</Collapse>
    }

    API_GET_FAQ = () => {
        API_FAQ.GET_FAQ()
        .then(response => {
            if(response.code === 1){
                console.log(response)
                //request successfully

                //response.data
                /*
                data = [
                    {
                        answer: "ได้ แต่ต้องได้รับการพิจารณาจากอาจารย์ผู้รับผิดชอบ",
                        question: "สามารถฝึกงานในตำแหน่งที่ไม่เกี่ยวข้องกับโปรแกรมมิ่งได้หรือไม่",
                        _id: "5c9e15341a28591c19fb41f4"
                    },
                    {
                        answer: "ได้ แต่ต้องได้รับการพิจารณาจากอาจารย์ผู้รับผิดชอบ",
                        question: "หากมีการลาขณะฝึกงานเกิดจำนวนวันที่กำหนด สามารถทำงานเพิ่มเติมชดเชยวันที่ลาได้หรือไม่",
                        _id: "5c9e15881a28591c19fb41fc"
                    }
                ]
                */

            }
        })
    }

    componentDidMount = () => {
        
    }
    
    render() {
        return (
            <div className="container">
                <h3>FAQs</h3>
                {this.getFaq()}
            </div>
      
        )
    }
}

export default FAQ