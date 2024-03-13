/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AppModule from '@/store/app'
let appStore:AppModule
function initialiseStores(store: Store<any>): void {
  appStore = getModule(AppModule, store)
}
export { initialiseStores, appStore }


