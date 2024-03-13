const cacheLoadScriptList: string[] = []
const cacheLoadCssList: string[] = []
/**
 * @description 异步加载  一段js放在 header
 * @param {object} url - js 的 url
 * @param {function} callback - 成功回调
 * @returns { promise<any>}} promise
 */
export function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    try {
      if (cacheLoadScriptList.includes(url)) {
        return resolve(0)
      } else {
        const script: any = document.createElement('script')
        script.type = 'text/javascript'
        if (script.readyState) {
          //IE
          script.onreadystatechange = function () {
            if (
              script.readyState == 'loaded' ||
              script.readyState == 'complete'
            ) {
              script.onreadystatechange = null
              cacheLoadScriptList.push(url)
              resolve(0)
            }
          }
        } else {
          //Others: Firefox, Safari, Chrome, and Opera
          script.onload = function () {
            cacheLoadScriptList.push(url)
            resolve(0)
          }
        }
        script.src = url
        document.body.appendChild(script)
      }
    } catch (e) {
      reject(e)
    }
  })
}


/**
 * @description 异步加载  css放在 header
 * @param {object} url - css的 url
 * @param {function} callback - 成功回调
 * @returns { promise<any>}} promise
 */
export function loadCss(url: string) {
  return new Promise((resolve, reject) => {
    try {
      if (cacheLoadCssList.includes(url)) {
        return resolve(0)
      } else {
        const link: any = document.createElement('link')
        link.rel = "stylesheet";
        link.type = "text/css";

        if (link.readyState) {
          //IE
          link.onreadystatechange = function () {
            if (
              link.readyState == 'loaded' ||
              link.readyState == 'complete'
            ) {
              link.onreadystatechange = null
              cacheLoadCssList.push(url)
              resolve(0)
            }
          }
        } else {
          //Others: Firefox, Safari, Chrome, and Opera
          link.onload = function () {
            cacheLoadCssList.push(url)
            resolve(0)
          }
        }
        link.href = url
        document.getElementsByTagName("head")[0].appendChild(link)
      }
    } catch (e) {
      reject(e)
    }
  })
}


/**
 * 邮件验证
 * @param {string} value
 */
export function isEmail(value: string): boolean {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)
}


export function getLocale(host: string) {

  let locale: string = 'en'
  if (host.includes('.')) {
    host = host.replace('www.', '')
    const hostA = host.split('.');
    if (hostA?.length === 3) {
      locale = hostA[0]
    }
  }

  return locale
}
