import React from 'react';
import axios from 'axios';
import config from '../config';
import Loader from 'react-loader-spinner';
import { link } from 'fs';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';






class updateStudentProfile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            edit: this.props.match.params.id ? this.props.match.params.id : false,
            errorLoading: false,
            loading: true,
                name: '',
                address: '',
                email: '',


        };
        this.alert = "";

        if(this.state.edit){ 
            this.state.loading = true;
            this.loadStudentProfile();
        }else{
            this.state.loading = false;
        }
    }

    loadStudentProfile(){
        axios.get(config.apiURL + "studentProfile/" + this.state.edit).then(results => {
            console.log(results);
            var listing = results.data
            if(listing){
                console.log(listing);
                this.setState({
                    loading: false,
                    name: listing.name,
                    address: listing.address,         
                    email: listing.email,
                    description: listing.description
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
        var student_profile = {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            useraccount: this.state.useraccount,
            description: this.state.description
        }
        console.log(student_profile);

        if(this.state.edit){
            axios.put(config.apiURL + "studentProfile/" + this.state.edit, student_profile).then(result => {
                console.log("Successfully Edited Student Profile in Database: " + result);
                toast.success("Successfully edited profile");
            }).catch(error => {
                console.error("Error Editing Student Profile in Database: " + error);
                toast.error("Error Editing Profile");
            });
            
        }else{
            axios.post(config.apiURL + "studentProfile/", student_profile).then(result => {
                
                console.log("Successfully Added Student Profile to Database: " + JSON.stringify(result));
                this.linkProfile(result.data.result._id);
            }).catch(error => {
                console.error("Error Adding Student Profile to Database: " + error)
                toast.error("Error Adding Profile");
            })
    
        }
    }

    linkProfile(id){
		console.log("Working on it...");
		axios
				.put(config.apiURL + 'users/', { _id: this.props.auth.user._id, profile: id })
				.then((result) => {
                    console.log('Successfully Edited User Profile in Database: ' + result);
                    toast.success("Successfully Added Profile");
				})
				.catch((error) => {
                    console.error('Error Editing User Profile in Database: ' + error);
                    toast.error("Error Adding Profile");
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
            return(
            <div className="container" style={{ marginBottom: 25 + 'px' }}>
            <h1>{ this.state.edit ? 'Edit Student Profile' : 'Create Student Profile' }</h1>
            <form onSubmit = {this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} placeholder="John Doe" onChange={this.handleInputChange.bind(this)} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" value={this.state.email} placeholder="alberta@ufl.edu" onChange={this.handleInputChange.bind(this)} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Interests</label>
                    <textarea type="textarea" rows="5" className="form-control" name="description" value={this.state.description} placeholder="Summary of your experiences and interests (ex. web development)" onChange={this.handleInputChange.bind(this)} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="skills">9 Core Skills</label>
                    <input type="text" className="form-control" name="skills" value={this.state.website} placeholder="1-9" onChange={this.handleInputChange.bind(this)}></input>
                </div>
                <button type="submit" className="btn btn-primary"> Submit Changes </button>
            </form>
        </div>
    );
        }
    }
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(updateStudentProfile);