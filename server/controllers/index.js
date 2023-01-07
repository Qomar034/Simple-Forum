const { User, Topic, Message } = require('../models')

class Controller {
    static async getForum(req, res, next){
        try {
            let { title } = req.params
            let calledForum = await Topic.findOne({where : { title }, include: [Message]})

            res.status(200).json(calledForum)
        } catch (error) {
            console.log(error);
        }
    }

    static async postTopic(req, res, next){
        try {
            let { title } = req.body
            let newForum = await Topic.create({title})

            res.status(200).json(newForum)
        } catch (error) {
            console.log(error);
        }
    }

    static async postMessage(req, res, next){
        try {
            let { title } = req.params
            let { id } = req.user.id
            let { text } = req.body

            let calledForum = await Topic.findOne({where: { title }})
            if (!calledForum) throw ({name: "UnknownForum"})

            let newMessage = await Message.create({TopicId: calledForum.id, UserId: id, text})
            res.status(200).json(newMessage)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller

// static async getForum(req, res, next){
//     try {
        
//     } catch (error) {
            // next(error)
//     }
// }