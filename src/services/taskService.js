/**
 * 描述：业务逻辑处理 - 任务相关接口
 * 作者：ruone
 * 日期： 2022-11-10
 */

import Boom from "boom";
import { validationResult } from "express-validator";
import { querySql } from "../db/index.js";
import { CODE_ERROR, CODE_SUCCESS } from "../utils/constant.js";

// 查询任务列表
async function queryTaskList(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(Boom.badRequest(msg));
  } else {
    const sql =
      "select t.id, t.title, t.content, t.status, t.isMajor, t.gmt_create, t.gmt_expire from task t";

    let taskListRes = await querySql(sql);
    // console.log(taskListRes);
    if (taskListRes.length != 0) {
      res.json({
        code: CODE_SUCCESS,
        msg: '成功',
        data: taskListRes
      })
    } else {
      res.json({
        code: CODE_ERROR,
        msg: '暂无数据',
        data: null
      }
      )
    }
  }
}

// 添加一条数据
async function addTask(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(Boom.badRequest(msg));
  } else {
    let {title, content, gmt_expire } = req.body
    const sql = 
      `insert into task (title, content, status, isMajor, gmt_expire) values ('${title}','${content}','0','0','${gmt_expire}')`;

    let taskListRes = await querySql(sql);
    if (taskListRes.aff != 0) {
      res.json({
        code: CODE_SUCCESS,
        msg: '插入成功',
        data: null
      })
    } else {
      res.json({
        code: CODE_ERROR,
        msg: '插入失败',
        data: null
      }
      )
    }
  }
}

// 删除一条数据
async function deleteTask(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(Boom.badRequest(msg));
  } else {
    let { id } = req.body
    const sql = `delete from task where id = '${id}'`
    let delRes = await querySql(sql)
    if(delRes.affectedRows == 0) {
      res.json({
        code: CODE_ERROR,
        msg: '没有此记录',
        data: null
      })
    } else {
      res.json({
        code: CODE_SUCCESS,
        msg: '删除成功',
        data: null
      })
    }
  }
}
export {
  queryTaskList,
  addTask,
  deleteTask
};
