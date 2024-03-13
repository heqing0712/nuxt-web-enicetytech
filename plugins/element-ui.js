import Vue from 'vue'
import   {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Button,
  Form,
  FormItem,
  MessageBox,
  Message,
  Notification,
  Tabs,
  TabPane,
  Collapse,
  CollapseItem
} from 'element-ui'



Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

