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

export const hasBeenMoreTime = (lastConectionDate)=>{
    const dateNow = new Date()
    const diffMs = dateNow - lastConectionDate
    const diffDesc = 60 * 1000 // 1 minuto

    return diffMs > diffDesc
}