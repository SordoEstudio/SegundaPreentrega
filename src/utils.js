import bcrypt from 'bcrypt'


export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

export const isValidPassword = (password, user)=>{
    return bcrypt.compareSync(password, user.password)
}

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({data})
}