//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
    db: {
        uri: 'mongodb+srv://spectadmin:KgiirezWvrO71Kjg@cluster0-d6ogu.mongodb.net/test?retryWrites=true&w=majority', //place the URI of your mongo database here.
    },
    JSONSecret: 'InternshipSecret',
    listingPrice: 2000,
    stripeSecret: 'sk_test_fvB9yDb4y9PIGQxsf1e2k2Al'
};
