import React from 'react'
import styles from './Header.module.css'
/**
 * Web Site Header component
 */
class HeaderWithButton extends React.Component {
    constructor (props) {
        super(props)
        // initialize companyName with props input
        this.state = { companyName: this.props.companyName, newname: '' }
    }

    // onClick event handler for button 'Change Name'
    // MUST USE ARROW SYNTAX FOR EVENT HANDLERS otherwise 'this' will cause problems !
    changeName = (event) => {
        this.setState({ newname: event.target.value })
    }

    // this code without arrow function syntax throws an error when clicking and executing
    // because 'this' is undefined
    // Uncaught TypeError: Cannot read property 'setState' of undefined

    changeCompanyName = () => {
        this.setState({ companyName: this.state.newname })
    }

    render () {
        // using in-line styling, note the use of double curly brackets
        // the style must be a js object. see https://www.w3schools.com/react/react_css.asp
        // property names are not the same as pure CSS, they must follow the camelCased syntax
        return (
            <header className={styles.header}>
                <h2>
                    Welcome to {this.state.companyName}
                </h2>
                <button onClick={() => this.changeCompanyName()} className={styles.changeBtn} >Change name</button>
                <input onChange={(event) => this.changeName(event)} type="text" name="newname" id="newname"/>
            </header>
        )
    }
}

export default HeaderWithButton
