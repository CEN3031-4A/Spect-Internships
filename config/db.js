const mongoose = require('mongoose');

const db = require('./config').db.uri;

const connectMongoose = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
	} catch (e) {
		console.error(e.message);
		process.exit(1);
	}
};

module.exports = connectMongoose;
