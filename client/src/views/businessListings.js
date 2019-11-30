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
        axios.get(config.apiURL + "Internship/" + this.state.view ).then(results => { //Internship business ID? 
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
                <div>
                    <ul>
                        {this.state.listings.map((listing, index) => (
                            <li key={index}><a href={'/listing/view/' + listing.business_id}>{listing.title}</a></li>
                        ))}
                    </ul>

                </div>

            );
        }else{
            return (<p>Loading...</p>);
        }
    }


}
export default businessListings;