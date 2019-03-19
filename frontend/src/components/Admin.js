import React from 'react'
import {Row,Col, Form, Icon, Input, Button  } from 'antd';
import {  Route, Switch, Link, Redirect} from 'react-router-dom'

import '../css/Admin.css';
import '../css/App.css';




class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {"cate":"",
        "topic":""
        }
    }

    setActive = () =>{
        var elems = document.querySelectorAll(".menu-li.active");

        [].forEach.call(elems, function(el) {
            el.classList.remove("hover");
        });

        if(this.props.match.params.cate === "faq"){
            this.refs.faq.classList.add("active")
            // this.setState({"cate":"FAQs"})
            // this.setState({"topic":"FAQs Lists"})
        }
        else if(this.props.match.params.cate === "announcement"){
            var tmp= this.props.match.params.topic
            this.refs[tmp].classList.add("active")
            console.log(this.refs[tmp].innerHTML) 
            // this.setState({"cate":"FAQs"})
            // this.setState({"topic":"FAQs Lists"})
        }
        
    }
    componentDidMount = () =>{
        this.setActive();
    }
    componentDidUpdate = () =>{  
        this.setActive();
    }


    render() {
        return (
            <div>      
                <Row>
                    <Col span={5}>
                        <div className="col-menu">
                            <span className="menu-header"><i className="material-icons">assignment</i>  Announcement</span>
                            <ul className="menu-ul">
                                <Link style={{ textDecoration: 'none' }} to="/admin/announcement/event" ><li ref="event" className="menu-li" >Upcoming Events</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/admin/announcement/announcement" ><li ref="announcement" className="menu-li" >Announcement</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/admin/announcement/companylist" ><li ref="companylist" className="menu-li">Company Lists</li></Link>

                            </ul>
                            <span className="menu-header"><i className="material-icons">assignment</i>  FAQs</span>
                            <ul className="menu-ul">
                                <Link style={{ textDecoration: 'none' }} to="/admin/faq" ><li ref="faq" className="menu-li">FAQs Lists</li></Link>
                            </ul>
                            <span className="menu-header"><i className="material-icons">assignment</i>  Process 
                            <span className="group-icon">
                                <i className="material-icons">add_circle</i>
                                <i className="material-icons">delete</i>
                            </span>
                            </span>
                            <div className="menu-content">

                            </div>
                        </div>
                    </Col>
                    <Col span={18} className="admin-workarea" >

                        <Switch>
                            <Route path="/admin/announcement/:topic" component={Announcement}/>
                            <Route path="/admin/faq" component={Announcement}/>
                            <Route path="/admin/process" component={Process}/>
                            <Redirect from="/admin/announcement" to="/admin/announcement/event"/>
                            <Redirect from="/admin" to="/admin/process/all"/>
                        </Switch>
                    </Col>
                </Row>
            </div>
        )
    }

}

class AnnouncementForm extends React.Component {  
    
    constructor(props) {
        super(props)
        this.state = {"cate":"",
            "topic":"",
            // form: this.props.form

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            

              
          }
        });
      }

    componentDidMount= () =>{
        // this.setState({"cate":this.props.match.params.cate})
    }
    render () {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
          };
        return (
            <div> 
                
            </div>
        )
    }
}

const Announcement = Form.create({ name: 'normal_announcement' })(AnnouncementForm);

class Process extends React.Component {  
    render () {
        return (
            <div> b </div>
        )
    }
}
export default Admin