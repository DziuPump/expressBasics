import jwt from 'jsonwebtoken';


const verifyUser = (req, res ,next) => {
    if (req.user.id === req.params.id || req.user.isAdmin){
        next();
    } else {
        res.status(406).send('you are not authorized')
    }
}

const verifyAdmin = (req, res,next) => {
    if (req.user.isAdmin){
        next();
    } else {
        res.status(406).send('you are not admin')
    }
}

export const verifySessionTokenUser = (req, res, next) =>{
    const token = req.cookies.session_token;

    if(!token){
        return res.status(401).send("not authorized!")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>{
        if (err){
            return res.status(404).send("not valid!")
        }
        req.user = decodedToken;
        verifyUser(req,res, next);
    })
}

export const verifySessionTokenAdmin = (req, res, next) =>{
    const token = req.cookies.session_token;

    if(!token){
        return res.status(401).send("not authorized!")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>{
        if (err){
            return res.status(404).send("not valid!")
        }
        req.user = decodedToken;
        verifyAdmin(req, res, next);
    })
}