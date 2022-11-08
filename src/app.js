/**
 * 描述: 入口文件
 * 作者: ruone
 * 日期: 2022-11-7
*/
import express from "express" // 引入express模块
import cors from "cors" // 引入cors模块
import bodyParse from 'body-parser' // 引入body-parser模块
import routes from "./routes/index.js" //导入自定义路由文件，创建模块化路由

const app = express()
app.use(bodyParse.json()) // 解析json数据格式
app.use(bodyParse.urlencoded({extended: false})) // 解析form表单提交的数据application/x-www-form-urlencoded
app.use(cors())  // 注入cors模块解决跨域

app.use('/', routes)

app.listen(8888, () => {
  console.log("服务启动成功:","http://localhost:8888");
})
