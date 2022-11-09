/**
 * 描述: 封装md5方法
 * 作者: ruone
 * 日期: 2022/11/9
*/

import crypto from 'crypto'

export function md5(s) {
  return crypto.createHash('md5').update('' + s).digest('hex');
}