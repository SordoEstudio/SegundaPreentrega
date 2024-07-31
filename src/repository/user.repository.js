import {userDao} from "../daos/factory.js";


import userDTO from '../dtos/user.res.dto.js'

export default class UserRepository {
constructor(){
    this.dao=userDao
}

async getUserById(id){
    try {
        const user = await this.dao.getUserById(id)
        return new userDTO(user)
    } catch (error) {
        throw new Error(error)
    }
}
}