const express = require('express')
require('dotenv').config();
// const {usersTable,policiesTable,userPolicesTable,claimsTable} =
require('./db_config/dbTable') 
const registerUser = require('./routes/loginRoute')
const userRoute = require('./routes/usersRoute')
const policyRoute = require('./routes/policiesRoute')
const userPolicies = require('./routes/userPoliciesRoute')
const claimsRoute = require('./routes/claimsRoute')
const adminRoute = require('./routes/adminRoute')

const app = express();
const PORT = process.env.PORT || 1234
app.use(express.json())




app.use("/user",registerUser)
app.use('/users',userRoute)
app.use('/policies',policyRoute);
app.use('/userPolicies',userPolicies)
app.use('/claims',claimsRoute)
app.use('/adminLogin',adminRoute)
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
    
});