export default {
  // Login Form
  login: {
    title: 'This Page Requires Authorization',
    description: 'We will use FIO token to identify your account. Please enter your FIO token to continue.',
    fioToken: 'FIO Token',
    networkError: 'A network error occurred. Please try again.',
    button: 'Authorize',
    loading: 'Loading...',
    privacy: 'We will never share your token with anyone else.',
    getToken: 'Get your FIO token'
  },
  
  // Group List Page
  groupList: {
    title: 'Groups List',
    welcome: 'Hi, {{username}}. This is a collaboration tool for viewing and managing contracts and plans with your group members. You can create a group on FIO. Create a token and set it here, then you can view the group\'s contracts and plans, and manage them together.',
    newGroup: 'New Group'
  },
  
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    view: 'View',
    create: 'Create',
    update: 'Update',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    first: 'First',
    last: 'Last',
    contact: 'contact me'
  },
  
  // UI Components
  ui: {
    sidebar: {
      dashboard: 'Dashboard',
      groups: 'Groups',
      productionLine: 'Production Line',
      shipment: 'Shipment',
      catalog: 'Catalog',
      catalogDescription: 'Browse all materials in the game and their details.',
      gallery: 'Gallery',
      plan: 'Plan',
      explorerTools: 'Explorer Tools',
      groupTools: 'Group Tools',
      groupMembers: 'Group Members',
      groupContracts: 'Group Contracts',
      priceWatch: 'Price Watch',
      groupPlan: 'Group Plan',
      groupList: 'Groups List'
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of'
    },
    sidebarFooter: {
      dataUpdated: 'Data updated:',
      dataSource: 'Data source:',
      fioApi: 'FIO API',
      feedbackWelcome: 'Feedback welcome!',
      prunCommunity: 'PrUn community tool #auroras-explorer',
      github: 'GitHub',
      loggedInAs: 'Logged in as',
      logout: 'Logout',
      na: 'N/A'
    }
  },
  
  // Error Page
  error: {
    title: 'Oops, something went wrong!',
    description: 'We\'re sorry, but something unexpected happened. Please try again later.'
  },
  
  // Not Found Page
  notFound: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.'
  },
  
  // Tool Gallery
  gallery: {
    title: 'Welcome to Auroras Explorer',
    description: 'Explore the collection of tools for Prosperous Universe. Use the links below to navigate to different tools and resources available in Auroras Explorer.',
    featuredTitle: 'Recommended Tools and Resources',
    featuredDescription: 'The following tools are not provided by us, but they are very important tools. We recommend you to use them.',
    suggestions: 'If you have any suggestions for tools to add to the gallery, please feel free to contact us. We are always looking for ways to improve Auroras Explorer and provide more value to the Prosperous Universe community.'
  },
  
  // Tools
  tools: {
    shipment: {
      title: 'Shipment',
      description: 'Calculate the best shipping plan for commodities between exchanges.',
      sourceCX: 'Source Commodity Exchange',
      targetCX: 'Target Commodity Exchange',
      weightCapacity: 'Weight Capacity',
      volumeCapacity: 'Volume Capacity',
      copyXIT: 'Copy XIT Operation',
      copied: 'Copied!',
      items: 'Items',
      table: {
        select: 'Select',
        material: 'Material',
        ask: 'Ask',
        bid: 'Bid',
        spread: 'Spread',
        amount: 'Amount',
        profit: 'Profit',
        cost: 'Cost',
        weightVolume: 'Weight / Volume',
        total: 'Total',
        noResults: 'No results.'
      }
    },
    productionLine: {
      title: 'Production Line',
      description: 'Visualize production lines and their dependencies.',
      commodityExchange: 'Commodity Exchange',
      material: 'Material',
      building: 'Building',
      selectBuilding: 'Select Building',
      back: 'Back',
      forward: 'Forward',
      profit: 'Profit',
      perDay: '/day',
      na: 'N/A',
      at: '@'
    },
    prunPlanner: {
      title: 'PRUNPlanner',
      description: 'PRUNplanner helps you design bases, organize your empire, and calculate profits — without wasting in-game resources. It mirrors nearly every aspect of Prosperous Universe, so you can plan more wisely and play with more confidence.'
    },
    fio: {
      title: 'FIO',
      description: 'Search for planets, find transport ads, check your consumables consumption, and more. Most importantly, empower you to control the game through browser extensions.'
    },
    pctWiki: {
      title: 'PCT Wiki',
      description: 'PCT Wiki is a community-driven mechanics wiki.'
    },
    categories: {
      explorerTools: 'Explorer Tools',
      externalTools: 'External Tools'
    }
  }
}