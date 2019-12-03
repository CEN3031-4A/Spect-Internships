const Payment = require('../models/payment.model.js');

const stripe = require("stripe")(process.env.stripeSecret);


exports.charge = function(req, res){

    try {
        var payment = new Payment({
            amount: process.env.listingPrice
          });
        let {status} = stripe.charges.create({
          amount: process.env.listingPrice,
          currency: "usd",
          source: req.body.token
        });
        console.log("Created Charge");
        payment.save(function (err, result) {
            if(err){
                console.error(err);
            }else{
                res.send(result);
            }
          });
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }



    // var student_profile = new Student({
    //     name: req.body.name,
    //     address: req.body.address,
    //     userAccount: req.body.userAccount,
    //     email: req.body.email,
    //     description: req.body.description,
    //     removed: false
    // });

    // student_profile.save(function (err, result) {
    //     if(err){
    //         console.error(err);
    //         res.status(500).send({ message: "Error Adding Student Profile" })
    //     }else{
    //         res.send({ message: "Success", result });
    //     }
    // });

}