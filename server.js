// const express = require('./config/express.js');
const express = require('express');
const connectMongoose = require('./config/db.js');
const app = express();
const path = require('path');
const cors = require('cors');

connectMongoose();

app.use(cors());
app.options('*', cors());
app.use(express.json({ extended: false }));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/', (req, res) => {
    res.send('api running');
})

// if (process.env.NODE_ENV === 'production' || true) {
// 	// Serve any static files
// 	app.use(express.static(path.join(__dirname, '../client/build')));

// 	// Handle React routing, return all requests to React app
// 	app.get('*', function(req, res) {
// 		res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// 	});
// }

// Use env port or default
const port = process.env.PORT || 5000;

// const app = express.init();

app.listen(port, () => console.log(`Server now running on port ${port}!`));
