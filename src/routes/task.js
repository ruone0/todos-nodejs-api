import { Router } from "express";
import { body } from "express-validator";
import { queryTaskList, addTask, deleteTask } from '../services/taskService.js'
const taskRouter = Router()


const addTaskValidate = [
  body("title").notEmpty().withMessage("title为必须项")
]

// 删除任务参数校验
const deleteTaskValidate = [
  body("id").notEmpty().withMessage("id为必须项")
]

taskRouter.get('/getTaskList', queryTaskList)

taskRouter.post('/addTask', addTaskValidate, addTask)

taskRouter.post('/deleteTask', deleteTaskValidate, deleteTask)


export { taskRouter }