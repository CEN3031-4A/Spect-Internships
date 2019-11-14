import React from 'react';
import axios from 'axios';

import config from '../config';


class ViewListing extends React.Component {

    constructor(props) {
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

    loadListing() {
        axios.get(config.apiURL + "Internship/").then(results => {
            console.log(results);
            var listing = results.data;
            if (listing) {
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
        map(listing => {
            return (
                <tr key={listing.id}>
                    <td>{listing.title}</td>
                    <td>{listing.description}</td>
                </tr>

            );
        });
        return <tbody>{ViewListing}</tbody>;
    }

}
export default ViewListing;