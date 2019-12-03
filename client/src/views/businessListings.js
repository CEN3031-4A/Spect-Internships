import React from 'react';
import axios from 'axios';

import config from '../config';


class businessListings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
            view: this.props.match.params.id ? this.props.match.params.id : false,
            data: this.props,
            errorLoading: false,
            loading: true,
            listings: [],
            name: ''
        };
        this.loadBusinessInternships();
    }

    loadBusinessInternships() {
        axios.get(config.apiURL + "businessProfile/" + this.state.view +"/listings" ).then(results => { //Internship business ID? 
            console.log(results);
            var listings = results.data;
            if (listings) {
                console.log(listings);
                this.setState({
                    loading: false,
                    listings: listings,

                })
            } else {
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

    render() {
        
        if(!this.state.loading){
            return (
               
                
                <div className="container text-center">
                     
                      <div class="jumbotron text-center">
                      <h1>View Current Internship Listings</h1>
                </div>
                <div>
                    <ul>
                    <div className="form-group">
                    <label htmlFor="name">Click to Edit Internship</label>
                        {this.state.listings.map((listing, index) => (
                    <div class="card">
                            <a href={'/listing/edit/' + listing._id}>{listing.title}</a>
                            </div>
                        ))}
                        
                        </div>
                    </ul>

                    </div>
                </div>
            );
        }else{
            return (<p>Loading...</p>);
        }
    }


}
export default businessListings;