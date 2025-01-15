const userSignupInput= (req,res,next)=>{
    try{
        const {name,email,password,age,income,phone} = req.body;
        if(name != '' && name != null && email != '' && email != null && password != '' && password != null && age != '' && age != null && income != '' && income != null && phone != '' && phone != null ){
            const regex= /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
            if(regex.test(email)){
                if(age>=0){
                    if(income>0){
                        next();
                    }
                    else{
                        res.status(400).send("income should be positive");
                    }
                }
                else{
                    res.status(400).send("age should be positive");
                }

            }
            else{
                res.status(400).send("Invalid email format");
            }
            

        }
        else{
            res.status(400).send("Invalid Data");
            
        }

    }
    catch(err){
        res.json(err.message);
        
    }
}


module.exports = {
    userSignupInput
}