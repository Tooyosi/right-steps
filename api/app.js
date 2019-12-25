const express = require('express')
const app = express()
const cors = require('cors');

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
      credentials: true,
      origin: '*',
    })
  );
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.listen(process.env.API_PORT, ()=>{
    console.log(`App is running on ${process.env.API_PORT}`)
})