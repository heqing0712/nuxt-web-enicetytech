import $ from 'jquery'
import { loadScript, loadCss } from '@/utils/index'
import { StaticConfig } from '@/config/app'
if (process.client) {
  window.jQuery = window.$ = $
}



export const setFormData =(form)=>{
  const $ipts = window.jQuery('#form-message input')
  $ipts.each(function () {
    const $that = $(this)
    const value = $that.val()
    const name = $that.attr('name')
    form[name] = value
  })
}

export default async () => {
  await loadScript(StaticConfig.libs.toucher)
  // await loadScript(StaticConfig.libs.aosJs)
  // await loadCss(StaticConfig.libs.aosCss)
  const $ceg = $('#carousel-example-generic')
  const myTouch = window.util.toucher($ceg.get(0))

  setTimeout(() => {

    // if (window.innerWidth > 1200) {
    //   AOS.init({
    //     easing: "ease-out-back",
    //     duration: 1000
    //   });
    // }

    $('.carousel').carousel({
      interval: 30000
    })
    myTouch
      .on('swipeLeft', function () {
        $('#carright').click()
      })
      .on('swipeRight', function () {
        $('#carleft').click()
      })

  }, 1000)


}


