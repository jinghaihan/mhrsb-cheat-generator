import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/item',
    name: 'item',
    component: () => import(/* webpackChunkName: "item" */ '../views/item/index.vue'),
    meta: {
      title: '杂货店',
      icon: 'ShopOutlined',
    },
  },
  {
    path: '/talisman',
    name: 'talisman',
    component: () => import(/* webpackChunkName: "talisman" */ '../views/talisman/index.vue'),
    meta: {
      title: '神秘炼金',
      icon: 'ExperimentOutlined',
    },
  },
  {
    path: '/qurious-crafting',
    name: 'qurious-crafting',
    component: () =>
      import(/* webpackChunkName: "qurious-crafting" */ '../views/qurious-crafting/index.vue'),
    meta: {
      title: '怪异炼成',
      icon: 'CalculatorOutlined',
    },
  },
  {
    path: '/anomaly-quest',
    name: 'anomaly-quest',
    component: () =>
      import(/* webpackChunkName: "anomaly-quest" */ '../views/anomaly-quest/index.vue'),
    meta: {
      title: '怪异调查任务',
      icon: 'MonitorOutlined',
    },
  },
  {
    path: '/buddy',
    name: 'buddy',
    component: () => import(/* webpackChunkName: "buddy" */ '../views/buddy/index.vue'),
    meta: {
      title: '随从看板',
      icon: 'BellOutlined',
    },
  },
  {
    path: '/guild-card',
    name: 'guild-card',
    component: () => import(/* webpackChunkName: "guild-card" */ '../views/guild-card/index.vue'),
    meta: {
      title: '公会卡片',
      icon: 'IdcardOutlined',
    },
  },
  {
    path: '/functional-list',
    name: 'functional-list',
    component: () =>
      import(/* webpackChunkName: "functional-list" */ '../views/functional-list/index.vue'),
    meta: {
      title: '功能列表',
      icon: 'FunctionOutlined',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/item',
  },
]
