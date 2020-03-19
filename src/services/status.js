export const cs = (status) => status === 0;
const statusMessage = {
  '-1':
    '操作失败',
  0:
    '操作成功',
  1:
    '空值错误',
  2:
    '无效数据',
  3:
    '重复操作',
  4:
    '密码错误',
  5:
    '暂未登录',
  6:
    '结果为空',
  7:
    '暂无权限'
}
export const ol = (status) => statusMessage[status];
