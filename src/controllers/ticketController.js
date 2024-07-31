
import * as ticketServices from '../services/ticketService.js';
import { createResponse } from '../utils.js';

export const purchase = async (req, res, next) =>{
    try{
    const user = req.user
    const ticket = await ticketServices.generateTicket(user)
if(!ticket)createResponse(res,404,'Ticket no generado')
    else createResponse(res,200,ticket)

    }catch(error){
        next(error);
    }
}