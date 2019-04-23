import React from 'react'
import { Modal, Button,Select,Table } from 'antd';

const Option = Select.Option
const API_ADMIN = require('../api/Assignment_Admin')

class AssignmentModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        data : [],
        yearSelected: (new Date()).getYear() - 60,
        modalLoading: false,
        modalVisible: false,
        columns: [{
          title: 'Assignment',
          dataIndex: 'assignmentName',
          render: (text) =>  <span>{text}</span>
        }],
        rowSelectedLength:0,
        rowSelected:[]
      }      
    }
    

    API_POST_YEAR = (year) => {
        /* to get all assignment in that year */
        API_ADMIN.POST_YEAR(year)
        .then(response => {
            if(response.code === 1){
                console.log("all assignment in modal",response.data);
                this.setState({data:response.data})
                /* get latest year */
            }
        })
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.setState({rowSelectedLength:selectedRows.length})
          this.setState({rowSelected:selectedRows})

        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      }
    handleYearChange = (value) => {
        this.setState({yearSelected:value})
        this.API_POST_YEAR(value)
    }
    componentDidMount = () =>{
        this.API_POST_YEAR(this.state.yearSelected)

    }
    UNSAFE_componentWillReceiveProps = (nextProps) => {     
        if(this.props.modalLoading !== nextProps.modalLoading)
            this.setState({modalLoading:nextProps.modalLoading})
        if(this.props.modalVisible !== nextProps.modalVisible)
            this.setState({modalVisible:nextProps.modalVisible})
    }

   

  render() {
    return (
    
        <Modal
            visible={this.state.modalVisible}
            // title="Title"
            onOk={this.props.handleOk}
            onCancel={this.props.handleCancel}
            footer={[
                <Button key="back" onClick={this.props.handleCancel}>Return</Button>,
                <Button key="submit" type="primary" loading={this.state.modalLoading} onClick={() => this.props.handleOk(this.state.rowSelected)}>
                {this.state.rowSelectedLength === 0? "Duplicate": "Duplicate "+this.state.rowSelectedLength+" item(s)"}
                </Button>
            ]}
            >
            <span>Duplicate from: </span>
  
            
            <Select defaultValue={this.props.currentYear} style={{ width: 120 }} onChange={this.handleYearChange} >
                <Option value={this.props.currentYear}>{this.props.currentYear}</Option>
                {this.props.year.map((option)=>
                    <Option value={option}>{option}</Option>    
                )}
            </Select>
            <Table rowKey={record => record._id} rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data} />

            </Modal>
      
    );
  
}
}
export default AssignmentModal;
