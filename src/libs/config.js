
var host = 'http://100.100.100.142:81';

// var host = 'https://mp.dogrun.com.cn';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        // 登录地址，用于建立会话
        loginUrl: 'system/manager/login',

        //获取所有会员
        getAllMembers:'system/user/getAllUsers',

        //添加会员
        addMember:'system/user/toRegister',

        //获取会员详情
        getMemberInfo:'system/user/getUserById',

        //获取我的账户userId
        getMyAccount:'/system/account/getMyAccount',

        //充值
        toRecharge:'/system/account/toRecharge',

        //充值记录
        getRechargeList:'/system/account/getRechargeList',

        //获取我的订单userId
        getMyOrders:'/system/order/getMyOrders',

        //添加订单
        addOrder:'/system/order/addOrder',

        //统计年里每个月订单收入
        getStatisticsByMonthInYear:'/system/statistics/getStatisticsByMonthInYear',

        //统计年收入
        getStatisticsByYear:'/system/statistics/getStatisticsByYear',

        //统计给定日期订单收入
        getStatisticsByDay:'/system/statistics/getStatisticsByDay',

        //统计给定日期不同类型订单收入
        getStatisticsByDayWithType:'/system/statistics/getStatisticsByDayWithType'

    }
};

export default config;
