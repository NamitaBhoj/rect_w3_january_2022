import React from 'react';
import styles from './Office.module.css'

class Offices extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        offices_data : [], // will contain offices data array from server
        current_office: null,
        new_office: {
            officecode: '',
            addressline1: '',
            addressline2: '',
            city:'',
            state: '',
            country: '',
            phone: '',
            postalcode: '',
            territory:''
        },
        offices_index : 0, // the index of the dress currently shown, start at first in array
        offices_count : 0, // how many offices in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the dress server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/offices')
        .then(
            (response)=> {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            offices_data:json_response.offices, // data received from server
                            current_office: json_response.offices.length?json_response.offices[0]:null,
                            offices_count:json_response.offices.length, // how many offices in array
                            offices_index:0,  // will first show the first dress in the array
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "dress not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "dress not found", db_data:{}}
                            offices_data: {}, // no data received from server
                            offices_count:0,
                            offices_index:0,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    offices_data: {}, // no data received from server
                    offices_count:0,
                    offices_index:0,
                });
            }
        )
    }

    changeOfficeIndex = (action) => {
        let newIndex
        if(action === '-'){
            newIndex = this.state.offices_index - 1
            this.setState({ offices_index: newIndex })
        }else
                newIndex = this.state.offices_index + 1
    this.setState ({ offices_index: newIndex, current_office: this.state.offices_data[newIndex] })
    }
    onChangeFormField = (event) => {
        if(this.state.current_office){
            const data = this.state.current_office
            data[event.target.name] = event.target.value
            this.setState({
                current_office: data
            })
        }else{
            const data = this.state.new_office
            data[event.target.name] = event.target.value
            this.setState({
                new_office: data
            })

        }
    }
    clearForm = (event) => {
        // this.state.offices_data[this.state.offices_index]
        this.setState({
            current_office: null
        })
    }
    deleteOffice = () => {
        const id = this.state.offices_data[this.state.offices_index].officecode
        fetch('http://localhost:8000/offices/'+id,{
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            // console.log(data);
            this.componentDidMount()
            if(data.status === 'Success'){
                alert("Office Deleted Successfully")
            }else{
                alert("Something Went Wrong! Try Again")
            }
        })
    }
    addOrUpdateOffice = () => {
        if(this.state.current_office){
            const office = this.state.current_office
            const payload = {
                code: parseInt(office.officecode),
                addressline1: office.addressline1,
                addressline2: office.addressline2,
                city: office.city,
                state: office.state,
                country: office.country,
                postalcode: office.postalcode,
                territory: office.territory,
                phone: office.phone
            }
            // update
            console.log('update');
            const id = this.state.offices_data[this.state.offices_index].officecode
            fetch('http://localhost:8000/offices/'+id,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(payload)
            }).then(response => response.json())
            .then(data => {
                // console.log(data);
                this.componentDidMount()
                if(data.status === 'Success'){
                    alert("Office Updated Successfully")
                }else{
                    alert("Something Went Wrong! Try Again")
                }
            })
            }else{
            // add
            console.log('add');
            const office = this.state.new_office
            const payload = {
                code: parseInt(office.officecode),
                addressline1: office.addressline1,
                addressline2: office.addressline2,
                city: office.city,
                state: office.state,
                country: office.country,
                postalcode: office.postalcode,
                territory: office.territory,
                phone: office.phone
            }
            fetch('http://localhost:8000/offices/',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(payload)
            }).then(response => response.json())
            .then(data => {
                // console.log(data);
                this.setState({
                    new_office: {
                        officecode: '',
                        addressline1: '',
                        addressline2: '',
                        city:'',
                        state: '',
                        country: '',
                        phone: '',
                        postalcode: '',
                        territory:''
                    }})
                this.componentDidMount()
                if(data.status === 'Success'){
                    alert("Office Added Successfully")
                }else{
                    alert("Something Went Wrong! Try Again")
                }
            })
        }
    }
    officeHTML = (office) => {
        return (
            <form className={styles.officeForm}>
            <div>
                <label htmlFor="office_code">Office Code</label>
                <input  value={office?(office.officecode?? ''):''} type="number"
                    onChange={(event) => this.onChangeFormField(event)} id="office_code" name='officecode' />
            </div>
            <div>
                <label htmlFor="address_line_1">Address Line 1</label>
                <input  value={office?(office.addressline1?? ''):''} type="text"
                    onChange={(event) => this.onChangeFormField(event)} id="address_line_1" name='addressline1'/>
            </div>
            <div>
                <label htmlFor="address_line_2">Address Line 2</label>
                <input  value={office?(office.addressline2?? ''):''} type="text"
                    onChange={(event) => this.onChangeFormField(event)} id="address_line_2" name='addressline2'/>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input value={office?(office.city?? ''):''} type="text"
                    onChange={(event) => this.onChangeFormField(event)} id="city" name='city'/>
            </div>
            <div>
                <label htmlFor="state">State</label>
                <input value={office?(office.state?? ''):''} type="text"
                    onChange={(event) => this.onChangeFormField(event)} id="state" name='state'/>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input value={office?(office.country?? ''):''} type="text"
                    onChange={(event) => this.onChangeFormField(event)} id="country" name='country'/>
            </div>
            <div>
                <label htmlFor="postal_code">Postal Code</label>
                <input value={office?(office.postalcode?? ''):''} type="number"
                    onChange={(event) => this.onChangeFormField(event)} id="postal_code" name='postalcode'/>
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input value={office?(office.phone?? ''):''} type="text"
                    onChange={(event) => this.onChangeFormField(event)} id="phone" name='phone'/>
            </div>
            <div>
                <label htmlFor="territory">Territory</label>
                <input value={office?(office.territory?? ''):''} type="text"
                    onChange={(event) => this.onChangeFormField(event)} id="territory" name='territory'/>
            </div>
            <div className='text-center'>
                <button type="button" onClick={() => this.addOrUpdateOffice()}>Save </button>
                <button className={this.state.current_office?'':'d-none'} type="button"
                onClick={() => this.deleteOffice()}>Delete </button>
                <button type="button" onClick={() => this.clearForm()}>Clear form to Add a new Office </button>
            </div>
            <br/>
        </form>

        )
    }
    // display the offices table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                return (
                    <div className={styles.offices}>
                        <b>List of offices from server localhost:8000/offices</b>
                        {/* <Office office={this.state.offices_data[this.state.offices_index]} /> */}
                        {this.officeHTML(this.state.current_office?this.state.current_office:this.state.new_office)}
                        <div className={styles.officesNav}>
                        <button className={this.state.offices_index===0?'d-none':''}
                            onClick={() => this.changeOfficeIndex('-')}> &lt; Previous</button>
                        <span>{this.state.offices_index+1} of {this.state.offices_count}</span>
                        <button  className={this.state.offices_index===this.state.offices_count-1?'d-none':''}
                            onClick={() => this.changeOfficeIndex('+')}>Next &gt;</button>
                        </div>
                    </div>
                )
            }else{
                return(<div><b>Office table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
    }
  }

export default Offices;