import React from 'react';
import axios from 'axios';
import config from '../config';
import Loader from 'react-loader-spinner'

class ViewListing extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            edit: this.props.match.params.id ? this.props.match.params.id : false,
            markets: [],
            errorLoading: false,
            loading: true,
            //Lisitng Information
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
        this.loadMarkets();
        if(this.state.edit){ 
            this.state.loading = true;
            this.loadListing();
        }
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

    findMarket(id){
        return this.state.markets.find((market) =>{
            return market._id === id;
        })
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
                    market: this.findMarket(listing.market).name,
                    industry: listing.industry,
                    published: listing.published,
                    compensation: listing.compensation,
                    duration: listing.duration,
                    applicationLink: listing.applicationLink
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
    
    render() {

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

            

                <p className="container text-center">

                <h1>
                    <i>
                    {this.state.title}
                    </i>
                </h1>
                <hr></hr>

                <div style={ { margin: 10 + 'px' }}>  

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 class= "text-left w-25">Description: </h5>     
                    <t class = "col text-left">{this.state.description}</t>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 class= "text-left w-25">Requirements: </h5>
                    <t class= "col text-left">{this.state.requirements}</t>.
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25" >Industry: </h5>
                    <t className="col text-left">{this.state.industry}</t>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25" >Market: </h5>
                    <t className="col text-left">{this.state.market}</t>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25">Compensation: </h5>
                    <t className="col text-left">{this.state.compensation},</t>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25">Duration: </h5>
                    <t className="col text-left">{this.state.duration}</t>
                </div>
                <hr></hr>

                </div>

                <div class= "bg-transparent text-center">
                <a href = {this.state.applicationLink}
                target = '_BLANK'
                className = 'btn btn-primary'
                >
                    Apply Now!
                </a>
                </div>

                </p>
            
            )
        }
    }
}

export default ViewListing;