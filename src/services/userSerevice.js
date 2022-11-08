import { validationResult } from "express-validator";
import boom from "boom";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY, JWT_EXPIRED, CODE_ERROR } from "../utils/constant.js";
import { queryOne } from "../db/index.js";

async function login(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    let { username, password } = req.body;

    const query = `select * from user where username='${username}' and password='${password}'`;
    let user = await queryOne(query);
    if (!user || user.length === 0) {
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

export { login };
