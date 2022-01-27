import React from 'react'

class Playlist extends React.Component {
    constructor (props, context) {
        super(props)
        this.state = {
            tracks_data: [], // will contain tracks data array from server
            current_tracks: null,
            new_track: {
                id: '',
                playlist_id: '',
                title: '',
                uri: '',
                master_id: ''
            },
            tracks_index: 0, // the index of the dress currently shown, start at first in array
            tracks_count: 0, // how many tracks in data array from server
            isLoaded: false, // will be true after data have been received from server
            error: null // no errors yet !
        }
    }
    componentDidMount () {
        // AJAX call using fetch. Make sure the dress server is running !
        // see https://reactjs.org/docs/faq-ajax.html
        fetch('http://localhost:8000/tracks').then(
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
                            tracks_data: json_response.tracks, // data received from server
                            current_tracks: json_response.tracks.length
                                ? json_response.tracks[0]
                                : null,
                            tracks_count: json_response.tracks.length, // how many offices in array
                            tracks_index: 0, // will first show the first dress in the array
                            isLoaded: true, // we got data
                            error: null // no errors
                        })
                    })
                } else {
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "dress not found"}
                            // save the error in state for display below
                            error: json_response, // something in format  {message: "dress not found", db_data:{}}
                            tracks_data: {}, // no data received from server
                            tracks_count: 0,
                            tracks_index: 0
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
                    tracks_data: {}, // no data received from server
                    tracks_count: 0,
                    tracks_index: 0
                })
            }
        )
    }
    trackHTML = track => {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {
                                                    this.state.tracks_data[
                                                        this.state.tracks_index
                                                    ].title
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {
                                                    this.state.tracks_data[
                                                        this.state.tracks_index
                                                    ].id
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Play-id</td>
                                            <td>
                                                {
                                                    this.state.tracks_data[
                                                        this.state.tracks_index
                                                    ].playlist_id
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {
                                                    this.state.tracks_data[
                                                        this.state.tracks_index
                                                    ].uri
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>master-id</td>
                                            <td>
                                                {
                                                    this.state.tracks_data[
                                                        this.state.tracks_index
                                                    ].master_id
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <button
                                                // className={
                                                //     this.state
                                                //         .current_office
                                                //         ? ''
                                                //         : 'd-none'
                                                // }
                                                // type='button'
                                                // onClick={() =>
                                                //     this.deleteOffice()
                                                // }
                                                >
                                                    Delete{' '}
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
            if (this.state.tracks_count !== 0) {
                return (
                    <div>
                        <b>
                            List of offices from server localhost:8000/offices
                        </b>
                        {/* <Office office={this.state.offices_data[this.state.offices_index]} /> */}
                        {this.trackHTML(
                            this.state.current_tracks
                                ? this.state.current_tracks
                                : this.state.new_track
                        )}
                        {/* <div>
                            <button
                                className={
                                    this.state.offices_index === 0
                                        ? 'd-none'
                                        : ''
                                }
                                onClick={() => this.changeOfficeIndex('-')}
                            >
                                {' '}
                                &lt; Previous
                            </button>
                            <span>
                                {this.state.offices_index + 1} of{' '}
                                {this.state.offices_count}
                            </span>
                            <button
                                className={
                                    this.state.offices_index ===
                                    this.state.offices_count - 1
                                        ? 'd-none'
                                        : ''
                                }
                                onClick={() => this.changeOfficeIndex('+')}
                            >
                                Next &gt;
                            </button>
                        </div> */}
                    </div>
                )
            } else {
                return (
                    <div>
                        <b>Office table is empty</b>
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
export default Playlist
