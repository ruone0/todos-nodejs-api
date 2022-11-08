const PRIVATE_KEY = 'ruone' // 自定义jwt加密的私钥
const JWT_EXPIRED = 60 * 60 * 24 // 过期时间24小时
const CODE_ERROR = -1 // 请求响应失败code码
const CODE_SUCCESS = 0 // 请求响应成功code码
const CODE_TOKEN_EXPIRED =  401 // 授权失败
export {
  PRIVATE_KEY,
  JWT_EXPIRED,
  CODE_ERROR,
  CODE_SUCCESS,
  CODE_TOKEN_EXPIRED
}