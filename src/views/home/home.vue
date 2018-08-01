<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";


</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="24" :md="24" :lg="24">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <Col>
                                            <img class="avator-img" src='../../images/ic-manager.png'/>
                                        </Col>
                                        <Col>
                                            <div>
                                                <p class="welcome">你好, 欢迎登录:</p>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <b class="card-user-infor-name">{{user}}</b>
                                                <p>{{role}}</p>
                                            </div>
                                        </Col>

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
            <Col :md="24" :lg="24">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title">
                                <Icon type="social-windows"></Icon>
                                快捷菜单
                            </p>
                            <Row type="flex" :gutter="20">
                                <Col :style="{marginBottom: '10px', marginLeft:'10px', marginRight:'10px'}">
                                    <card-button iconType="cash"
                                                 intro-text="收银结算"
                                                 @click.native="toCollectMoney"
                                                 color="#2d8cf0"></card-button>
                                </Col>
                                <Col :style="{marginBottom: '10px', marginLeft:'10px', marginRight:'10px'}">
                                    <card-button iconType="android-person-add"
                                                 intro-text="会员办理"
                                                 @click.native="toAddMember"
                                                 color="#64d572"></card-button>
                                </Col>

                                <Col :style="{marginBottom: '10px', marginLeft:'10px', marginRight:'10px'}">
                                    <card-button iconType="android-cart"
                                                 intro-text="商品库存"
                                                 @click.native="toStore"
                                                 color="#f25e43"></card-button>
                                </Col>

                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="24">
                <Card>
                    <p slot="title">
                        <Icon type="podium"></Icon>
                        营业概况
                    </p>
                    <Row :gutter="10">
                        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                            <infor-card
                                    id-name="dayIncomed_count"
                                    :end-val="count.dayIncome"
                                    iconType="social-yen"
                                    color="#F78C68"
                                    :decimals="decimals"
                                    unit="元"
                                    intro-text="今日收入"
                            ></infor-card>
                        </Col>
                        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                            <infor-card
                                    id-name="outstanding_count"
                                    :end-val="count.outstanding"
                                    iconType="ios-compose"
                                    color="#ff9900"
                                    :decimals="decimals"
                                    unit="元"
                                    intro-text="挂单待结"
                            ></infor-card>
                        </Col>
                        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                            <infor-card
                                    id-name="memberCount_count"
                                    :end-val="count.memberCount"
                                    iconType="ios-people"
                                    color="#9A66E4"
                                    :decimals="decimalsCount"
                                    unit="人"
                                    :iconSize="50"
                                    intro-text="会员人数"
                            ></infor-card>
                        </Col>
                        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                            <infor-card
                                    id-name="orderCount_count"
                                    :end-val="count.orderCount"
                                    iconType="ios-paper"
                                    color="#E46CBB"
                                    :decimals="decimalsCount"
                                    unit="个"
                                    intro-text="今日订单数量"
                            ></infor-card>
                        </Col>

                    </Row>
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

    import cardButton from '../custom-component/cardButton.vue';


    import config from '../../libs/config';

    export default {
        name: 'home',
        components: {
            homeMap,
            dataSourcePie,
            userFlow,
            countUp,
            inforCard,
            cardButton
        },
        data() {
            return {
                decimals: 2,
                decimalsCount: 0,
                count: {
                    dayIncome: 0,
                    memberCount: 0,
                    orderCount: 0,
                    outstanding: 0.0
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
                    day: date,
                    status:1,
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

                let data2 = {
                    day: date,
                    status:0,
                };
                //获取挂单待结金额
                this.Http.post(config.service.getStatisticsByDay, data2).then((res) => {
                    if (res.data.code == 100) {
                        this.count.outstanding = res.data.data.total;
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
            toAddMember() { //添加会员
                this.$router.push({
                    name: 'member_add'
                });
            },
            toStore(){//商品库存
                this.$router.push({
                    name: 'storeGoods_index'
                });
            },
            toCollectMoney(){
                this.$router.push({
                    name: 'order-add'
                });
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
