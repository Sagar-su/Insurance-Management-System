const sql= require('mssql')
require('dotenv').config({path: '../.env'});


const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.SERVER_IP,
  options: {
    encrypt: true,  
    trustServerCertificate: true,  // Set this to true to trust self-signed certificates
  }
};


const dbConnection=async()=>{
  try {
    
    await sql.connect(sqlConfig);
    console.log('Database connected successfully');
  } catch (err) {
    

    console.error('Error connecting to the database:', err.message);
  }
}
const closeDbConnection=async()=>{
    try {
      await sql.close();
      console.log('Database connection closed');
    } catch (err) {
      console.error('Error closing the database connection:', err.message);
    }
  }

module.exports= {
    dbConnection,
    sql,
    closeDbConnection
}