import type { App } from 'vue'
import {
  ConfigProvider,
  Layout,
  Button,
  Tooltip,
  Popover,
  Badge,
  Select,
  Drawer,
  Form,
  InputNumber,
  Table,
  Card,
  Space,
  Popconfirm,
  Collapse,
  Modal,
  Input,
  TreeSelect,
  Row,
  Col,
  Tag,
  FloatButton,
  Checkbox,
  Empty,
  Anchor,
} from 'ant-design-vue'
import {
  ShopOutlined,
  ExperimentOutlined,
  CalculatorOutlined,
  MonitorOutlined,
  BellOutlined,
  IdcardOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  GithubOutlined,
  CloseCircleFilled,
  FormOutlined,
  QuestionCircleOutlined,
  FunctionOutlined,
  CheckCircleOutlined,
  CompressOutlined,
} from '@ant-design/icons-vue'

import Icon from './Icon/index.vue'
import Action from './Action/index.vue'

export function setupSvg() {
  try {
    const requireContext: __WebpackModuleApi.RequireContext = require.context(
      '../assets/svg',
      false,
      /\.svg$/,
    )
    requireContext.keys().forEach(requireContext)
  } catch (error) {}
}

export function setupComponent(app: App) {
  setupSvg()
  setupAntIcon(app)
  setupGlobComp(app)
}

export function setupAntIcon(app: App) {
  app.component('ShopOutlined', ShopOutlined)
  app.component('ExperimentOutlined', ExperimentOutlined)
  app.component('CalculatorOutlined', CalculatorOutlined)
  app.component('MonitorOutlined', MonitorOutlined)
  app.component('BellOutlined', BellOutlined)
  app.component('IdcardOutlined', IdcardOutlined)
  app.component('ShoppingCartOutlined', ShoppingCartOutlined)
  app.component('HistoryOutlined', HistoryOutlined)
  app.component('GithubOutlined', GithubOutlined)
  app.component('CloseCircleFilled', CloseCircleFilled)
  app.component('FormOutlined', FormOutlined)
  app.component('QuestionCircleOutlined', QuestionCircleOutlined)
  app.component('FunctionOutlined', FunctionOutlined)
  app.component('CheckCircleOutlined', CheckCircleOutlined)
  app.component('CompressOutlined', CompressOutlined)
}

export function setupGlobComp(app: App) {
  app.use(ConfigProvider)
  app.use(Layout)
  app.use(Button)
  app.use(Tooltip)
  app.use(Popover)
  app.use(Badge)
  app.use(Select)
  app.use(Drawer)
  app.use(Form)
  app.use(InputNumber)
  app.use(Table)
  app.use(Card)
  app.use(Space)
  app.use(Popconfirm)
  app.use(Collapse)
  app.use(Modal)
  app.use(Input)
  app.use(TreeSelect)
  app.use(Row)
  app.use(Col)
  app.use(Tag)
  app.use(FloatButton)
  app.use(Checkbox)
  app.use(Empty)
  app.use(Anchor)

  app.component('Icon', Icon)
  app.component('Action', Action)
}
