const TaskModel = require('../model/TaskModel')


class TaskController {

    async create(req,res) {
        const task = new TaskModel(req.body);
        await task.save().
                    then(response => { res.status(201).json(response);}).
                    catch(error => {res.status(200).json(error);});
    }
}



module.exports = new TaskController();