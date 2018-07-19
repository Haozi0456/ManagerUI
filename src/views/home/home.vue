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
                                :end-val="count.collection"
                                iconType="upload"
                                color="#ffd572"
                                intro-text="今日数据采集量"
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
            <Col :md="24" :lg="12" :style="{marginBottom: '8px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        上周每日来访量统计
                    </p>
                    <div class="data-source-row">

                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="12" :style="{marginBottom: '8px'}">
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        今日服务调用地理分布
                    </p>
                    <div class="map-con">
                        <Col span="10">
                            <map-data-table :cityData="cityData" height="281"
                                            :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                        </Col>
                        <Col span="14" class="map-incon">
                            <Row type="flex" justify="center" align="middle">
                                <home-map :city-data="cityData"></home-map>
                            </Row>
                        </Col>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">

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
    import utils from '../../libs/util';
    import config from '../../libs/config';

    export default {
        name: 'home',
        components: {
            homeMap,
            dataSourcePie,
            userFlow,
            countUp,
            inforCard
        },
        data() {
            return {
                decimals: 2,
                decimalsCount:0,
                count: {
                    dayIncome: 0,
                    memberCount: 0,
                    collection: 24389305,
                    transfer: 39503498
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
            }
        },
        methods: {
            init() {
                let date = new Date().format("yyyy-MM-dd");
                let data = {
                    day: date
                };
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

                // //获取账户信息
                // this.Http.post(config.service.getMyAccount, data).then((res) => {
                //     if (res.data.code == 100) {
                //         this.account = res.data.data;
                //         this.getRechargeList();
                //     } else {
                //         this.$Message.error({
                //             content: res.data.msg,
                //             duration: 2
                //         });
                //     }
                // });
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

            }
        },
        mounted() {
            this.init();
        }
    };
</script>
