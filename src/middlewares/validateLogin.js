export const validateLogin = (req, res, next)=>{
if(req.session.info && req.session.info.loggedIn)next()
    else res.status(401).send('No tienes permisos')
}
