import React from 'react';
import axios from 'axios';
import config from '../config';
import Loader from 'react-loader-spinner'

class ViewBusinessProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            view: this.props.match.params.id,
            errorLoading: false,
            loading: true,

            //Business Profile Information
                name: '',
                address: '',
                description: '',
                website: '',
                email: ''
        };
        this.loadBusinessProfile();
    }

    loadBusinessProfile(){
        axios.get(config.apiURL + "businessProfile/" + this.state.view).then(results => {
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
            return (
                <div className="container" style={{ marginBottom: 25 + 'px' }}>
                    <h1>{this.state.name}</h1>
                    <div style={ { margin: 10 + 'px' }}>  
                        <div className = "row" style={ { margin: 20 + 'px' }}>
                            <h5 class= "text-left w-25">Description: </h5>     
                            <t class = "col text-left">{this.state.description}</t>
                        </div>
                        <hr></hr>
                        <div className = "row" style={ { margin: 20 + 'px' }}>
                            <h5 class= "text-left w-25">Address: </h5>     
                            <t class = "col text-left">{this.state.address}</t>
                        </div>
                        <hr></hr>
                        <div className = "row" style={ { margin: 20 + 'px' }}>
                            <h5 class= "text-left w-25">Website Link: </h5>     
                            <t class = "col text-left">{this.state.website}</t>
                        </div>
                        <hr></hr>
                        <div className = "row" style={ { margin: 20 + 'px' }}>
                            <h5 class= "text-left w-25">Contact E-mail: </h5>     
                            <t class = "col text-left">{this.state.email}</t>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="container" style={{ marginBottom: 25 + 'px' }}>
                        <h2>Current Internships</h2>
                        {/*Add Business Listings after a business object is attached to them.*/}
                    </div>
                </div>
            );
        }
    }
}
export default ViewBusinessProfile; 