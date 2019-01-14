import React from 'react'
import axios from 'axios'

const Config = require('../Config')

class Feed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "Feed",
        }
    }

    getUser = (e) => {
        e.preventDefault()
        const username = e.target.elements.username.value
        console.log(username)

        // stucking here!
        axios.get(Config.API_URL)
        .then( res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.name}</p>
                <form onSubmit={this.getUser}>
                    <input type="text" name="username" />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Feed