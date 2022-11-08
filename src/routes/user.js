import { Router } from "express";
import { body } from "express-validator";
import { login } from '../services/userSerevice.js'

// 登录/注册校验
const loginVaildator = [
  body("username").isString().withMessage("用户名错误"),
  body("password").isString().withMessage("密码错误"),
];

const userRouter = Router();

userRouter.post("/user/login", loginVaildator, login);

userRouter.get("/user/register", (req, res) => {
  res.send("register");
});

userRouter.post("/user/test", (req, res) => {
  console.log(12345,req);
  res.send('OK')
});


export { userRouter };
