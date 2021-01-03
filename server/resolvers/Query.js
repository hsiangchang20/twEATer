import Message from "../models/message"

const Query = {
  async messages(parent, args, { db }, info){
    db = await Message.find()
    console.log(db)
    if (!args.query){
      return db
    }
    return db.filter(message => {
      return (message.sender.toLowerCase().includes(args.query.toLowerCase()) || message.receiver.toLowerCase().includes(args.query.toLowerCase()))
    })
  }
}

export { Query as default }
