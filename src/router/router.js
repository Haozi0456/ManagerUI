import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue')},
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () => import('@/views/own-space/own-space.vue')
        },
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'order-info',
            component: () => import('@/views/advanced-router/component/order-info.vue')
        }, // 用于展示动态路由
        {
            path: 'shopping',
            title: '购物详情',
            name: 'shopping',
            component: () => import('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
        {
            path: 'message',
            title: '消息中心',
            name: 'message_index',
            component: () => import('@/views/message/message.vue')
        },
        {
            path: 'member_details',
            title: '会员详情',
            name: 'member_details',
            component: () => import('@/views/memberManager/member-details.vue')
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/orderManager',
        icon: 'social-yen',
        name: 'statistics',
        title: '收银开单',
        component: Main,
        children: [
            {path: 'order_add', title: '快速收银', name: 'order-add', component: () => import('@/views/orderManager/order-add.vue')},
            {path: 'order-add-custom', title: '自定义收银', name: 'order-add-custom', component: () => import('@/views/orderManager/order-add-custom.vue')},
            {path: 'order_outstanding', title: '挂单待结', name: 'order_outstanding', component: () => import('@/views/orderManager/order-outstanding.vue')},
            {path: 'order_billing', title: '维修开单', name: 'order_billing', component: () => import('@/views/orderManager/order-billing.vue')}

        ]
    },
    {
        path: '/memberManager',
        icon: 'person-stalker',
        name: 'memberManager',
        title: '会员管理',
        component: Main,
        children: [
            {path: 'member_index', icon:'ios-person', title: '会员列表', name: 'member_index', component: () => import('@/views/memberManager/member.vue')},
            {path: 'member_add', icon:'android-person-add', title: '会员办理', name: 'member_add', component: () => import('@/views/memberManager/member-add.vue')}
        ]
    },
    {
        path: '/record',
        icon: 'navicon-round',
        name: 'record',
        title: '营业记录',
        component: Main,
        children: [
            {path: 'order_list', title: '订单记录', name: 'order_list', component: () => import('@/views/orderManager/order-list.vue')},
            {path: 'member-recharge-list', title: '会员充值记录', name: 'member-recharge-list', component: () => import('@/views/memberManager/member-recharge-list.vue')},
        ]
    },
    {
        path: '/income',
        icon: 'calendar',
        name: 'income',
        title: '收支管理',
        component: Main,
        children: [
            {path: 'inOut_list', title: '收支列表', name: 'inOut_list', component: () => import('@/views/incomeManager/inOut-list.vue')},
            {path: 'inOut_add', title: '添加收支', name: 'inOut_add', component: () => import('@/views/incomeManager/inOut-add.vue')}
        ]
    },
    {
        path: '/statisticsManager',
        icon: 'ios-pie',
        name: 'statisticsManager',
        title: '数据统计',
        component: Main,
        children: [
            {path: 'statistics_15days', title: '近15天收入', name: 'statistics_15days', component: () => import('@/views/statisticsManager/statistics_15days.vue')},
            // {path: 'statistics_30days', title: '近30天收入', name: 'statistics_30days', component: () => import('@/views/statisticsManager/statistics_30days.vue')},
            {path: 'statistics_index', title: '月度统计', name: 'statistics_index', component: () => import('@/views/statisticsManager/statistics.vue')}
        ]
    },
    {
        path: '/storeManager',
        icon: 'soup-can',
        name: 'storeManager',
        title: '商品库存',
        component: Main,
        children: [
            {path: 'store_goods', title: '商品列表', name: 'storeGoods_index', component: () => import('@/views/storeManager/StoreGoodsManager.vue')},
            {path: 'store_parts', title: '商品分类', name: 'storeParts_index', component: () => import('@/views/storeManager/StorePartsManager.vue')},
            {path: 'store_goods_record', title: '出入库记录', name: 'storeGoodsRecord_index', component: () => import('@/views/storeManager/StoreGoodsRecordManager.vue')},
        ]
    },
    {
        path: '/employeeManager',
        icon: 'android-person',
        name: 'employeeManager',
        title: '员工管理',
        component: Main,
        children: [
            {path: 'employee_list', title: '员工列表', name: 'employee_index', component: () => import('@/views/employeeManager/employeeList.vue')},
            {path: 'position_list', title: '职位管理', name: 'position_index', component: () => import('@/views/employeeManager/positionList.vue')}
        ]
    },
    {
        path: '/configManager',
        icon: 'android-settings',
        name: 'configManager',
        title: '配置管理',
        component: Main,
        children: [
            {path: 'config_server', title: '服务项目', name: 'configServer_index', component: () => import('@/views/configManager/serverConfig.vue')},
            {path: 'config_test', title: '测试配置', name: 'configTest_index', component: () => import('@/views/configManager/testConfig.vue')}
            ]
    }
    // ,
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         {path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue')}
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: '权限测试页',
    //             name: 'accesstest_index',
    //             access: 0,
    //             component: () => import('@/views/access/access-test.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: {i18n: 'international'},
    //             name: 'international_index',
    //             component: () => import('@/views/international/international.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'scroll-bar',
    //             icon: 'android-upload',
    //             name: 'scroll-bar',
    //             title: '滚动条',
    //             component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'artical-publish',
    //             title: '文章发布',
    //             name: 'artical-publish',
    //             icon: 'compose',
    //             component: () => import('@/views/form/article-publish/article-publish.vue')
    //         },
    //         {
    //             path: 'workflow',
    //             title: '工作流',
    //             name: 'workflow',
    //             icon: 'arrow-swap',
    //             component: () => import('@/views/form/work-flow/work-flow.vue')
    //         }
    //
    //     ]
    // },
    // // {
    // //     path: '/charts',
    // //     icon: 'ios-analytics',
    // //     name: 'charts',
    // //     title: '图表',
    // //     component: Main,
    // //     children: [
    // //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    // //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }
    //
    // //     ]
    // // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'dragableTable',
    //             title: '可拖拽排序',
    //             name: 'dragable-table',
    //             icon: 'arrow-move',
    //             component: () => import('@/views/tables/dragable-table.vue')
    //         },
    //         {
    //             path: 'editableTable',
    //             title: '可编辑表格',
    //             name: 'editable-table',
    //             icon: 'edit',
    //             component: () => import('@/views/tables/editable-table.vue')
    //         },
    //         {
    //             path: 'searchableTable',
    //             title: '可搜索表格',
    //             name: 'searchable-table',
    //             icon: 'search',
    //             component: () => import('@/views/tables/searchable-table.vue')
    //         },
    //         {
    //             path: 'exportableTable',
    //             title: '表格导出数据',
    //             name: 'exportable-table',
    //             icon: 'code-download',
    //             component: () => import('@/views/tables/exportable-table.vue')
    //         },
    //         {
    //             path: 'table2image',
    //             title: '表格转图片',
    //             name: 'table-to-image',
    //             icon: 'images',
    //             component: () => import('@/views/tables/table-to-image.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'mutative-router',
    //             title: '动态路由',
    //             name: 'mutative-router',
    //             icon: 'link',
    //             component: () => import('@/views/advanced-router/mutative-router.vue')
    //         },
    //         {
    //             path: 'argument-page',
    //             title: '带参页面',
    //             name: 'argument-page',
    //             icon: 'android-send',
    //             component: () => import('@/views/advanced-router/argument-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: '错误页面',
    //             name: 'errorpage_index',
    //             component: () => import('@/views/error-page/error-page.vue')
    //         }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
