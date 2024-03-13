/**  跟应用全局相关的静态配置放在这里  */

const AppConfig = {
   baseUrl:'http://127.0.0.1:7001'
}
const StaticConfig = {
  MaxPageSize: 1000,
  IconfontURL: '//at.alicdn.com/t/font_2092412_rr3rb5vksd8.js',
  libs: {
    jquery: 'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js',
    toucher: '/static/libs/toucher.min.js',
    carousel: '/static/libs/carousel-all-min.js',
    libs: '/static/libs/libs.js',
    jdMarquee: '/static/libs/jdMarquee.js',
    zoom: '/static/libs/zoom.js',
    aosJs:  '/static/libs/aos.js',
    aosCss:'/static/libs/aos.css',
  }
}
export { AppConfig, StaticConfig }
