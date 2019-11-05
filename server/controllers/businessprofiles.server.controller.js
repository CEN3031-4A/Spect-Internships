const Business_Profile = require('../models/businessprofile.model.js');

exports.update = function(req, res) {
    Business_Profile.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error Adding Business Profile"});
            }else{
                console.log(JSON.stringify(result));
                res.send(result);
            }
        }
    );
};

exports.list = function(req, res) {
    Business_Profile.find().exec(function(err, results){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error loading Business Profiles"});
            }else{
                console.log("Result" + JSON.stringify(results));
                res.send(results);
            }
        }
    );
};

exports.add = function(req, res) {
    var business_profile = new Business_Profile({
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        website: req.body.website,
        useraccount: req.body.useraccount,
        removed: false          
    });

    business_profile.save(function (err, result) {
        if(err){
            console.error(err);
            res.status(500).send({ message: "Error Adding Business Profile" })
        }else{
            res.send({ message: "Success", result });
        }
    });
} 