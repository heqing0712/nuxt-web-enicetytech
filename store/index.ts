import Vue from 'vue'
import { ActionTree, Store } from 'vuex'
import { RootState } from '~/types/state'
import { initialiseStores, appStore } from '~/utils/store-accessor'

const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit(_context, server: { req: any; app: Vue }) {
    appStore.serverInit(server)
  },
  async nuxtClientInit(context) {
    await appStore.clientInit()
  }
}

export * from '~/utils/store-accessor'





