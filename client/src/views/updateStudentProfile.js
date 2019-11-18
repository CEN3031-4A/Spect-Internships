import React from 'react';
import axios from 'axios';
import config from '../config';
import Loader from 'react-loader-spinner';
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
                description: '',
                skills1: '',
                skills2: '',
                skills3: '',


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
                    description: listing.description,
                    skills1: listing.skills1,
                    skills2: listing.skills2,
                    skills3: listing.skills3
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
            description: this.state.description,
            skills1: this.state.skills1,
            skills2: this.state.skills2,
            skills3: this.state.skills3
        }
        console.log(student_profile);

        if(this.state.edit){
            axios.put(config.apiURL + "studentProfile/" + this.state.edit, student_profile).then(result => {
                console.log("Successfully Edited Student Profile in Database: " + result);
                toast.success("Updated Student Profile");
            }).catch(error => {
                console.error("Error Editing Student Profile in Database: " + error)
                toast.serror("Error Updating Student Profile");
            });
            
        }else{
            axios.post(config.apiURL + "studentProfile/", student_profile).then(result => {
                
                console.log("Successfully Added Student Profile to Database: " + result);
            }).catch(error => {
                console.error("Error Adding Student Profile to Database: " + error)
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
                    <label htmlFor="skills">Top 3 Soft Skills </label>
                    <select className="form-control" name="skills" value={this.state.skills1} onChange={this.handleInputChange.bind(this)} required>
                         <option disabled value>-- SELECT --</option>
                         <option>Leadership</option>
                        <option>Minedfulness</option>
                        <option>Creativity</option>
                        <option>Time Management</option>
                        <option>Critical Thinking</option>
                        <option>Communication</option>
                        <option>Work Ethic</option>
                        <option>Teamwork</option>
                        <option>Global Awareness</option>
                        </select>
                        <select className="form-control" name="skills" value={this.state.skills2} onChange={this.handleInputChange.bind(this)} required>
                         <option disabled value>-- SELECT --</option>
                         <option>Leadership</option>
                        <option>Minedfulness</option>
                        <option>Creativity</option>
                        <option>Time Management</option>
                        <option>Critical Thinking</option>
                        <option>Communication</option>
                        <option>Work Ethic</option>
                        <option>Teamwork</option>
                        <option>Global Awareness</option>
                        </select>
                        <select className="form-control" name="skills" value={this.state.skills3} onChange={this.handleInputChange.bind(this)} required>
                         <option disabled value>-- SELECT --</option>
                         <option>Leadership</option>
                        <option>Minedfulness</option>
                        <option>Creativity</option>
                        <option>Time Management</option>
                        <option>Critical Thinking</option>
                        <option>Communication</option>
                        <option>Work Ethic</option>
                        <option>Teamwork</option>
                        <option>Global Awareness</option>
                        </select>
                        </div>
        
                    {/* <label htmlFor="skills">Top 3 Soft Skills (ctrl shift to select multiple)</label>
                        <select multiple class="form-control" id="skills" value={this.state.skills} onChange={this.handleInputChange.bind(this)} >
                        <option>Leadership</option>
                        <option>Minedfulness</option>
                        <option>Creativity</option>
                        <option>Time Management</option>
                        <option>Critical Thinking</option>
                        <option>Communication</option>
                        <option>Work Ethic</option>
                        <option>Teamwork</option>
                        <option>Global Awareness</option>
                        </select>
                </div> */}
                <button type="submit" className="btn btn-primary"> Submit Changes </button>
            </form>
        </div>
    );
        }
    }
}

export default updateStudentProfile; 