const Business_Profile = require('../models/businessprofiles.server.model.js');

exports.update = function(req, res) {
    Business_Profile.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error Adding Business Profile"});
            }else{
                res.send(result);
            }
        }
    );
};

exports.findOne = function(req, res) {
    Business_Profile.findById(req.params.id, function(err, result){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error Adding Business Profile"});
            }else{
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
        email: req.body.email,
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