import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'

import Header from './Components/Header'
import Playlist from './Components/Playlist'
import Discogs from './Components/Discogs'
import Footer from './Components/Footer'

ReactDOM.render(
    <React.StrictMode>
        <Header companyName='Music Playlist Manager' />
        <Playlist />
        <Discogs />
        <Footer authorName='Author - Yagnesh Patel and Namita Bhoj' />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
