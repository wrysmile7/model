/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../router'
// import store from '@/store'
import { getToken, removeToken } from '../utils/auth.js'
import { Message } from 'element-ui'
import Vue from 'vue'

/**
 * 提示封装
 */
const tip = (msg, type = 'warning') => {
  Message({
    type: type,
    message: msg,
    duration: 3000,
    center: true
  })
}
/* 处理loading */
let loading
let loadingCount = 0

function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '加载中...',
    fullscreen: true,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.5)'
  })
}
function endLoading () {
  loading.close()
}

function showLoading () {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount++
}

function hideLoading () {
  if (loadingCount <= 0) {
    return
  }
  loadingCount--
  if (loadingCount === 0) {
    endLoading()
  }
}

/**
 * 跳转登录页
 */
const toLogin = () => {
  tip('验证失败，请重新登录', 'warning')
  // 清除数据
  // localStorage.removeItem('curUser')
  // localStorage.removeItem('userType')
  removeToken()
  // 清空vuex中的相关信息
  // store.dispatch('user/resetToken').then(() => {
  // 携带当前页面路由，以期在登录页面完成登录后返回当前页面
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
  // })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      // store.commit('loginExpress', null);
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    case 500:
      tip('服务器出错,请检查')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 12,
  withCredentials: true
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
// instance.interceptors.request.use(
//   config => {
//     showLoading()

//     // 登录流程控制中，根据本地是否存在token判断用户的登录情况
//     // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
//     // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
//     // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。

//     const token = getToken()
//     if (token) {
//       config.headers.Authorization = 'Bearer ' + token
//     }
//     return config
//   },
//   error => {
//     hideLoading()
//     return Promise.error(error)
//   }
// )

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    hideLoading()
    if (res.status === 200) {
      if (res.data.code === 403) {
        toLogin()
        return
      }
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    hideLoading()
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      console.log(response)
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明

      // 暂时替换成下面的消息弹窗提示
      // store.commit('changeNetwork', {network:false});
      tip('部分资源请求超时', 'info')
    }
  }
)

export default instance
