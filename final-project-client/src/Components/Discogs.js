import React from 'react'

class Discogs extends React.Component {
    constructor (props, context) {
        super(props)
        this.state = {
            searches_data: [], // will contain tracks data array from server
            inputSearch: null,
            isLoading: false, // will be true after data have been received from server
            error: null // no errors yet !
        }
    }
    searchArtist () {
        const search = this.state.inputSearch
        this.setState({
            isLoading: true
        })
        // AJAX call using fetch. Make sure the dress server is running !
        // see https://reactjs.org/docs/faq-ajax.html
        fetch(
            'https://api.discogs.com/database/search?key=tPQeIlBmvKtIOrLFvWxh&secret=wTuVFLXqdoIgkNssoLOzxikJgrypcSpx&artist=' +
                search +
                '&country=canada'
        ).then(response => {
            // here full fetch response object
            //console.log(response)
            // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
            if (response.ok) {
                // handle 2xx code success only
                // get only JSON data returned from server with .json()
                response.json().then(res => {
                    console.log(res)
                    this.setState({
                        searches_data: res.results, // data received from server
                        isLoading: false, // we got data
                        error: null // no errors
                    })
                })
            } else {
                // handle errors, for example 404
                response.json().then(json_response => {
                    this.setState({
                        isLoading: false,

                        error: json_response
                    })
                })
            }
        })
    }
    // display the offices table
    render () {
        return (
            <div>
                <div>
                    <form>
                        <div>
                            <input
                                value={this.state.inputSearch}
                                type='text'
                                onChange={event =>
                                    this.setState({
                                        inputSearch: event.target.value
                                    })
                                }
                                id='search'
                                name='search'
                            />
                        </div>
                        <div className='text-center'>
                            <button
                                type='button'
                                onClick={this.searchArtist.bind(this)}
                            >
                                Search{' '}
                            </button>
                        </div>
                    </form>
                    {this.state.isLoading && <div> loading</div>}
                    <div>
                        <table>
                            {this.state.searches_data.map(item => (
                                <div>{item.title}</div>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Discogs
