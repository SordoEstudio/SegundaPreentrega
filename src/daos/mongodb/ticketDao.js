import {TicketModel} from './models/ticketModel.js'

export default class TicketDao{
  constructor (){
    this.model = TicketModel
  }
    async create(obj) {
        try {
          return await this.model.create(obj);
        } catch (error) {
          throw new Error(error);
        }
      }
}