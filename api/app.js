const express = require('express')
const app = express()
const cors = require('cors');
const { httpLogger } = require('./loggers/httpLogger');
const { logger } = require('./loggers/logger');
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
      credentials: true,
      origin: '*',
    })
  );

// app.use(httpLogger);  
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const refferedUsers = require('./routes/referrals/reffered')
const referralLink = require('./routes/referrals/referral_link')

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/members', refferedUsers);
app.use('/referral', referralLink);
app.post('/logout', (req, res)=>{
  
})
app.listen(process.env.API_PORT, ()=>{
    logger.info(`Server listening on port ${process.env.API_PORT}`);
})