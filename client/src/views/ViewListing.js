import React from 'react';
import axios from 'axios';

import config from '../config';

class ViewListing extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            markets: [],
            errorLoading: false,
            loading: true,
            //Listing Information
                title: '',
                description: '',
                requirements: '',
                market: '',
                industry: 'Engineering',
                published: false,
                compensation: 'Paid',
                duration: '1 Month',
                applicationLink: ''
        };
    }

    loadMarkets(){
        axios.get(config.apiURL + "Market/").then(results => {
            this.setState({
                markets: results.data,
                market: results.data[0]._id,
                loading: false
            })
        }).catch(error => {
            console.error(error);
            this.setState({
                loading: false,
                errorLoading: true
            })
        });
    }

    loadListing(){
        axios.get(config.apiURL + "Internship/" + this.state.edit).then(results => {
            console.log(results);
            var listing = results.data
            if(listing){
                console.log(listing);
                this.setState({
                    loading: false,
                    title: listing.title,
                    description: listing.description,
                    requirements: listing.requirements,
                    market: listing.market,
                    industry: listing.industry,
                    published: listing.published,
                    compensation: listing.compensation,
                    duration: listing.duration,
                    applicationLink: listing.applicationLink
                })
            }else{
                this.setState({
                    loading:false,
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
        return(
            <div className = "form-group">
                <label htmlFor="market">Position Market</label>
                <select className="form-control" name="market" value={this.state.market} onChange={this.handleInputChange.bind(this)} required>
                    <option disabled value>-- SELECT --</option>
                    {
                        this.state.markets.map(market => {
                            if(market.published){
                                return (<option value={market._id} key={market._id}>{ market.name} </option>);
                            }else{
                                return null;
                            }
                        })
                    }
                </select>
            </div>


        );
    }
}

export default ViewListing;