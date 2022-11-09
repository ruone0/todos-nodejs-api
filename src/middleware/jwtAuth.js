/**
 * 描述: jwt-token验证和解析函数
 * 作者: ruone
 * 日期: 2020-11-08
*/
import jwt from "jsonwebtoken"
import {expressjwt} from "express-jwt";
import { PRIVATE_KEY } from "../utils/constant.js";

// 验证token是否过期
const jwtAuth = expressjwt({
  // 设置密钥
  secret: PRIVATE_KEY,
  // 设置为true表示校验，false表示不校验
  credentialsRequired: true,
  // 自定义获取token的函数
  getToken: (req) => {
    if (req.headers.authorization) {
      return req.headers.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
  },
  algorithms: ["HS256"]
}).unless({
  path: ["/", "/api/user/login", "/api/user/register", "/api/resetPwd"],
});

// jwt-token解析
function decode(req) {
  const token = req.get('Authorization')
  return jwt.verify(token, PRIVATE_KEY);
}

export { jwtAuth, decode };
