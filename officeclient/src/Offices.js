import React from 'react'
import styles from './Offices.module.css'

/**
 * offices components
 * uses our dress server REST API http://localhost:8000/offices
 * props inputs: none
 */
class offices extends React.Component {
    constructor (props) {
        super(props)

        // set initial state
        // do not use setState in constructor, write state directly
        this.state = {
            offices_data: [], // will contain offices data array from server
            offices_index: 0, // the index of the dress currently shown, start at first in array
            offices_count: 0, // how many offices in data array from server
            isLoaded: false, // will be true after data have been received from server
            error: null, // no errors yet !
            data: {
                officecode: null
            }
        }
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount () {
        // AJAX call using fetch. Make sure the dress server is running !
        // see https://reactjs.org/docs/faq-ajax.html
        fetch('http://localhost:8000/offices').then(
            response => {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            offices_data: json_response.offices, // data received from server
                            offices_count: json_response.offices.length, // how many offices in array
                            offices_index: 0, // will first show the first dress in the array
                            isLoaded: true, // we got data
                            error: null // no errors
                        })
                        // console.log(
                        //     this.state.offices_data[this.state.offices_index]
                        //         .officecode
                        // )
                        // console.log(this.state.officecode)
                    })
                } else {
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "dress not found"}
                            // save the error in state for display below
                            error: json_response, // something in format  {message: "dress not found", db_data:{}}
                            offices_data: {}, // no data received from server
                            offices_count: 0,
                            offices_index: 0
                        })
                    })
                }
            },
            error => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {
                        message:
                            'AJAX error, URL wrong or unreachable, see console'
                    }, // save the AJAX error in state for display below
                    offices_data: {}, // no data received from server
                    offices_count: 0,
                    offices_index: 0
                })
            }
        )
    }

    next = () => {
        this.setState({
            offices_index: this.state.offices_index + 1,
            data: { ...this.state.offices_data[this.state.offices_index + 1] }
        })
    }

    pre = () => {
        if (this.state.offices_index > 0) {
            this.setState({
                offices_index: this.state.offices_index - 1,
                data: {
                    ...this.state.offices_data[this.state.offices_index - 1]
                }
            })
        }
    }

    handleChange = event => {
        this.setState({
            data: {
                [event.target.name]: event.target.value
            }
        })
    }

    ClearForm () {
        console.log(document.getElementById('newofficecode').value)
        document.getElementById('newofficecode').value = ''
        document.getElementById('addressline1').value = ''
        document.getElementById('addressline2').value = ''
        document.getElementById('city').value = ''
        document.getElementById('state').value = ''
        document.getElementById('country').value = ''
        document.getElementById('postalcode').value = ''
        document.getElementById('phone').value = ''
        document.getElementById('territory').value = ''
    }

    SaveOffice () {
        let userData = {
            officecode: document.getElementById('newofficecode').value,
            addressline1: document.getElementById('addressline1').value,
            addressline2: document.getElementById('addressline2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            postalcode: document.getElementById('postalcode').value,
            phone: document.getElementById('phone').value,
            territory: document.getElementById('territory').value
        }

        fetch(
            'http://localhost:8000/offices/' +
                document.getElementById('newofficecode').value,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(userData)
            }
        )
            .then(res => res.json())
            .then(json_response =>
                this.setState({
                    offices_data: json_response.offices, // data received from server
                    offices_count: json_response.offices.length, // how many offices in array
                    offices_index: 0, // will first show the first dress in the array
                    isLoaded: true, // we got data
                    error: null // no errors
                })
            )
    }

    // display the offices table
    render () {
        if (this.state.error) {
            return (
                <div>
                    <b>{this.state.error.message}</b>
                </div>
            )
        } else if (this.state.isLoaded) {
            if (this.state.offices_count !== 0) {
                // dress table not empty
                return (
                    <div>
                        <b>
                            List of offices from server localhost:8000/offices
                        </b>
                        <h3>Office Detail</h3>

                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <th>officecode</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].officecode
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>city</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].city
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>phone</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].phone
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>addressline1</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].addressline1
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>addressline2</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].addressline2
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>state</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].state
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>country</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].country
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>postalcode</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].postalcode
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>territory</th>
                                    <td>
                                        {
                                            this.state.offices_data[
                                                this.state.offices_index
                                            ].territory
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>Office Form</h3>
                        <form className={styles.form}>
                            <label>officecode</label>
                            <input
                                type='text'
                                name='officecode'
                                id='newofficecode'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.officecode}
                            />
                            <br />
                            <label>addressline1</label>
                            <input
                                type='text'
                                name='addressline1'
                                id='addressline1'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.addressline1}
                            />
                            <br />
                            <label>addressline2</label>
                            <input
                                type='text'
                                name='addressline2'
                                id='addressline2'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.addressline2}
                            />
                            <br />
                            <label>city</label>
                            <input
                                type='text'
                                name='city'
                                id='city'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.city}
                            />
                            <br />
                            <label>state</label>
                            <input
                                type='text'
                                name='state'
                                id='state'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.state}
                            />
                            <br />
                            <label>country</label>
                            <input
                                type='text'
                                name='country'
                                id='country'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.country}
                            />
                            <br />
                            <label>postalcode</label>
                            <input
                                type='text'
                                name='postalcode'
                                id='postalcode'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.postalcode}
                            />
                            <br />
                            <label>phone</label>
                            <input
                                type='text'
                                name='phone'
                                id='phone'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.phone}
                            />
                            <br />
                            <label>territory</label>
                            <input
                                type='text'
                                name='territory'
                                id='territory'
                                min={0}
                                step={1}
                                onChange={event => this.handleChange(event)}
                                value={this.state.data.territory}
                            />
                        </form>
                        <button onClick={() => this.pre()}> backk</button>
                        <button onClick={() => this.next()}> next</button>
                        <br />
                        <button onClick={() => this.next()}> delete</button>
                        <button onClick={() => this.SaveOffice()}> save</button>
                        <br />
                        <button onClick={() => this.ClearForm()}>
                            {' '}
                            clare all for add new office
                        </button>
                        {/* {console.log(this.state.officecode)} */}
                    </div>
                )
            } else {
                return (
                    <div>
                        <b>offices table is empty</b>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <b>Waiting for server ...</b>
                </div>
            )
        }
    }
}

export default offices
