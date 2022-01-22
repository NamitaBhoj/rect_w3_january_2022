import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import reportWebVitals from './reportWebVitals'
// import Header from './Header.js'
import Footer from './Footer.js'
import Login from './Login.js'
import SelectList from './SelectList.js'
import HeaderWithButton from './HeaderWithButton.js'

export const provinces = [{ code: 'QC', name: 'Quebec' }, { code: 'ON', name: 'Ontario' }, { code: 'NB', name: 'New-Brunswick' }]
export const countries = [{ code: 'CA', name: 'Canada' }, { code: 'US', name: 'USA' }, { code: 'IN', name: 'India' }, { code: 'MX', name: 'Mexixo' }]

class Page extends React.Component {
    render () {
        return (
            <div>
                <HeaderWithButton companyName="blabla.com"/>
                <p>Hello World !</p>
                <SelectList array={provinces}/>
                <SelectList array={countries}/>
                <Login username='toto' pw="1234"/>
                <Footer authorName="Stéphane Lapointe"/>
            </div>
        )
    }
}

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
