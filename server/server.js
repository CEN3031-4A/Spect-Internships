// const express = require('./config/express.js');
const express = require('express');
const connectMongoose = require('./config/db.js');
const app = express();

app.use(express.json({ extended: false }));
app.get('/', (req, res) => {
	res.send('api running');
});
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Use env port or default
const port = process.env.PORT || 5000;

// const app = express.init();

app.listen(port, () => console.log(`Server now running on port ${port}!`));
