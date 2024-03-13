import $ from 'jquery'
import { loadScript } from '@/utils/index'
import { StaticConfig } from '@/config/app'
if (process.client) {
  window.jQuery = window.$ = $
}

export const initApp = async () => {
  await loadScript(StaticConfig.libs.libs)
}
