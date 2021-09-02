// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { mac } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/admin',
    children: [
      // admin
      {
        path: '/admin',
        name: 'admin',
        component: RouteView,
        redirect: '/admin/dashboard',
        hidden: true
      },
      // dashboard
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard'),
        meta: { title: 'menu.dashboard', keepAlive: false, icon: 'dashboard', permission: [ 'admin' ] }
      },
      // settings
      {
        path: '/admin/setting',
        name: 'setting',
        component: () => import('@/views/setting/Index'),
        meta: { title: 'menu.setting', hideHeader: true, icon: 'setting' },
        redirect: '/admin/setting/site',
        hideChildrenInMenu: false,
        children: [
          {
            path: '/admin/setting/site',
            name: 'siteSetting',
            component: () => import('@/views/setting/Site'),
            meta: { title: 'menu.setting.site', hidden: true, icon: 'global', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/admin/setting/register',
            name: 'registerSetting',
            component: () => import('@/views/setting/Register'),
            meta: { title: 'menu.setting.register', hidden: true, icon: 'user-add', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/admin/setting/payment',
            name: 'paymentSetting',
            component: () => import('@/views/setting/Payment'),
            meta: { title: 'menu.setting.payment', hidden: true, icon: 'pay-circle', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/admin/setting/schedule',
            name: 'scheduleSetting',
            component: () => import('@/views/setting/Schedule'),
            meta: { title: 'menu.setting.schedule', hidden: true, icon: 'schedule', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/admin/setting/other',
            name: 'otherSetting',
            component: () => import('@/views/setting/Other'),
            meta: { title: 'menu.setting.other', hidden: true, icon: 'ellipsis', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/admin/setting/oauth',
            name: 'oauthSetting',
            component: () => import('@/views/setting/Oauth'),
            meta: { title: 'menu.setting.oauth', hidden: true, icon: 'login', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/admin/setting/client',
            name: 'clientSetting',
            component: () => import('@/views/setting/Client'),
            meta: { title: 'menu.setting.client', hidden: true, icon: 'appstore', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      },
      // manage
      {
        path: '/admin/manage',
        name: 'manage',
        component: () => import('@/views/manage/Index'),
        meta: { title: 'menu.manage', hideHeader: true, icon: 'control' },
        redirect: '/admin/manage/node',
        hideChildrenInMenu: false,
        children: [
          // nodes
          {
            path: '/admin/manage/node',
            name: 'node',
            component: () => import('@/views/node/Index'),
            meta: { title: 'menu.node', hideHeader: true, icon: 'cloud-server' },
            redirect: '/admin/manage/node/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/admin/manage/node/list',
                name: 'nodeList',
                component: () => import('@/views/node/List'),
                meta: { title: 'menu.node.list', hidden: true, keepAlive: false, permission: [ 'admin' ] }
              },
              {
                path: '/admin/manage/node/online/:type/:nodeId',
                name: 'nodeOnline',
                component: () => import('@/views/node/nodeOnline'),
                meta: { title: 'menu.node.online', hidden: true, keepAlive: false, permission: [ 'admin' ] }
              },
              {
                path: '/admin/manage/node/detect',
                name: 'detect',
                component: () => import('@/views/node/Detect'),
                meta: { title: 'menu.node.detect', hidden: true, keepAlive: true, permission: [ 'admin' ] }
              }
            ]
          },
          // user
          {
            path: '/admin/manage/user',
            name: 'userList',
            component: () => import('@/views/user/User'),
            meta: { title: 'menu.user', hidden: true, keepAlive: false, icon: 'team', permission: [ 'admin' ] }
          },
          // user detail
          {
            path: '/admin/manage/user/:id',
            name: 'userDetail',
            component: () => import('@/views/user/Detail'),
            hidden: true,
            meta: { title: 'menu.user.detail', hidden: true, keepAlive: false, permission: [ 'admin' ] }
          },
          {
            path: '/admin/manage/plan',
            name: 'planList',
            component: () => import('@/views/plan/Plan'),
            meta: { title: 'menu.plan', keepAlive: false, icon: 'shopping-cart', permission: [ 'admin' ] }
          },
          // ticket
          {
            path: '/admin/manage/ticket',
            name: 'ticket',
            redirect: '/admin/manage/ticket/index',
            component: RouteView,
            meta: { title: 'menu.ticket', keepAlive: false, icon: 'highlight', permission: [ 'admin' ] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/admin/manage/ticket/index',
                name: 'ticketIndex',
                component: () => import('@/views/ticket/Ticket'),
                meta: { title: 'menu.ticket', keepAlive: false, icon: 'highlight', permission: [ 'admin' ] }
              },
              {
                path: '/admin/manage/ticket/detail/:id',
                name: 'ticketDetail',
                component: () => import('@/views/ticket/Detail'),
                meta: { hidden: true, keepAlive: false, permission: [ 'admin' ] }
              }
            ]
          },
          {
            path: '/admin/manage/tutorial',
            name: 'tutorial',
            component: () => import('@/views/tutorial/Tutorial'),
            meta: { title: 'menu.tutorial', keepAlive: false, icon: 'profile', permission: [ 'admin' ] }
          },
          {
            path: '/admin/manage/announcement',
            name: 'announcement',
            component: () => import('@/views/announcement/Announcement'),
            meta: { title: 'menu.announcement', keepAlive: false, icon: 'notification', permission: [ 'admin' ] }
          },
          {
            path: '/admin/manage/withdrawal',
            name: 'withdrawal',
            component: () => import('@/views/withdrawal/Withdrawal'),
            meta: { title: 'menu.withdrawal', icon: 'transaction', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      },
      // funds
      {
        path: '/admin/funds',
        name: 'funds',
        component: () => import('@/views/setting/Index'),
        meta: { title: 'menu.funds', hideHeader: true, icon: 'account-book' },
        redirect: '/admin/funds/order',
        hideChildrenInMenu: false,
        children: [
          {
            path: '/admin/funds/order',
            name: 'order',
            component: () => import('@/views/order/Order'),
            meta: { title: 'menu.order', keepAlive: false, icon: 'file-text', permission: [ 'admin' ] }
          },
          {
            path: '/admin/funds/order/detail/:orderId',
            name: 'orderDetail',
            hidden: true,
            component: () => import('@/views/order/Detail'),
            meta: { title: 'menu.order.detail', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/admin/funds/package',
            name: 'package',
            component: () => import('@/views/package/Package'),
            meta: { title: 'menu.package', keepAlive: false, icon: 'file-excel', permission: [ 'admin' ] }
          },
          {
            path: '/admin/funds/commission',
            name: 'commission',
            component: () => import('@/views/commission/Commission'),
            meta: { title: 'menu.commission', icon: 'solution', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/admin/auth',
    component: UserLayout,
    redirect: '/admin/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/auth/Login')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
