import { validationResult } from "express-validator";
import boom from "boom";
import jwt from "jsonwebtoken";
import {
  PRIVATE_KEY,
  JWT_EXPIRED,
  CODE_ERROR,
  CODE_SUCCESS,
} from "../utils/constant.js";
import { querySql } from "../db/index.js";
import { md5 } from "../utils/md5.js";

// 登录
async function login(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    let { username, password } = req.body;
    password = md5(password)

    const query = `select * from user where username='${username}' and password='${password}'`;
    let user = await querySql(query);
    console.log(user);
    if (user.length === 0) {
      res.json({
        code: CODE_ERROR,
        msg: "用户名或密码错误",
        data: null,
      });
    } else {
      // 登录成功，签发一个token并返回给前端
      const token = jwt.sign(
        // payload：签发的 token 里面要包含的一些数据。
        { username },
        // 私钥
        PRIVATE_KEY,
        // 设置过期时间
        { expiresIn: JWT_EXPIRED }
      );
      res.send(token);
    }
  }
}

// 注册
async function register(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    let { username, password } = req.body;

    password = md5(password);
    // 检查用户是否存在
    const query = `select * from user where username='${username}'`;
    let user = await querySql(query);
    // console.log(user);
    if (user.length == 0) {
      const query = `insert into user(username, password) values('${username}','${password}')`;
      let insertRes = await querySql(query);
      if (insertRes.affectedRows === 1) {
        res.json({
          code: CODE_SUCCESS,
          msg: "注册成功",
          data: null,
        });
      } else {
        res.json({
          code: CODE_ERROR,
          msg: "注册失败",
          data: null,
        });
      }
    } else {
      res.json({
        code: CODE_ERROR,
        msg: "用户已存在",
        data: null,
      });
    }
    // const query = `insert into user{} values('${username}','${password}'`;
    // let user = await queryOne(query);
    // if (!user || user.length === 0) {
    //   res.json({
    //     code: CODE_ERROR,
    //     msg: "用户名或密码错误",
    //     data: null,
    //   });
    // } else {
    //   // 登录成功，签发一个token并返回给前端
    //   const token = jwt.sign(
    //     // payload：签发的 token 里面要包含的一些数据。
    //     { username },
    //     // 私钥
    //     PRIVATE_KEY,
    //     // 设置过期时间
    //     { expiresIn: JWT_EXPIRED }
    //   );
    //   res.send(token);
    // }
  }
}

export { login, register };
