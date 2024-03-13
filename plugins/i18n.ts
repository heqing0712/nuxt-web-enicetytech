import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $p: (s: string) => string;
  }
}

Vue.use(VueI18n)

const plugin: Plugin = ({ app, store }) => {
  const i18n = new VueI18n({
    locale: store.state.app.locale,
    fallbackLocale: 'en',
    messages: {
      en: require('../locales/en.json'),
      zh: require('../locales/zh.json'),
      france: require('../locales/france.json'),
      germany: require('../locales/germany.json'),
      portugal: require('../locales/portugal.json'),
      russia: require('../locales/russia.json'),
      spain: require('../locales/spain.json'),
    },
  })

  app.i18n = i18n;

  Vue.prototype.$p = (link: string) => {
    if(link.includes('view=preview')){
      let path = ''
      if (i18n.locale === i18n.fallbackLocale) {
        path = `${link}`
      } else {
        path = `/${i18n.locale}${link}`
      }
      return path
    }
    return link
  }
}

export default plugin
