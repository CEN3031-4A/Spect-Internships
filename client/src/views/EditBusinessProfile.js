import React from 'react';
import axios from 'axios';

import config from '../config';
import Loader from 'react-loader-spinner';

class EditBusinessProfile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            edit: this.props.match.params.id ? this.props.match.params.id : false,
            errorLoading: false,
            loading: true,

            //Business Profile Information
                name: '',
                address: '',
                description: '',
                website: '',
                email: '',
                
        };

        //Check if Edit or Add
        if(this.state.edit){ 
            this.state.loading = true;
            this.loadBusinessProfile();
        }else{
            this.state.loading = false;
        }
    }

    loadBusinessProfile(){
        axios.get(config.apiURL + "businessProfile/" + this.state.edit).then(results => {
            console.log(results);
            var listing = results.data
            if(listing){
                console.log(listing);
                this.setState({
                    loading: false,
                    name: listing.name,
                    address: listing.address,
                    description: listing.description,
                    website: listing.website,
                    email: listing.email,
                });
            }else{
                this.setState({
                    loading: false,
                    errorLoading: true
                })
            }

        }).catch(error => {
            console.error(error);
            this.setState({
                loading: false,
                errorLoading: true
            })
        });
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("Name: " + name + " Value: " + value);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        var business_profile = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            website: this.state.website,
            email: this.state.email,
            useraccount: this.state.useraccount,
        }
        console.log(business_profile);

        if(this.state.edit){
            axios.put(config.apiURL + "businessProfile/" + this.state.edit, business_profile).then(result => {
                console.log("Successfully Edited Business Profile in Database: " + result);
            }).catch(error => {
                console.error("Error Editing Business Profile in Database: " + error)
            });
        }else{
            axios.post(config.apiURL + "businessProfile/", business_profile).then(result => {
                // TO-DO: Added Success Popup
                console.log("Successfully Added Business Profile to Database: " + result);
            }).catch(error => {
                console.error("Error Adding Business Profile to Database: " + error)
            })
        }
    }

    render(){
       if(this.state.errorLoading && !this.state.loading){
            return(
            <div className="container">
                <h1 className="text-danger text-center">Uh oh!</h1>
                <h5 className="text-danger text-center">There was an error loading this page. Try again.</h5>
            </div>
            );
        }else if(this.state.loading){
            return(
                <div className="container text-center">
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={70}
                        width={70}
                        //3 secs

                    />
                    <h1 className="text-secondary text-center">Loading....</h1>
                    <h5 className="text-secondary text-center">Just a few more seconds...</h5>
                </div>
            );
        }else{
            return(
                <div className="container" style={{ marginBottom: 25 + 'px' }}>
                    <h1>{ this.state.edit ? 'Edit Business Profile' : 'Create Business Profile' }</h1>
                    <form onSubmit = {this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="name">Business Name</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} placeholder="Ex. Google Inc." onChange={this.handleInputChange.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Business Address</label>
                            <input type="text" className="form-control" name="address" value={this.state.address} placeholder="Your business location" onChange={this.handleInputChange.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Business Description</label>
                            <textarea type="textarea" rows="5" className="form-control" name="description" value={this.state.description} placeholder="A summary of your business, for people to see!" onChange={this.handleInputChange.bind(this)} required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="website">Business Website</label>
                            <input type="text" className="form-control" name="website" value={this.state.website} placeholder="(Optional) A link to your Website" onChange={this.handleInputChange.bind(this)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Contact E-mail</label>
                            <input type="text" className="form-control" name="email" value={this.state.email} placeholder="(Optional) An E-mail for your client's inquiries" onChange={this.handleInputChange.bind(this)}></input>
                        </div>
                        <button type="submit" className="btn btn-primary"> Submit Changes </button>
                    </form>
                </div>
            );
        }
    }
}

export default EditBusinessProfile;