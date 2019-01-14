import React from 'react'

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