
var host = 'http://100.100.100.142:81';

// var host = 'https://mp.dogrun.com.cn';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        // 登录地址，用于建立会话
        loginUrl: 'system/manager/login',

        // 修改密码
        resetPassword: 'system/manager/resetPassword',

        //获取所有会员
        getAllMembers:'system/user/getAllUsers',

        //添加会员
        addMember:'system/user/toRegister',

        //获取会员详情
        getMemberInfo:'system/user/getUserById',

        //获取会员人数
        getMemberCount:'system/user/getMemberCount',

        //获取我的账户userId
        getMyAccount:'system/account/getMyAccount',

        //充值
        toRecharge:'system/account/toRecharge',

        //充值记录
        getRechargeList:'system/account/getRechargeList',

        //获取我的订单userId
        getMyOrders:'system/order/getMyOrders',

        //获取订单分页列表
        getOrderList:'system/order/getOrderList',

        //按月份获取订单分页列表
        getOrderListByMonth:'system/order/getOrderListByMonth',

        //添加订单
        addOrder:'system/order/addOrder',

        //根据日期查询订单
        getStatisticsOrdersByDay:'system/statistics/getStatisticsOrdersByDay',

        //统计年里每个月订单收入
        getStatisticsByMonthInYear:'system/statistics/getStatisticsByMonthInYear',

        //统计近30天每天订单收入
        getStatisticsByNearOneMonth:'system/statistics/getStatisticsByNearOneMonth',

        //统计年收入
        getStatisticsByYear:'system/statistics/getStatisticsByYear',

        //统计给定日期订单收入
        getStatisticsByDay:'system/statistics/getStatisticsByDay',

        //统计给定日期不同类型订单收入
        getStatisticsByDayWithType:'system/statistics/getStatisticsByDayWithType',


        //添加库存类型
        addStoreParts:'system/store/addStoreParts',

        //获取库存类型列表
        getStoreParts:'system/store/getStoreParts',

        //获取库存商品列表
        getGoodsList:'system/store/getGoodsList',

        //获取库存商品列表按类型
        getGoodsListByPartsId:'system/store/getGoodsListByPartsId',

        //添加库存商品
        addStoreGoods:'system/store/addStoreGoods',

        //添加维修工单记录
        addRepairRecord:'system/repair/addRepairRecord'
    }
};

export default config;
