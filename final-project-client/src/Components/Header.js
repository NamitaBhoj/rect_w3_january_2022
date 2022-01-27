import React from 'react'
import './Header.css'

class Header extends React.Component {
    render () {
        return <header>{this.props.companyName}</header>
    }
}

export default Header
