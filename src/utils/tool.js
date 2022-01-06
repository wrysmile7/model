// 数组交集
const intersection = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}
// 消息弹框
const messageBox = (_this, type, msg) => {
  _this.$message({
    message: msg,
    type: type
  })
}

export {
  intersection,
  messageBox
}
