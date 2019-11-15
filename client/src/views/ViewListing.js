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
        }
        this.loadListing();
    }

    loadMarkets(){
        axios.get(config.apiURL + "Market/").then(results => {
            console.log(results);
            this.setState({
                markets: results.data,
                loading: false
            });
            this.findMarket();
        }).catch(error => {
            console.error(error);
            this.setState({
                loading: false,
                errorLoading: true
            })
        });
    }

    findMarket(){
        var market = this.state.markets.find((market) =>{
            return market._id === this.state.market;
        });
        this.setState({
            market: market.name
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
                    industry: listing.industry,
                    market: listing.market,
                    published: listing.published,
                    compensation: listing.compensation,
                    duration: listing.duration,
                    applicationLink: listing.applicationLink
                });
                this.loadMarkets();
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

            <div className="container">

                <h1>
                    <i>
                    {this.state.title}
                    </i>
                </h1>
                <hr></hr>

                <div style={ { margin: 10 + 'px' }}>  

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className= "text-left w-25">Description: </h5>     
                    <p className="col text-left">{this.state.description}</p>
                </div>
                <hr></hr>

                <div className="row" style={ { margin: 20 + 'px' }}>
                    <h5 className= "text-left w-25">Requirements: </h5>
                    <p className= "col text-left">{this.state.requirements}</p>.
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25" >Industry: </h5>
                    <p className="col text-left">{this.state.industry}</p>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25" >Market: </h5>
                    <p className="col text-left">{this.state.market}</p>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25">Compensation: </h5>
                    <p className="col text-left">{this.state.compensation}</p>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25">Duration: </h5>
                    <p className="col text-left">{this.state.duration}</p>
                </div>
                <hr></hr>

                </div>

                <div className= "bg-transparent text-center">
                <a href = {this.state.applicationLink}
                target = '_BLANK'
                className = 'btn btn-primary'
                >
                    Apply Now!
                </a>
                </div>

            </div>
            )
        }
    }
}

export default ViewListing;
