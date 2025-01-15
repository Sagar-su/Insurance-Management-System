const {dbConnection,sql,closeDbConnection} = require('../db_config/db');

const adminCheck = async(email)=>{
    try {
        await dbConnection();
        const result = await sql.query`SELECT * FROM admins WHERE email = ${email}`
        if(result.recordset.length>0){
            
            
            return result.recordset[0];

        }
        else {
            return false;
        }

    } catch (error) {
        return error;
    }
    finally{
        await closeDbConnection()
    }
}

module.exports = adminCheck 