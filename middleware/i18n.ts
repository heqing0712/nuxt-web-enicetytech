
import {getLocale} from '@/utils/index'
export default function (context: any) {
  const { isHMR, app, store, route, params, error, redirect, req } = context
  const defaultLocale = app.i18n.fallbackLocale
  let locale: string = defaultLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) { return }

  if (process.server) {
    locale = getLocale(req.headers.host)
  }
  if (process.client) {
    locale = getLocale(window.location.host)
  }

  store.commit('app/SET_LANG', locale)
  app.i18n.locale = store.state.app.locale
  if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
    const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
    const re = new RegExp(toReplace)
    return redirect(
      route.fullPath.replace(re, '/')
    )
  }
}
