import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';




class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.tryCharge = this.tryCharge.bind(this);
  }

  async tryCharge(ev) {
      ev.preventDefault();
    let {token} = await this.props.stripe.createToken({name: "Name"});

    axios.post(config.apiURL + "payments/charge", { token: token.id } ).then(success => {
        this.props.paymentComplete(success.data._id);
        toast.success("Successfully Charged Card");
    }).catch(error => {
        toast.error("Error Charging Card. Try Again.");
    });
  
  }

  render() {
    return (
      <div className="checkout">
        <CardElement />
        <button onClick={this.tryCharge}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);