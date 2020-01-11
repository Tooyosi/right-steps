const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { httpLogger } = require('./loggers/httpLogger');
const { logger } = require('./loggers/logger');
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080',
  })
);

// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// };
// app.use(allowCrossDomain)
app.use(cookieParser());

// app.use(httpLogger);  
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const refferedUsers = require('./routes/referrals/reffered')
const referralLink = require('./routes/referrals/referral_link')
const adminRoutes = require('./routes/admin/admin')
const userRoutes = require('./routes/user/user')

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/members', refferedUsers);
app.use('/referral', referralLink);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.post('/logout', (req, res) => {

})
const models = require('./connections/sequelize');

// models.Members.findAll({ hierarchy: true}).then((result)=>{
//   console.log(result)
// })

app.listen(process.env.API_PORT, () => {
  logger.info(`Server listening on port ${process.env.API_PORT}`);
})