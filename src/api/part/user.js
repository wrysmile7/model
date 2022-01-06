import baseURL from '../base' // 导入接口地址
import service from '../http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

//  get数据 params接收
//  post数据 data接收
const user = {
  // 登录前服务器验证接口
  loginAccess (params) {
    return service({
      url: `${baseURL}/User/Access`,
      method: 'get',
      params
    })
  },
  // 登录接口
  login (data) {
    return service({
      url: `${baseURL}/User/login`,
      method: 'post',
      data
    })
  }
}

export default user
