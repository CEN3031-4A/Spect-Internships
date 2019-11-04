const Internship = require('../models/internship.model.js');

exports.update = function(req, res) {
    Internship.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error Adding Internship"});
            }else{
                console.log(JSON.stringify(result));
                res.send(result);
            }
        }
    );
};

exports.list = function(req, res) {
    Internship.find().exec(function(err, results){
            if(err){
                console.error("Error");
                res.status(500).send({ message: "Error loading Internships"});
            }else{
                console.log("Result" + JSON.stringify(results));
                res.send(results);
            }
        }
    );
};

exports.add = function(req, res) {
    var internship = new Internship({
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        compensation: req.body.compensation,
        market: req.body.market,
        published: req.body.published,
        removed: false,
        applicationLink: req.body.applicationLink
    });

    internship.save(function (err, result) {
        if(err){
            console.error(err);
            res.status(500).send({ message: "Error Adding Internship" })
        }else{
            res.send({ message: "Success", result });
        }
    });
}