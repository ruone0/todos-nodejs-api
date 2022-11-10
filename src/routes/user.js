import { Router } from "express";
import { body } from "express-validator";
import { login, register } from '../services/userService.js'

// 登录/注册校验
const loginValidator = [
  body("username").isString().withMessage("用户名错误"),
  body("password").isString().withMessage("密码错误"),
];

const registerValidator = [
  body("username").isString().withMessage("用户名格式不对！"),
  body("password").isString().withMessage("密码格式不对！")
]

const userRouter = Router();

// 用户登录
userRouter.post("/user/login", loginValidator, login);

// 用户注册
userRouter.post("/user/register", registerValidator, register);

// test
userRouter.post("/user/test", (req, res) => {
  res.send('OK')
});


export { userRouter };
