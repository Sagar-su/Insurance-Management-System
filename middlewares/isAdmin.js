const isAdmin = (req,res,next)=>{
    const decodedData = req.data;
    const {role} = decodedData;
    if(role === 'Admin'){
        next();
    }
    else{
        res.status(401).send('Access Denied');
    }


}
module.exports = isAdmin