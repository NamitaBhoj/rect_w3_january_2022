import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Offices from './Offices';
import Footer from './Footer'
import reportWebVitals from './reportWebVitals';
import HeaderWithButton from './HeaderWithButton';

ReactDOM.render(
  <React.StrictMode>
    <HeaderWithButton companyName="blabla.com"/>
    <Offices />
    <Footer authorName="Safaldeep Singh"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
