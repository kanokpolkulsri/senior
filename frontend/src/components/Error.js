import React from 'react'
import axios from 'axios'
const Config = require('../Config')
const prePath = Config.API_URL + "/images/"
const API_URL = Config.API_URL + "/upload"

class Error extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
        }
    }

    handleFile = async (e) => {
        let file = e.target.files[0]
        this.setState({file: file})
        this.uploadNowAndGetPathFile(file)
    }

    uploadNowAndGetPathFile = (file) => {
        let formData = new FormData()
        formData.append('file', file)
        axios.post(API_URL, formData, {})
        .then(response => {
            if(response.status === 200){
                let filename = response.data.filename
                let pathFile = ""
                if(filename !== undefined){
                    pathFile = prePath + response.data.filename
                }
                console.log(pathFile)
            }
        })
    }

    render() {
        return (
            <div>
                <br/><br/>
                <label>Select Files</label>
                <input type ="file" name="file" onChange={(e)=>this.handleFile(e)}></input>
                <br/>
            </div>
            
        )
    }
}

export default Error