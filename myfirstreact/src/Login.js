import React from 'react'

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = { username: this.props.username, pw: this.props.pw }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
            )
    }

    render () {
        return (
            <form>
                <input type="text" name="username" value={this.state.username} onChange={(event)=>this.handleChange(event)}></input>
                <input type="text" name="pw" value={this.state.pw} onChange={(event)=>this.handleChange(event)}></input>
                <button>connect</button>
            </form>
        )
    }
}

export default Login
