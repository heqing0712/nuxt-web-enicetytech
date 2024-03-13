import axios from 'axios'
import qs from 'qs'
import config from './config'
import { appStore } from '@/store'

if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 7001}`
}
const service = axios.create(config)

// 不添加lang 参数的url
const unAddLangApis = [
  '/api/web/goods'
]

// POST 传参序列化
service.interceptors.request.use(
  config => {
    const lang = appStore.locale
    // console.log('lang:' + lang)
    if (config.method === 'post') {
      let data = qs.parse(config.data)
      config.data = qs.stringify({
        lang,
        ...data
      })
    } else if (config.method === 'get') {

      if (!unAddLangApis.includes(config.url)) {
        config.params = {
          lang,
          ...config.params
        }
      } else {
        config.params = {
          ...config.params
        }
      }

    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
