
import { appStore } from '@/store'
export default async function ({ app}: any) {
  const {title,keyword,description} = appStore.webConfig
  app.head.title = title
  app.head.meta[2].content = keyword
  app.head.meta[3].content = description
}
