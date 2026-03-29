export default {
  // Login Form
  login: {
    title: '此页面需要授权',
    description: '我们将使用 FIO 令牌来识别您的账户。请输入您的 FIO 令牌以继续。',
    fioToken: 'FIO 令牌',
    networkError: '网络错误，请重试。',
    button: '授权',
    loading: '加载中...',
    privacy: '我们绝不会与任何人分享您的令牌。',
    getToken: '获取您的 FIO 令牌'
  },
  
  // Group List Page
  groupList: {
    title: '群组列表',
    welcome: '你好，{{username}}。这是一个协作工具，用于与群组成员一起查看和管理合同和计划。你可以在 FIO 上创建群组。创建令牌并在此处设置，然后你可以查看群组的合同和计划，并一起管理它们。',
    newGroup: '新建群组'
  },
  
  // Common
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    warning: '警告',
    info: '信息',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    remove: '移除',
    search: '搜索',
    filter: '筛选',
    sort: '排序',
    view: '查看',
    create: '创建',
    update: '更新',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    first: '第一页',
    last: '最后一页',
    contact: '联系我'
  },
  
  // UI Components
  ui: {
    sidebar: {
      dashboard: '仪表盘',
      groups: '群组',
      productionLine: '生产线',
      shipment: '运输',
      catalog: '目录',
      catalogDescription: '浏览游戏中的所有材料及其详细信息。',
      gallery: '画廊',
      plan: '计划',
      explorerTools: 'Explorer 工具',
      groupTools: '群组工具',
      groupMembers: '群组成员',
      groupContracts: '群组合约',
      priceWatch: '价格监控',
      groupPlan: '群组计划',
      groupList: '群组列表'
    },
    pagination: {
      previous: '上一页',
      next: '下一页',
      page: '页',
      of: '共'
    },
    sidebarFooter: {
      dataUpdated: '数据更新时间:',
      dataSource: '数据来源:',
      fioApi: 'FIO API',
      feedbackWelcome: '欢迎反馈！',
      prunCommunity: 'PrUn 社区工具 #auroras-explorer',
      github: 'GitHub',
      loggedInAs: '已登录为',
      logout: '退出登录',
      na: 'N/A'
    }
  },
  
  // Error Page
  error: {
    title: '糟糕，出了点问题！',
    description: '抱歉，发生了意外情况。请稍后再试。'
  },
  
  // Not Found Page
  notFound: {
    title: '页面未找到',
    description: '您正在寻找的页面不存在。'
  },
  
  // Tool Gallery
  gallery: {
    title: '欢迎使用 Auroras Explorer',
    description: '探索 Prosperous Universe 的工具集合。使用下面的链接导航到 Auroras Explorer 中可用的不同工具和资源。',
    featuredTitle: '推荐工具和资源',
    featuredDescription: '以下工具不是由我们提供的，但它们是非常重要的工具。我们推荐您使用它们。',
    suggestions: '如果您对添加到画廊的工具有任何建议，请随时与我们联系。我们一直在寻找方法来改进 Auroras Explorer 并为 Prosperous Universe 社区提供更多价值。'
  },
  
  // Tools
  tools: {
    shipment: {
      title: '运输',
      description: '计算交易所之间商品的最佳运输计划。',
      sourceCX: '源商品交易所',
      targetCX: '目标商品交易所',
      weightCapacity: '重量容量',
      volumeCapacity: '体积容量',
      copyXIT: '复制 XIT 操作',
      copied: '已复制！',
      items: '物品',
      table: {
        select: '选择',
        material: '材料',
        ask: '出价',
        bid: '竞价',
        spread: '差价',
        amount: '数量',
        profit: '利润',
        cost: '成本',
        weightVolume: '重量 / 体积',
        total: '总计',
        noResults: '无结果。'
      }
    },
    productionLine: {
      title: '生产线',
      description: '可视化生产线及其依赖关系。',
      commodityExchange: '商品交易所',
      material: '材料',
      building: '建筑',
      selectBuilding: '选择建筑',
      back: '后退',
      forward: '前进',
      profit: '利润',
      perDay: '/天',
      na: 'N/A',
      at: '@'
    },
    prunPlanner: {
      title: 'PRUNPlanner',
      description: 'PRUNplanner 帮助您设计基地、组织帝国并计算利润 — 无需浪费游戏内资源。它几乎反映了 Prosperous Universe 的每个方面，因此您可以更明智地计划并更自信地游戏。'
    },
    fio: {
      title: 'FIO',
      description: '搜索行星、查找运输广告、查看您的消耗品消耗情况等等。最重要的是，通过浏览器扩展使您能够控制游戏。'
    },
    pctWiki: {
      title: 'PCT Wiki',
      description: 'PCT Wiki 是一个社区驱动的机制百科。'
    },
    categories: {
      explorerTools: 'Explorer 工具',
      externalTools: '外部工具'
    }
  }
}