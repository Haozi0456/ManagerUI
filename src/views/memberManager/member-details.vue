<style lang="less">
    @import "./components/styles/member.less";
    @import "../../styles/common.less";

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }

    .recharge-box {
        height: 165px;
    }

    /*.infor-card-icon-con {*/
    /*height: 100%;*/
    /*}*/

    /*.height-100 {*/
    /*height: 100%;*/
    /*}*/

    /*.infor-card-con {*/
    /*height: 95px;*/
    /*}*/

    /*.infor-intro-text {*/
    /*font-size: 16px;*/
    /*font-weight: 500;*/
    /*color: #C8C8C8;*/
    /*}*/

</style>

<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="12">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-map"></Icon>
                                会员信息
                            </p>
                            <Row type="flex" align="middle" justify="start">
                                <Col :md="4" :lg="3"  :xs="4">
                                    <Col span="24" align="middle">
                                        <div style="align-items: center">
                                            <img class="member-avator-img" src="../../images/ic_member.png"/>
                                        </div>
                                    </Col>
                                </Col>
                                <Col :md="20" :lg="21" :xs="20" >
                                    <Row type="flex" align="middle" :gutter="8">
                                        <Col :lg="6" :md="6" :xs="12">
                                            <info-item
                                                    title="会员姓名:"
                                                    container-width="160px"
                                                    :text-lable="member.name"
                                                    text-color="#2d8cf0"></info-item>
                                        </Col >
                                        <Col :lg="6" :md="6" :xs="12">
                                            <info-item
                                                    title="会员号:"
                                                    container-width="160px"
                                                    :text-lable="member.phone"
                                                    text-color="#2d8cf0"></info-item>
                                        </Col>
                                        <Col :lg="6" :md="6" :xs="12">
                                            <info-item
                                                    title="车牌号码:"
                                                    container-width="160px"
                                                    :text-lable="member.carnum"
                                                    text-color="#2d8cf0"></info-item>
                                        </Col>
                                        <Col :lg="6" :md="6" :xs="12">
                                            <info-item
                                                    title="车辆品牌:"
                                                    container-width="160px"
                                                    :text-lable="member.carmake"
                                                    text-color="#2d8cf0"></info-item>
                                        </Col>
                                    </Row>
                                    <div class="line-gray"></div>
                                    <Row type="flex" align="middle" :gutter="8">
                                        <Col :lg="6" :md="6" :xs="12">
                                            <info-item
                                                    title="会员等级:"
                                                    container-width="160px"
                                                    text-lable="普通会员"
                                                    text-color="#2d8cf0"></info-item>
                                        </Col>
                                        <Col :lg="6" :md="6" :xs="12">
                                            <info-item
                                                    title="账户余额:"
                                                    container-width="160px"
                                                    :text-lable="account.money.toFixed(2)"
                                                    unit="元"
                                                    text-color="#2d8cf0"></info-item>
                                        </Col>
                                        <Col :lg="6" :md="6" :xs="12">
                                            <info-item
                                                    title="总消费金额:"
                                                    container-width="160px"
                                                    :text-lable="account.totalConsume.toFixed(2)"
                                                    unit="元"
                                                    text-color="#2d8cf0"></info-item>
                                        </Col>
                                        <Col :lg="6" :md="6" :xs="12">
                                            <info-item
                                                    title="入会时间:"
                                                    container-width="160px"
                                                    :text-lable="member.createtime"
                                                    text-color="#2d8cf0"></info-item>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="16"><p class="notwrap">上次光顾时间:{{" "+member.lastvisittime}}</p></Col>
                                <Col span="8" class="padding-left-8"></Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="12">
                <Row :gutter="5">
                    <Col :xs="24" :sm="24" :md="24" :style="{marginBottom: '5px'}">
                        <Card :padding="10">
                            <p slot="title" class="card-title">
                                <Icon type="map"></Icon>
                                充值记录
                            </p>
                            <a type="text" slot="extra" @click.prevent="isRechargeShow = true">
                                <Icon type="plus-round"></Icon>
                                充值
                            </a>
                            <div class="recharge-box">
                                <Row>
                                    <Table border stripe :columns="chargeColumns" :data="chargeData" height="165"></Table>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" >
            <Col :md="24" :lg="24" :style="{marginBottom: '8px'}">
                <Card :padding="10">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        历史消费记录
                    </p>
                    <!--<a type="text" slot="extra" @click.prevent="isShow = true">-->
                        <!--<Icon type="plus-round"></Icon>-->
                        <!--添加-->
                    <!--</a>-->
                    <Row class="searchable-table-con1">
                        <Table stripe :columns="columns" :data="data"></Table>
                    </Row>
                </Card>
            </Col>

        </Row>

        <Modal
                title="添加订单"
                v-model="isShow"
                :mask-closable="false"
                :closable="false"
                class-name="vertical-center-modal">
            <Form ref="orderItem" :model="orderItem" :label-width="80">
                <FormItem label="订单类型">
                    <Select v-model="orderItem.type" value="1" placeholder="请选择...">
                        <Option value="1">洗车</Option>
                        <Option value="2">维修</Option>
                        <Option value="3">其它</Option>
                    </Select>
                </FormItem>
                <FormItem label="支付方式">
                    <Select v-model="orderItem.payfrom" value="0" placeholder="请选择...">
                        <Option value="0">账户余额</Option>
                        <Option value="1">支付宝</Option>
                        <Option value="2">微信</Option>
                        <Option value="3">现金</Option>
                        <Option value="4">其它</Option>
                    </Select>
                </FormItem>


                <FormItem label="支付金额">
                    <InputNumber
                            :max="5000"
                            :min="0"
                            :step="5"
                            v-model="orderItem.money"></InputNumber>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="orderItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入备注信息..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                <Button type="primary" :loading="isLoading" @click="onOK">提交</Button>
            </div>
        </Modal>

        <Modal
                title="会员充值"
                v-model="isRechargeShow"
                :mask-closable="false"
                :closable="false"
                class-name="vertical-center-modal">
            <Form ref="rechargeForm" :model="rechargeForm" :label-width="80">
                <FormItem label="充值方式">
                    <Select v-model="rechargeForm.type" value="1" placeholder="请选择...">
                        <Option value="1">支付宝</Option>
                        <Option value="2">微信</Option>
                        <Option value="3">现金</Option>
                        <Option value="4">其它</Option>
                    </Select>
                </FormItem>


                <FormItem label="充值金额">
                    <InputNumber
                            :max="5000"
                            :min="0"
                            :step="5"
                            v-model="rechargeForm.money"></InputNumber>
                </FormItem>
                <FormItem label="赠送金额">
                <InputNumber
                    :max="5000"
                    :min="0"
                    :step="5"
                    v-model="rechargeForm.subMoney"></InputNumber>  <span style="margin-left: 5px; color:#9ea7b4; ">选填，不赠送即为0.</span>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="rechargeForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入备注信息..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                <Button type="primary" :loading="isLoading" @click="onRecharge">添加</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import config from '../../libs/config';
    import Cookies from 'js-cookie';
    import inforCard from './components/inforCard.vue';
    import infoItem from '../custom-component/infoItem.vue';

    export default {
        name: 'member-details',
        components: {
            inforCard,
            infoItem
        },
        props: {
            color: '#f25e43'

        },
        data () {
            return {
                userId: null,
                showInfo: false,
                decimals: 2,
                timedecimals: 0,
                count: {
                    createUser: 0,
                    visit: 0,
                    collection: 0,
                    transfer: 0
                },
                member: {
                    carnum: '',
                    createtime: '',
                    lastvisittime: '',
                    name: '',
                    phone: ''
                },
                account: {
                    createtime: '',
                    id: 0,
                    money: 0,
                    subMoney: 0,
                    totalConsume: 0.00,
                    userid: 52
                },
                data: [],
                chargeData: [],
                isShow: false,
                isRechargeShow: false,
                isLoading: false,
                orderItem: {
                    userid: this.userId,
                    type: '1',
                    payfrom: '0',
                    money: 25,
                    remark: ''
                },
                rechargeForm: {
                    accountId: 0,
                    type: '1',
                    money: 500,
                    subMoney: 0,
                    remark: ''
                },
                columns: [
                    {
                        key: 'orderno',
                        title: '订单编号'
                    },
                    {
                        key: 'type',
                        title: '类型',
                        render: function (h, params) {
                            let text = '';
                            if (this.row.type == 1) {
                                text = '洗车';
                            } else if (this.row.type == 2) {
                                text = '维修';
                            } else {
                                text = '其它';
                            }

                            return h('div', text);
                            /* 这里的this.row能够获取当前行的数据 */
                        }

                    },
                    {
                        key: 'money',
                        title: '消费金额'
                    },
                    {
                        key: 'payfrom',
                        title: '支付方式',
                        render: function (h, params) {
                            let text = '';
                            if (this.row.payfrom == 0) {
                                text = '账户余额';
                            } else if (this.row.payfrom == 1) {
                                text = '支付宝';
                            } else if (this.row.payfrom == 2) {
                                text = '微信';
                            } else if (this.row.payfrom == 3) {
                                text = '现金';
                            } else {
                                text = '其它';
                            }
                            return h('div', text);
                        }
                    },
                    {
                        key: 'createtime',
                        title: '消费时间'
                    },
                    {
                        key: 'remark',
                        title: '备注'
                    }
                    // ,
                    // {
                    //     title: '查看详情',
                    //     key: 'show_more',
                    //     align: 'center',
                    //     render: (h, params) => {
                    //         return h('Button', {
                    //             props: {
                    //                 type: 'primary',
                    //                 size: 'small'
                    //             },
                    //             on: {
                    //                 click: () => {
                    //                     let query = {user_id: params.row.id};
                    //                     this.$router.push({
                    //                         name: 'member_details',
                    //                         query: query
                    //                     });
                    //                 }
                    //             }
                    //         }, '详情');
                    //     }
                    // }

                ],
                chargeColumns: [
                    {
                        type: 'index',
                        align: 'center',
                        width: 60
                    },
                    {
                        key: 'money',
                        title: '充值金额',
                        render: function (h, params) {
                            let price = '￥' + parseFloat(params.row.money).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'subMoney',
                        title: '赠送金额',
                        render: function (h, params) {
                            let price = '￥' + parseFloat(params.row.subMoney).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'type',
                        title: '支付方式',
                        render: function (h, params) {
                            let text = '';
                            if (this.row.type == 1) {
                                text = '支付宝';
                            } else if (this.row.type == 2) {
                                text = '微信';
                            } else if (this.row.type == 3) {
                                text = '现金';
                            } else {
                                text = '其它';
                            }
                            return h('div', text);
                        }
                    },
                    {
                        key: 'createTime',
                        title: '充值时间',
                        width: 100
                    },
                    {
                        key: 'operator',
                        title: '经办人',
                        width: 100
                    },
                    {
                        key: 'remark',
                        title: '备注'
                    }
                ]
            };
        },
        methods: {
            init () {
                let userid = this.$route.query.user_id.toString();
                this.userId = userid;
                let data = {
                    userId: userid
                };
                this.Http.post(config.service.getMemberInfo, data).then((res) => {
                    if (res.data.code == 100) {
                        this.member = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });

                // 获取账户信息
                this.Http.post(config.service.getMyAccount, data).then((res) => {
                    if (res.data.code == 100) {
                        this.account = res.data.data;
                        this.getRechargeList();
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });

                // 获取历史消费订单信息
                this.Http.post(config.service.getMyOrders, data).then((res) => {
                    if (res.data.code == 100) {
                        this.data = res.data.data;
                    } else {
                        this.$Message.error({
                            content: '获取历史订单失败',
                            duration: 2
                        });
                    }
                });
            },
            onOK () {
                this.isLoading = true;
                this.orderItem.userid = this.userId;
                let user = Cookies.get('user');
                this.orderItem.operator = user;
                this.Http.post(config.service.addOrder, this.orderItem).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        });
                        this.getMyAccount();
                        this.isLoading = false;
                        this.isShow = false;
                        // 添加数据
                        this.data.unshift(res.data.data);
                    } else {
                        this.isLoading = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            onRecharge () {
                this.rechargeForm.accountId = this.account.id;
                this.rechargeForm.operation = 1;
                let user = Cookies.get('user');
                this.rechargeForm.operator = user;
                this.Http.post(config.service.toRecharge, this.rechargeForm).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: '充值成功!',
                            duration: 2
                        });
                        this.getMyAccount();
                        this.isLoading = false;
                        this.isRechargeShow = false;
                        // 添加数据
                        this.chargeData.unshift(res.data.data);
                    } else {
                        this.isLoading = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            onCancel () {
                this.$Message.info('取消操作!');
                this.isShow = false;
                this.isLoading = false;
                this.isRechargeShow = false;
            },
            getRechargeList () {
                let data = {
                    accountId: this.account.id
                };
                this.Http.post(config.service.getRechargeList, data).then((res) => {
                    if (res.data.code == 100) {
                        this.chargeData = res.data.data;
                    } else {
                        this.isLoading = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            getMyAccount () {
                let data = {
                    userId: this.userId
                };
                // 获取账户信息
                this.Http.post(config.service.getMyAccount, data).then((res) => {
                    if (res.data.code == 100) {
                        this.account = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            }
        },
        mounted () {
            this.init();
        },
        watch: {
            '$route' () {
                this.init();
            }
        }
    };
</script>

