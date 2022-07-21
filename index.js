const express = require('express');
const routes = require('./src/routes/file.route');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const db = 'mongodb+srv://TImur:tim123@file-metadata.wkmnvnk.mongodb.net/file?retryWrites=true&w=majority';

mongoose
	.connect(db)
	.then(() => console.log('Connect to DB'))
	.catch(error => console.log(error));

app.use(routes);
  
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});