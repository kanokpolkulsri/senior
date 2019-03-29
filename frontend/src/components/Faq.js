import React from 'react'
import { Collapse } from 'antd';
import '../css/Faq.css';

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