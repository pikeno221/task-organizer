const TaskModel = require('../model/TaskModel');
const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } = require('date-fns');
const current = new Date();

class TaskController {

    async create(req, res) {
        const task = new TaskModel(req.body);
        await task.save()
            .then(response => { return res.status(201).json(response); })
            .catch(error => { return res.status(200).json(error); });
    }

    async update(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => { return res.status(200).json(response); })
            .catch(error => { return res.status(422).json(error); });
    }

    async findAll(req, res) {
        await TaskModel.find({ 'macaddress': { '$in': req.body.macaddress } })
            .sort('when')
            .then(response => { return res.status(200).json(response); })
            .catch(error => { return res.status(422).json(error); });
    }


    async findById(req, res) {
        await TaskModel.findById(req.params.id)
            .then(response => {
                if (response)
                    return res.status(200).json(response);
                else
                    return res.status(204).json(null);
            })
            .catch(error => { return res.status(422).json(error); });
    }


    async delete(req, res) {
        await TaskModel.deleteOne({ '_id': req.params.id })
            .then(respose => { return res.status(204).json(null) })
            .catch(error => { return res.status(422).json(error); });
    }

    async updateStatus(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, { 'done': req.header('status') }, { new: true })
            .then(response => { return res.status(200).json(response); })
            .catch(error => { return res.status(422).json(error); });
    }

    async findOverdue(req, res) {
        await TaskModel.find({ 'when': { '$lte': current }, 'macaddress': { '$in': req.header('macaddress') } })
            .sort('when')
            .then(response => { return res.status(200).json(response); })
            .catch(error => { return res.status(422).json(error); });
    }

    async findToday(req, res) {
        await TaskModel.find({
            'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) },
            'macaddress': { '$in': req.header('macaddress') }
        })
            .sort('when')
            .then(response => { return res.status(200).json(response); })
            .catch(error => { return res.status(422).json(error); });
    }

    async findWeek(req, res) {
        await TaskModel.find({
            'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) },
            'macaddress': { '$in': req.header('macaddress') }
        })
            .sort('when')
            .then(response => { return res.status(200).json(response); })
            .catch(error => { return res.status(422).json(error); });
    }

    async findMonth(req, res) {
        await TaskModel.find({
            'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) },
            'macaddress': { '$in': req.header('macaddress') }
        })
            .sort('when')
            .then(response => { return res.status(200).json(response); })
            .catch(error => { return res.status(422).json(error); })
    }

    async findYear(req, res) {
        await TaskModel.find({
            'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) },
            'macaddress': { '$in': req.body.macaddress }
        })
            .sort('when')
            .then(response => { return res.status(200).json(response); })
            .catch(error => { return res.status(422).json(error); });
    }


}



module.exports = new TaskController();