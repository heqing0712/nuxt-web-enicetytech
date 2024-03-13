import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
// import request from '@/service'
import Vue from 'vue'
import { ShopConfigs } from '@/types'
import { getWebConfig, getGoodsClassList, getLangList } from '@/service/api'
import { getLocale } from '@/utils'


@Module({ name: 'app', stateFactory: true, namespaced: true })

export default class AppModule extends VuexModule {
  count: number = 12
  time: string = String(new Date().getTime())
  locale = 'en'
  locales: Array<string> = ['en', 'zh', 'france', 'germany', 'portugal', 'russia', 'spain']
  goodsClassList: Array<any> = []
  langList: Array<any> = []
  webConfig: ShopConfigs = {
    title: '',
    name: '',
    logo: '',
    keyword: '',
    description: '',
    about: '',
    contact: '',
    video: '',
    email: '',
    mobile: '',
    tel: '',
    url: '',
    header: '',
    footer: '',
    notice: ''
  }

  @Mutation
  updateCount(v: number) {
    this.count = v
  }

  @Mutation
  updateWebConfig(v: ShopConfigs) {
    if (v) {
      this.webConfig = v
    }
  }

  @Mutation
  updateGoodsClassList(v: Array<any>) {
    this.goodsClassList = v
  }

  @Mutation
  SET_LANG(locale: string) {
    this.locale = locale
  }

  @Action({ commit: 'updateCount' })
  async addVisits() {
    return new Date().getTime()
  }

  @Action({ commit: 'updateWebConfig' })
  async getWebConfig() {
    const config = await getWebConfig().then(res => {
      return res.data
    })
    return config
  }

  @Action({ commit: 'updateGoodsClassList' })
  async getGoodsClassList() {
    const result = await getGoodsClassList().then(res => res.data)
    return result
  }

  @Action({ commit: 'updateLangList' })
  async getLangList() {
    const result = await getLangList().then(res => res.data)
    return result
  }

  /**
   * 服务端初始化网站数据
   */
  @Action
  async serverInit(server: { req: any; app: Vue }) {
    const { req } = server
    const host = req.headers.host
    let locale = getLocale(host)
    this.SET_LANG(locale)
    // await this.getWebConfig()
    // await this.getGoodsClassList()

  }


  @Action
  async clientInit() {

  }

}



