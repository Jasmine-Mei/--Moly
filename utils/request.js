/**
 * 封装一个异步的请求工具库
 * 基于  wx.request(ajax) 来实现axios的部分功能
 * 
 * 1.调用返回一个promise (以axios举例)
 * axios({
 * ...配置
 * }).then(res=>{}).catch(err=>{})
 * 
 * 2.配置基准路径
 * 
 * axios.defaults.baseURL ="路径"
 * 
 * 3.错误拦截
 * 
 * axios.onError =()=>{}
 */

/**
 * 主函数
 * @params
 * 参数|类型|默认值
 * config|Object|{}
 */

const request = (config = {}) => {

  // 用于判断开头有没有http，加上基准路径
  // 字符串正则方法search
  if (config.url.search(/^http/) === -1) {
    // 给链接加上基准路径
    config.url = request.defaults.baseURL + config.url;
  }


  // 返回一个promise
  // resolve是.then 里面的函数，一般请求成功时执行
  // reject 是 .catch里面的函数，一般用于请求失败时执行
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      // 成功时函数
      success(res) {
        resolve(res)
      },
      // 失败时函数
      fail(res) {
        reject(res)
      }
    })
  })
}

/**
 * request 的默认属性
 */
request.defaults = {
  // 基准路径
  baseURL: ""
}

/**
 * 错误监听函数集合
 */
request.errors = [];

/**
 * 错误拦截
 * @参数: 回调函数
 */
request.onError = (callback) => {
  request.errors.push(callback);
}

// 对外暴露
export default request;