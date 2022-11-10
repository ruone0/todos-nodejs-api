import { Router } from "express";
import { body } from "express-validator";
import { queryTaskList, addTask } from '../services/taskService.js'
const taskRouter = Router()


const addTaskValidate = [
  body("title").notEmpty().withMessage("title为必须项")
]

taskRouter.get('/getTaskList', queryTaskList)

taskRouter.post('/addTask', addTaskValidate, addTask)

export { taskRouter }