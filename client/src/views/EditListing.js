import React from 'react';
import axios from 'axios';

import config from '../config';
import Loader from 'react-loader-spinner'




class EditListing extends React.Component{


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

    deleteListing(){
        if(this.state.edit){
            axios.delete(config.apiURL + "Internship/" + this.state.edit + "/delete").then(results => {
                console.log("Successfully deleted.");
                // TO-DO: REDIRECT TO MY LISTINGS PAGE & SUCCESS TOAST
            }).catch(erro => {
                console.log("Error Deleting");
                // TO-DO: Popup Error Toast
            });
        }else{
            console.error("Can't delete until created.");
        }
    }
    
    processForm(event){
        event.preventDefault();
        var internship = {
            title: this.state.title,
            description: this.state.description,
            requirements: this.state.requirements,
            market: this.state.market,
            industry: this.state.industry,
            compensation: this.state.compensation,
            duration: this.state.duration,
            applicationLink: this.state.applicationLink,
            published: this.state.published
            // TO-DO: ADD LOGGED IN COMPANY ID INFORMATION
        }
        console.log(internship);
        if(this.state.edit){
            axios.put(config.apiURL + "Internship/" + this.state.edit + "/update", internship).then(result => {
                console.log("Successfully Edited Internship in Database: " + result);
            }).catch(error => {
                console.error("Error Editing Internship in Database: " + error)
            });
        }else{
            axios.post(config.apiURL + "Internship/", internship).then(result => {
                // TO-DO: Added Success Popup
                console.log("Successfully Added Internship to Database: " + result);
            }).catch(error => {
                console.error("Error Adding Internship to Database: " + error)
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
                    <h1>{ this.state.edit ? 'Edit Internship' : 'Add New Internship' }</h1>
                    {/* <button class="btn btn-secondary">Return to Listings</button> */}
                    <button className="btn btn-outline-danger" style={ { margin: 5 + 'px' }} onClick={this.deleteListing.bind(this)}><i className="fa fa-trash"/> Delete Listing</button>
                    <button className="btn btn-outline-secondary" style={ { margin: 5 + 'px' }}><i className="fa fa-external-link"/> View Listing</button>
                    <hr></hr>
                    <form onSubmit={this.processForm.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="title">Internship Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} placeholder="Software Engineering Intern" onChange={this.handleInputChange.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Position Description</label>
                            <textarea type="textarea" rows="5" className="form-control" name="description" value={this.state.description} placeholder="This is a 3-month summer position where..." onChange={this.handleInputChange.bind(this)} required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="requirements">Position Requirements</label>
                            <textarea type="text" rows="5" className="form-control" name="requirements" value={this.state.requirements} placeholder="Experience with Java, C++, or other programming languages" onChange={this.handleInputChange.bind(this)} required></textarea>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="industry">Position Industry</label>
                                    <select className="form-control" name="industry" value={this.state.industry} onChange={this.handleInputChange.bind(this)} required>
                                        <option disabled value>-- SELECT --</option>
                                        <option>Engineering</option>
                                        <option>Marketing</option>
                                        <option>Human Resources</option>
                                        <option>Customer Service</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
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
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="compensation">Compensation</label>
                                    <select className="form-control" name="compensation" value={this.state.compensation} onChange={this.handleInputChange.bind(this)} required>
                                        <option disabled value>-- SELECT --</option>
                                        <option>Paid</option>
                                        <option>Unpaid</option>
                                        <option>Stipend</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">Duration</label>
                                    <select className="form-control" name="duration" value={this.state.duration} onChange={this.handleInputChange.bind(this)} required>
                                        <option disabled value>-- SELECT --</option>
                                        <option>1 Month</option>
                                        <option>1-3 Months</option>
                                        <option>3-6 Months</option>
                                        <option>6-12 Months</option>
                                        <option>12+ Months</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="applicationLink">Application Link</label>
                            <input type="url" className="form-control" name="applicationLink" value={this.state.applicationLink} placeholder="Link to Apply to Position" onChange={this.handleInputChange.bind(this)} required></input>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="published" checked={this.state.published} value={this.state.published} onChange={this.handleInputChange.bind(this)}></input>
                            <label className="form-check-label" htmlFor="published">
                                Publish Internship
                            </label>
                        </div>
                        <h3>(Payment Processing Goes Here)</h3>
                        <input type="submit" className={ this.state.published ? 'btn btn-success' : 'btn btn-secondary' } value={ this.state.published ? this.state.edit ? 'Save Changes' : 'Publish Internship' : 'Save Draft' }></input>
                    </form>
                </div>
            );
        }
    }
}

export default EditListing;