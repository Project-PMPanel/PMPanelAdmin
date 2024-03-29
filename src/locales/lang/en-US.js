import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}

const locale = {
  'layouts.usermenu.dialog.title': 'Message',
  'layouts.usermenu.dialog.content': 'Do you want to logout?',

  'message': '-',
  'setting.yes': 'Yes',
  'setting.no': 'No',
  'setting.confirm': 'Confirm',
  'setting.add': 'Add',
  'setting.cancel': 'Cancel',
  'setting.change': 'Change',
  'setting.submit': 'Submit',
  'setting.delete': 'Delete',
  'setting.deleteConfirm': 'delete?',
  'setting.money': 'CNY',
  'setting.select': 'Select',
  'setting.reset': 'Reset',
  'setting.save': 'Save',

  'login.info': 'Login by email & pass',
  'login.email': 'Email',
  'login.emailMessage': 'Please input email',
  'login.password': 'Password',
  'login.passwordMessage': 'Please input password',
  'login.rememberMe': 'Remember Me',
  'login.register': 'Register',
  'login.forgetPass': 'Forget Pass',
  'login.loginBtn': 'Login',
  'login.failed': 'Login failed',
  'login.successWelcome': 'Welcome',
  'login.successInfo': 'welcome back',
  'login.signInWith': 'Sign in with',

  'register.title': 'Register',
  'register.email': 'Email',

  'forgot.title': 'Find pass',
  'forgot.email': 'Email',
  'forgot.emailMessage': 'Please input email address',
  'forgot.checkCode': 'CheckCode',
  'forgot.checkCodeMessage': 'Please input the checkCode',
  'forgot.getCheckCode': 'Get Code',
  'forgot.passwordStrength': 'Strength',
  'forgot.passwordStrengthMessage': 'At least 6 characters,do not use simple pass',
  'forgot.password': 'Password',
  'forgot.passwordMessage': 'At least 6 characters,case sensitive',
  'forgot.forgotBtn': 'Submit',
  'forgot.success': 'Update successfully',

  'menu.home': 'Home',
  'menu.usercenter': 'User Center',
  'menu.logout': 'Logout',
  'menu.dashboard': 'Dashboard',
  'menu.setting': 'Settings',
  'menu.setting.site': 'Website ⭐',
  'menu.setting.register': 'Register ⭐',
  'menu.setting.payment': 'Payment ⭐',
  'menu.setting.schedule': 'Schedule ⭐',
  'menu.setting.other': 'Other',
  'menu.setting.oauth': 'Oauth',
  'menu.setting.client': 'Client',
  'menu.manage': 'Manage',
  'menu.node': 'Nodes',
  'menu.node.list': 'Nodes',
  'menu.node.list.ss': 'ss',
  'menu.node.list.v2ray': 'v2ray',
  'menu.node.list.trojan': 'trojan',
  'menu.node.online': 'Online',
  'menu.node.detect': 'Detect',
  'menu.user': 'Users',
  'menu.user.detail': 'Detail',
  'menu.plan': 'Plan',
  'menu.ticket': 'Ticket',
  'menu.tutorial': 'Tutorials',
  'menu.announcement': 'Announcement',
  'menu.order': 'Order',
  'menu.order.detail': 'Details',
  'menu.package': 'Traffic',
  'menu.commission': 'Commission',
  'menu.withdrawal': 'Withdrawal',
  'menu.funds': 'Funds',

  'dashboard.info.todo': 'Todo',
  'dashboard.info.ticket': 'Ticket',
  'dashboard.info.withdraw': 'Withdraw',
  'dashboard.info.node': 'Node',
  'dashboard.info.nodeCount': 'Count',
  'dashboard.info.offlineCount': 'Offline',
  'dashboard.info.user': 'User',
  'dashboard.info.userCount': 'Count',
  'dashboard.info.monthRegisterCount': 'Month',
  'dashboard.info.todayRegisterCount': 'Today',
  'dashboard.info.income': 'Income',
  'dashboard.info.monthIncome': 'Month',
  'dashboard.info.todayIncome': 'Today',
  'dashboard.info.todayOrderCount': 'Today Paid Count',
  'dashboard.info.monthPaidUserCount': 'This Month Paid Count',
  'dashboard.info.incomeDetails': 'Income Details',
  'dashboard.cache.clean': 'Clean Cache',
  'dashboard.notify.renew': 'Notify Renew',

  'settings.site.siteName': 'Site Name',
  'settings.site.siteUrl': 'Site Url',
  'settings.site.subUrl': 'Subscribe Url',
  'settings.site.regEnable': 'Register',
  'settings.site.inviteOnly': 'Invite Only',
  'settings.site.mailRegEnable': 'Mail CheckCode',
  'settings.site.mailLimit': 'Mail Limit',
  'settings.site.mailType': 'CheckCode Mail Type',
  'settings.site.mailConfig': 'CheckCode Mail Config',
  'settings.site.notifyMailType': 'Notify Mail Type',
  'settings.site.notifyMailConfig': 'Notify Mail Config',
  'settings.site.enableNotifyRenew': 'Send RenewMail at 28 of every month',

  'settings.register.enableEmailSuffix': 'Enable register email suffix [@a.com;@b.com]',
  'settings.register.userPortRange': 'User port range',
  'settings.register.inviteCount': 'Default invite count',
  'settings.register.inviteRate': 'Default invite rate [0.00, 1.00]',
  'settings.register.enableWithdraw': 'Enable withdraw',
  'settings.register.minWithdraw': 'Min withdraw amount',
  'settings.register.withdrawRate': 'Withdraw rate [0.00, 1.00]',

  'settings.payment.alipay': 'alipay',
  'settings.payment.alipay.close': 'close',
  'settings.payment.alipay.alipay': 'alipay',
  'settings.payment.alipayConfig': 'Alipay config',
  'settings.payment.alipay.alipay.alipayConfig.isCertMode': 'PublicKeyMode/CertMode',
  'settings.payment.alipay.alipay.alipayConfig.web': 'Enable PC',
  'settings.payment.alipay.alipay.alipayConfig.wap': 'Enable H5',
  'settings.payment.alipay.alipay.alipayConfig.f2f': 'Enable F2F',
  'settings.payment.stripeConfig': 'Stripe config',
  'settings.payment.alipay.alipay.stripeConfig.currency': 'currency',
  'settings.payment.alipay.alipay.stripeConfig.sk_live': 'sk_live',
  'settings.payment.alipay.alipay.stripeConfig.webhook_secret': 'webhook_secret',
  'settings.payment.wxpay': 'wxpay',

  'settings.other.trafficSaveDays': 'User traffic logs days',
  'settings.other.notifyInfo': 'Notify',
  'settings.other.notifyInfoRule': 'type(success,info,warning,error)-title-content',

  'settings.oauth.enable': 'Enable',
  'settings.oauth.google.enable': 'Google',
  'settings.oauth.google.id': 'Id',
  'settings.oauth.google.secret': 'Secret',
  'settings.oauth.google.redirectUri': 'RedirectUri',

  'node.list.addNode': 'Add a node',
  'node.list.editNode': 'Edit the node',
  'node.list.name': 'Name',
  'node.list.server': 'Server',
  'node.list.method': 'Method',
  'node.list.outPort': 'Port',
  'node.list.grpc': 'GRPC',
  'node.list.alterId': 'AlterId',
  'node.list.network': 'Network',
  'node.list.security': 'Security',
  'node.list.host': 'Host',
  'node.list.path': 'Path',
  'node.list.subServer': 'SubServer',
  'node.list.subPort': 'SubPort',
  'node.list.sni': 'Sni',
  'node.list.trafficRate': 'TrafficRate',
  'node.list.class': 'Class',
  'node.list.speedlimit': 'SpeedLimit',
  'node.list.sort': 'Sort',
  'node.list.flag': 'Enable',
  'node.list.connector': 'OnlineCountLimit',
  'node.list.bandwidth': 'Bandwidth',
  'node.list.heartbeat': 'Status',
  'node.list.online': 'Online',
  'node.list.nodeIp': 'NodeIP',
  'node.list.muOnly': 'muOnly',
  'node.list.operation': 'Operation',
  'node.online.userId': 'UserId',
  'node.online.ip': 'IP',
  'node.online.time': 'Time',
  'node.online.country': 'Country',
  'node.online.region': 'Region',
  'node.online.city': 'City',
  'node.online.isp': 'ISP',

  'detect.list.name': 'Name',
  'detect.list.regex': 'Regex',
  'detect.list.type': 'Type',
  'detect.list.addDetect': 'Add a detect',
  'detect.list.editDetect': 'Update the detect',
  'detect.list.operation': 'Operation',
  'detect.list.nodeWithDetects': 'Node with specific detects',
  'detect.list.nodeName': 'Name',
  'detect.list.detects': 'Detects',
  'detect.list.oneNode': 'Please select a node',
  'detect.list.manyDetects': 'Please select some detects',

  'user.list.email': 'Email',
  'user.list.group': 'Group',
  'user.list.clazz': 'Class',
  'user.list.expire': 'Expiration',
  'user.list.role': 'Role',
  'user.list.role.user': 'User',
  'user.list.role.customerService': 'CustomerService',
  'user.list.role.admin': 'Admin',
  'user.list.status': 'Status',
  'user.list.status.enable': 'Enable',
  'user.list.status.disable': 'Disable',
  'user.list.money': 'Money',
  'user.list.detail': 'Detail',
  'user.list.delete': 'Delete',

  'user.detail.email': 'Email',
  'user.detail.password': 'Password',
  'user.detail.clazz': 'Class',
  'user.detail.expireIn': 'Expiration',
  'user.detail.money': 'Money',
  'user.detail.hasUsedGb': 'AllUsed',
  'user.detail.todayUsedGb': 'TodayUsed',
  'user.detail.transferEnableGb': 'TransferEnable/GB',
  'user.detail.inviteCount': 'InviteCount',
  'user.detail.inviteCycleEnable': 'InviteCyclable',
  'user.detail.inviteCycleRate': 'InviteCycleRate [0.00 ~ 1.00]',
  'user.detail.parentId': 'Inviter',
  'user.detail.nodeSpeedlimit': 'SpeedLimit/Mbps',
  'user.detail.nodeConnector': 'Online',
  'user.detail.nodeGroup': 'Group',
  'user.detail.isAdmin': 'Role',
  'user.detail.isAdmin.user': 'User',
  'user.detail.isAdmin.admin': 'Admin',
  'user.detail.isAdmin.customerService': 'CustomerService',
  'user.detail.enable': 'Enable',
  'user.detail.resetPasswd': 'ResetPasswd',

  'plan.list.name': 'Name',
  'plan.list.nameEnglish': 'EnglishName',
  'plan.list.price': 'Price',
  'plan.list.months': 'Months',
  'plan.list.transferEnable': 'TransferEnable/GB',
  'plan.list.package': 'Package/GB',
  'plan.list.clazz': 'Class',
  'plan.list.enable': 'Enable',
  'plan.list.add': 'Add a plan',
  'plan.list.nodeConnector': 'Online',
  'plan.list.nodeSpeedlimit': 'SpeedLimit',
  'plan.list.nodeGroup': 'NodeGroup',
  'plan.list.buyLimit': 'Stock',
  'plan.list.isDiscount': 'Discount',
  'plan.list.discountStart': 'DiscountStart',
  'plan.list.discountEnd': 'DiscountEnd',
  'plan.list.enableRenew': 'EnableRenew',
  'plan.list.sort': 'Sort',
  'plan.list.extraInfo': 'ExtraInfo',
  'plan.list.extraInfoEnglish': 'ExtraInfoEnglish',
  'plan.list.supportMedia': 'SupportMedia',
  'plan.list.supportDirectLine': 'SupportDirectLine',

  'ticket.userId': 'userId',
  'ticket.title': 'Title',
  'ticket.time': 'Time',
  'ticket.status': 'Status',
  'ticket.operation': 'Operation',
  'ticket.operation.delete': 'Delete',
  'ticket.operation.deleteConfirm': 'Confirm?',
  'ticket.status.0': 'Waiting',
  'ticket.status.1': 'Replied',
  'ticket.status.2': 'Finished',
  'ticket.detail': 'Detail',
  'ticket.detail.close': 'Close',

  'order.list.name': 'Name',
  'order.list.user': 'User',
  'order.list.relatedOrder': 'Related Order',
  'order.list.price': 'Price',
  'order.list.transferEnable': 'Traffic',
  'order.list.created': 'Creation',
  'order.list.expire': 'Expiration',
  'order.list.payTime': 'Payment',
  'order.list.operation': 'Operation',
  'order.list.operation.detail': 'Detail',
  'order.list.operation.confirm': 'Confirm',
  'order.list.operation.refund': 'Refund',
  'order.list.operation.cancel': 'Cancel',
  'plan.order.details.planName': 'Plan',
  'plan.order.details.orderId': 'Order ID',
  'plan.order.details.createdTime': 'Created Time',
  'plan.order.details.expire': 'Expiration',
  'plan.order.details.payPrice': 'Price',
  'plan.order.details.payStatus': 'Pay Status',
  'plan.order.details.planContent': 'Plan Content',
  'plan.order.details.userContent': 'User Details',
  'plan.order.details.userContent.email': 'Email',
  'plan.order.details.userContent.expire': 'Expiration',
  'plan.order.details.userContent.class': 'Class',
  'plan.order.details.userContent.nodeSpeedLimit': 'Speed Limit: ',
  'plan.order.details.userContent.nodeSpeedNoLimit': 'Speed Limit: No limit',
  'plan.order.details.userContent.connector': 'Connects: ',
  'plan.order.details.userContent.connectors': 'Connects: No limit',
  'plan.content.data': 'Flow/Month',
  'plan.content.currentMonthData': 'Current Month Data',
  'plan.content.class': 'Class',
  'plan.content.speedLimit': 'Speed Limit: ',
  'plan.content.speedNoLimit': 'Speed Limit: No limit',
  'plan.content.connector': 'Online: ',
  'plan.content.connectors': 'Online: No limit',

  'commission.list.inviterUser': 'Inviter',
  'commission.list.relatedOrder': 'RelatedOrder',
  'commission.list.commission': 'Commission',
  'commission.list.time': 'Time',

  'withdraw.list.user': 'User',
  'withdraw.list.account': 'Account',
  'withdraw.list.amount': 'Amount',
  'withdraw.list.realAmount': 'RealAmount',
  'withdraw.list.createTime': 'Time',
  'withdraw.list.status': 'Status',
  'withdraw.list.operation': 'Operation',
  'withdraw.list.operation.ack': 'Confirm',

  'app.setting.pagestyle': 'Page style setting',
  'app.setting.pagestyle.light': 'Light style',
  'app.setting.pagestyle.dark': 'Dark style',
  'app.setting.pagestyle.realdark': 'RealDark style',
  'app.setting.themecolor': 'Theme Color',
  'app.setting.navigationmode': 'Navigation Mode',
  'app.setting.content-width': 'Content Width',
  'app.setting.fixedheader': 'Fixed Header',
  'app.setting.fixedsidebar': 'Fixed Sidebar',
  'app.setting.sidemenu': 'Side Menu Layout',
  'app.setting.topmenu': 'Top Menu Layout',
  'app.setting.content-width.fixed': 'Fixed',
  'app.setting.content-width.fluid': 'Fluid',
  'app.setting.othersettings': 'Other Settings',
  'app.setting.weakmode': 'Weak Mode',
  'app.setting.copy': 'Copy Setting',
  'app.setting.loading': 'Loading theme',
  'app.setting.copyinfo': 'copy success，please replace defaultSettings in src/models/setting.js',
  'app.setting.production.hint': 'Setting panel shows in development environment only, please manually modify'
}

export default {
  ...components,
  ...locale
}
