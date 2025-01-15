const {dbConnection,sql,closeDbConnection} = require('./db');

const usersTable= async()=>{
    try{

        await dbConnection();
        
        const result = await sql.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'S_UsersTable';`
        
        if(result.recordset.length >0 ){
            
            
            console.log("S_Users Table already exist");
        }
        else{

            await sql.query`
                CREATE TABLE S_UsersTable (
                userId VARCHAR(50) PRIMARY KEY, 
                name VARCHAR(50) NOT NULL, 
                email VARCHAR(100) UNIQUE NOT NULL,
                passcode VARCHAR(100) NOT NULL,
                phone INT NOT NULL,
                age INT NOT NULL,
                income VARCHAR(50) NOT NULL,
                role VARCHAR(10) NOT NULL,
                );`

            console.log("Users Table created Successfully");
        }
        
    }
    catch(err){
        console.log("error:",err.message);
        
    }
   
}
const policiesTable= async()=>{
    try{

       await dbConnection();
        
        const result = await sql.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'S_PoliciesTable';`
        
        if(result.recordset.length >0 ){

            console.log("S_Policies Table already exist");
            
            
            
        }
        else{

            await sql.query `CREATE TABLE S_PoliciesTable (
                policyId VARCHAR(50)  PRIMARY KEY, 
                policy_name VARCHAR(50) NOT NULL, 
                premium INT NOT NULL,
                duration INT NOT NULL
                
                
            );`
            console.log("Policies Table created Successfully");
                
        }
        
    }
    catch(err){
        console.log("error:",err);
        
    }
}

const userPolicesTable = async()=>{
    try{

        await dbConnection();
         
         const result = await sql.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'S_UserPoliciesTable';`
         
         if(result.recordset.length >0 ){
 
             console.log("S_UserPolicies Table already exist");
             
             
             
         }
         else{
 
             await sql.query `CREATE TABLE S_UserPoliciesTable (
                UserPolicyId VARCHAR(50) PRIMARY KEY, 
                policyId VARCHAR(50) NOT NULL, 
                userId VARCHAR(50) NOT NULL,
                dateOfIssue DATE NOT NULL, 
                FOREIGN KEY (userId) REFERENCES wUsers(userId),
                FOREIGN KEY (policyId) REFERENCES wPolicies(policyId)  
            );`
             console.log("UserPolicies Table created Successfully");
                 
         }
         
     }
     catch(err){
         console.log("error:",err);
         
     }
     
}
const claimsTable = async()=>{
    try{

        await dbConnection();
         
         const result = await sql.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'S_ClaimsTable';`
         
         if(result.recordset.length >0 ){
 
             console.log("S_Claims Table already exist");
             
             
             
         }
         else{
 
             await sql.query `CREATE TABLE S_ClaimsTable (
                claimId VARCHAR(50) PRIMARY KEY, 
                UserPolicyId VARCHAR(50) UNIQUE NOT NULL,
                userId VARCHAR(50) NOT NULL,
                policyId VARCHAR(50) NOT NULL, 
                dateOfClaimRaised DATE NOT NULL, 
                status VARCHAR(50) NOT NULL,
                FOREIGN KEY (userId) REFERENCES wUsers(userId),
                FOREIGN KEY (policyId) REFERENCES wPolicies(policyId),
                FOREIGN KEY (UserPolicyId) REFERENCES wUserPolicies(UserPolicyId)  

            );`
             console.log("Claims Table created Successfully");
                 
         }
         
     }
     catch(err){
         console.log("error:",err);
         
     }
     finally{
 
         await closeDbConnection();
     }
}
usersTable()
policiesTable()
userPolicesTable()
claimsTable()
