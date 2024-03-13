import request from '@/service'

/**
 * 获取网站配置
 * @param params
 */
export const getWebConfig = async (params = {}) => {
  return request.get('/api/web/config', {params})
}

/**
 * 获取焦点图列表
 * @param params
 */
export const getBannerList = async (params = {}) => {
  return request.get('/api/web/banner/list', {params})
}

/**
 * 获取语言配置列表
 * @param params
 */
 export const getLangList = async () => {
  return request.get('/api/web/lang/list')
}



/**
 * 获取内容列表
 * @param params
 */
export const getContentList = async (params = {}) => {
  return request.get('/api/web/content/list', {params})
}


/**
 * 获取首页模块列表
 * @param params
 */
export const getHomeList = async (params = {}) => {
  return request.get('/api/web/home/list', {params})
}

/**
 * 获取内容列表
 * @param params
 */
export const getGoodsClassList = async (params = {}) => {
  return request.get('/api/web/goodsclass/list', {params})
}

/**
 * 获取FAQ列表
 * @param params
 */
 export const getFaqList = async (params = {}) => {
  return request.get('/api/web/faq/list', {params})
}

/**
 * 获取商品列表
 * @param params
 */
export const getGoodsList = async (params = {}) => {
  return request.get('/api/web/goods/list', {params})
}


/**
 * 获取案例列表
 * @param params
 */
export const getCaseList = async (params = {}) => {
  return request.get('/api/web/case/list', {params})
}


/**
 * 获取案例
 * @param params
 */
export const getCase = async (params = {}) => {
  return request.get('/api/web/case', {params})
}

/**
 * 获取案例
 * @param params
 */
export const getCasex = async (params = {}) => {
  return request.get('/api/web/casex', {params})
}


/**
 * 获取商品
 * @param params
 */
export const getGoods= async (params = {}) => {
  return request.get('/api/web/goods', {params})
}

/**
 * 获取商品
 * @param params
 */
export const getGoodsx= async (params = {}) => {
  return request.get('/api/web/goodsx', {params})
}


/**
 * 获取商品分类
 * @param params
 */
export const getGoodsClass = async (params = {}) => {
  return request.get('/api/web/goodsclass', {params})
}

/**
 * 获取案例分类
 * @param params
 */
export const getCaseClass = async (params = {}) => {
  return request.get('/api/web/caseclass', {params})
}


/**
 * 获取页面
 * @param params
 */
export const getPage = async (params = {}) => {
  return request.get('/api/web/page', {params})
}

/**
 * 添加
 */
export const addMessage = async (data = {}) => {
  return request.post('/api/web/message', data)
}


/**
 * 获取案例banner
 * @param params
 */
export const getCaseBanner = async (params = {}) => {
  return request.get('/api/web/case-banner', {params})
}

 /**
 * 获取商品banner
 * @param params
 */
export const getProductBanner = async (params = {}) => {
  return request.get('/api/web/product-banner', {params})
}
