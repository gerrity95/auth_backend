const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db.config');
const dbConnection = db.connection;
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:8081',
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// simple route

app.use('/', authRouter.router);
app.use('/', userRouter.router);

app.get('/', (req, res) => {
  res.json({message: 'Welcome to Auth application.'});
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

