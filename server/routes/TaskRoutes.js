import express from 'express'
import Task from '../models/TaskModel.js'

const router = express.Router()

router.post('/add-task', async(req,res) => {
    console.log('req.body', req.body)
    const task = new Task(req.body.taskData)
    console.log(task)
    try{
        await task.save()
        res.status(201).json({
            status: 'Success',
            data : {
                task : task
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

router.get('/get-tasks', async(req,res) => {
    try{
        const task = await Task.find()
        res.status(200).json({
            status: 'Success',
            data : {
                task : task
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

router.put('/update-task/:id', async(req,res) => {
    console.log(req.body)
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log('x-task',task)
        res.status(200).json({
            status: 'Success',
            data : {
                task : task
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

router.delete('/delete-task/:id', async(req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'Success',
            data : {
                task : task
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

export default router




