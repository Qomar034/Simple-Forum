const { User, Topic, Message } = require('../models')

class Controller {
    static async getForum(req, res, next){
        try {
            let { title } = req.params
            let calledForum = await Topic.findOne({where : { title }, include: [Message]})
        } catch (error) {
            
        }
    }
}

module.exports = Controller

// static async getForum(req, res, next){
//     try {
        
//     } catch (error) {
        
//     }
// }