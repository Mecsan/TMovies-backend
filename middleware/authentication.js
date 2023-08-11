 const jwt = require("jsonwebtoken");
 const autheticate = (req,res,next)=>{

    const encode = req.headers['authtoken'];
    
    if(encode){
        try{
            
            let token =jwt.verify(encode,process.env.JWT_SECRET);
            req.user = token;
            next();

        }catch(e){
            res.status(405).json({success:false,msg:e})
        }
    }else{
        res.status(405).json({success:false,msg:"unothorized access"});
    }
    
}
module.exports = autheticate;