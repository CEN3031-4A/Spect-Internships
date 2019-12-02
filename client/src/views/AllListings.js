import React from 'react';
import axios from 'axios';

import config from '../config';
import './AllListings.css';


class AllListings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props,
            markets: [],
            errorLoading: false,
            loading: true,
            listings: []
        };
        this.loadListing();
    }

    loadListing() {
        axios.get(config.apiURL + "Internship/").then(results => {
            console.log(results);
            var listings = results.data;
            listings.forEach(listing => {
                listing.description = listing.description.replace(/<[^>]+>/g,"")
                
            });
            if (listings) {
                console.log(listings);
                this.setState({
                    loading: false,
                    listings: listings
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
                <div className="container" >
             
                    
                        {this.state.listings.map((listing, index) => (

                        <div key={listing._id} className="card text-center" style={{width: "100%"}}>
                           
                                <li className="list-group-item" key={index}>
                                    <a href={'/listing/view/' + listing._id}>
                                    <div className="card-header" >
                                    {listing.title}
                                    </div>
                                    <ul className="list-group list-group-flush">
                                    {listing.description}
                                    </ul>
                                    </a>
                                </li>
                            </div>
                       
                        ))}
                  
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>

            );
        }else{
            return (<p>Loading...</p>);
        }
    }


}
export default AllListings;