import React from 'react'

class Nav extends React.Component {
    // constructor () {
    //     super()
    // }

    render () {
        if (this.props.mylink) {
            return (
                <nav>
                    <ul>
                        <li><a href='/'>home</a></li>
                        <li><a href={this.props.mylink}>Variable link</a></li>
                    </ul>
                </nav>)
        } else {
            return (<div><h1>error</h1></div>)
        }
    }
}

export default Nav
