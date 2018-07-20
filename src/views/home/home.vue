<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";


</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" src='../../images/ic-manager.png'/>
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">{{user}}</b>
                                            <p>{{role}}</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="24"><p class="notwrap">上次登录时间:{{" "+lastVisitTime}}</p></Col>

                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                        <infor-card
                                id-name="user_created_count"
                                :end-val="count.dayIncome"
                                iconType="social-yen"
                                color="#2d8cf0"
                                :decimals="decimals"
                                unit="元"
                                intro-text="今日收入"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                        <infor-card
                                id-name="visit_count"
                                :end-val="count.memberCount"
                                iconType="ios-people"
                                color="#64d572"
                                :decimals="decimalsCount"
                                unit="人"
                                :iconSize="50"
                                intro-text="会员人数"
                        ></infor-card>
                    </Col>

                </Row>
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                        <infor-card
                                id-name="collection_count"
                                :end-val="count.orderCount"
                                iconType="android-cart"
                                color="#f25e43"
                                :decimals="decimalsCount"
                                unit="个"
                                intro-text="今日订单数量"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                        <infor-card
                                id-name="transfer_count"
                                :end-val="count.transfer"
                                iconType="shuffle"
                                color="#f25e43"
                                intro-text="今日服务调用量"
                        ></infor-card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :md="24" :lg="24" :style="{marginBottom: '8px'}">
                <!--<img src="../../images/home-bg.jpg" class="homebg"/>-->
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="podium"></Icon>
                        月收入统计
                    </p>
                    <p slot="extra">
                        年份:
                        <DatePicker type="year" placement="bottom-end" :value="currentYear" :clearable="false" format="yyyy" @on-change="handleChange"
                                    :editable="false" placeholder="请选择年份" style="width: 200px"></DatePicker>
                    </p>
                    <div class="data-source-row">
                        <statisticsMonthOfYear :year-val='yearVal'></statisticsMonthOfYear>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import cityData from './map-data/get-city-value.js';
    import homeMap from './components/map.vue';
    import dataSourcePie from './components/dataSourcePie.vue';
    import userFlow from './components/userFlow.vue';
    import countUp from './components/countUp.vue';
    import inforCard from './components/inforCard.vue';
    import Cookies from 'js-cookie';

    import statisticsMonthOfYear from '../statistics/statisticsMonthOfYear.vue';

    import utils from '../../libs/util';
    import config from '../../libs/config';

    export default {
        name: 'home',
        components: {
            homeMap,
            dataSourcePie,
            userFlow,
            countUp,
            inforCard,
            statisticsMonthOfYear
        },
        data() {
            return {
                decimals: 2,
                decimalsCount: 0,
                todayYear: 2018,
                yearVal:2018,
                count: {
                    dayIncome: 0,
                    memberCount: 0,
                    orderCount: 0,
                    transfer: 395
                },
                cityData: cityData,
                showAddNewTodo: false,
                newToDoItemValue: ''
            };
        },
        computed: {

            user() {
                return Cookies.get('user');
            },
            role() {
                return Cookies.get('role');
            },
            lastVisitTime() {
                return Cookies.get('lastTime');
            },
            currentYear() {
                this.todayYear = new Date().format('yyyy');
                return this.todayYear;
            }
        },
        methods: {
            init() {
                let date = new Date().format("yyyy-MM-dd");
                let data = {
                    day: date
                };

                //获取今日收入统计
                this.Http.post(config.service.getStatisticsByDay, data).then((res) => {
                    if (res.data.code == 100) {
                        this.count.dayIncome = res.data.data.total;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });

                //获取会员数量
                this.Http.post(config.service.getMemberCount, data).then((res) => {
                    if (res.data.code == 100) {
                        this.count.memberCount = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });

                //获取今日订单
                this.Http.post(config.service.getStatisticsOrdersByDay, data).then((res) => {
                    if (res.data.code == 100) {
                        this.count.orderCount = res.data.data.length;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
                //
                // //获取历史消费订单信息
                // this.Http.post(config.service.getMyOrders, data).then((res) => {
                //     if (res.data.code == 100) {
                //         this.data = res.data.data;
                //     } else {
                //         this.$Message.error({
                //             content: '获取历史订单失败',
                //             duration: 2
                //         });
                //     }
                // });

            },
            handleChange(daterange) {
                this.yearVal = parseInt(daterange);
                this.$Message.error({
                    content: this.todayYear+"",
                    duration: 2
                });
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
