<style lang="less">
    @import "./components/styles/order.less";
    @import "../../styles/common.less";


</style>
<template>
    <div>
        <Row :gutter="10" class="margin-top-8">
            <Col :md="24" :lg="24" :style="{marginBottom: '8px'}">
                <Card :padding="10">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        会员查找
                    </p>
                    <Row>
                        <Col span="24" align="left">
                            <Select
                                    v-model="model"
                                    filterable
                                    clearable
                                    remote
                                    :remote-method="remoteMethod"
                                    placeholder="请输入手机号码,如1341..."
                                    style="width: 200px;"
                                    @on-change="chooseUser"
                                    @on-clear="onClear"
                                    :loading="loading">
                                <Option v-for="(option, index) in options" :value="option" :key="index">{{option.phone}}</Option>
                            </Select>

                            <Button type="primary" icon="search" style="margin: 0 5px;">查找会员</Button>
                            <Button type="primary" icon="search" style="margin: 0 5px;">消费记录</Button>
                            <Button type="primary" icon="search" style="margin: 0 5px;">会员续费</Button>
                        </Col>
                    </Row>
                    <div class="divide_line"></div>
                    <Row type="flex" align="middle" justify="start">
                        <Col :md="4" :lg="3"  :xs="4">
                            <Col span="24" align="middle">
                                <div style="align-items: center">
                                    <img class="avator-img" src="../../images/ic_member.png"/>
                                </div>
                            </Col>
                        </Col>
                        <Col :md="20" :lg="21" :xs="20" >
                            <Row type="flex" align="middle" gutter="8">
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
                                    <!--<info-item-->
                                            <!--title="车辆品牌:"-->
                                            <!--container-width="160px"-->
                                            <!--:text-lable="member.carmake"-->
                                            <!--text-color="#2d8cf0"></info-item>-->
                                    <info-item
                                            title="入会时间:"
                                            container-width="160px"
                                            :text-lable="member.createtime"
                                            text-color="#2d8cf0"></info-item>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row type="flex" align="middle" gutter="8">
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
                                    <!--<info-item-->
                                            <!--title="入会时间:"-->
                                            <!--container-width="160px"-->
                                            <!--:text-lable="member.createtime"-->
                                            <!--text-color="#2d8cf0"></info-item>-->

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Row :gutter="8">
            <Col span="24">
                <Card :padding="10">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        快速结算
                    </p>
                    <Row align="middle">
                        <Col span="24" :md="24" :lg="12" :xs="24">
                            <Form ref="orderItem" :model="orderItem" :label-width="80">
                                <FormItem label="消费内容">
                                    <Input v-model="orderItem.consumContent" placeholder="请输入消费描述..."></Input>
                                </FormItem>
                                <FormItem label="支付方式">
                                    <Select v-model="orderItem.payfrom" placeholder="请选择...">
                                        <div v-if="this.member.id != null">
                                            <Option value="0">账户余额</Option>
                                        </div>
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
                                    <span style="margin-left: 5px">元</span>
                                </FormItem>
                                <FormItem label="备注">
                                    <Input v-model="orderItem.remark" type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           placeholder="请输入备注信息..."></Input>
                                </FormItem>
                            </Form>
                            <div align="right">
                                <Button type="ghost" style="margin-right: 8px" @click="onCancel">取消</Button>
                                <Button type="primary" :loading="isLoading" @click="onOK">结账</Button>
                            </div>

                        </Col>
                    </Row>

                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
    import config from '../../libs/config';
    import canEditTable from './components/canEditTable.vue';
    import infoItem from '../custom-component/infoItem.vue';
    import Cookies from 'js-cookie';

    export default {
        name: 'add-order-custom',
        components: {
            canEditTable,
            infoItem
        },
        data () {
            return {
                model: '',
                isPayShow: false,
                loading: false,
                isLoading: false,
                options: [],
                searchName: '',
                isEnablePreview: true,
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
                    money: 0.00,
                    totalConsume: 0.00,
                    userid: 0
                },
                orderItem: {
                    consumContent: '',
                    payfrom: '1',
                    money: 100.00,
                    remark: ''
                },
                items: ''
            };
        },
        methods: {
            init () {

            },
            onOK () {
                if (this.orderItem.consumContent === '') {
                    this.$Message.info({
                        content: '请输入消费内容!',
                        duration: 2
                    });
                    return;
                }

                this.isLoading = true;

                let orderItems = [];
                let itemData = {
                    item: this.orderItem.consumContent,
                    goodsId: -1,
                    goodsCount: 1,
                    cost: this.orderItem.money,
                    type: 0
                };
                orderItems.push(itemData);

                if (this.member != null) {
                    this.orderItem.userid = this.member.id;
                }
                this.orderItem.status = 1;
                let user = Cookies.get('user');
                this.orderItem.operator = user;

                let data = {
                    order: this.orderItem,
                    items: orderItems
                };

                this.Http.postJson(config.service.addOrder, data).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: res.data.msg,
                            duration: 2
                        });
                        this.orderItem = {
                            consumContent: '',
                            payfrom: 1,
                            money: 100.00,
                            remark: ''
                        };
                        this.isLoading = false;
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
                this.$Message.info('取消添加!');
                this.isPayShow = false;
                this.isLoading = false;
            },
            remoteMethod (query) {
                if (query !== '' && query.length > 3) {
                    this.loading = true;
                    let data = {
                        phone: query
                    };
                    this.Http.post(config.service.getUsersLikePhone, data).then((res) => {
                        if (res.data.code == 100) {
                            this.loading = false;
                            this.options = res.data.data;
                        } else {
                            this.loading = false;
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            });
                        }
                    });
                } else {
                    this.options = [];
                }
            },
            chooseUser (data) {
                this.member = data;
                if (this.member != null && this.member != '') {
                    let data = {
                        userId: this.member.id
                    };

                    this.orderItem.payfrom = '0';

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
                } else {
                    this.account = {
                        createtime: '',
                        id: 0,
                        money: 0.00,
                        totalConsume: 0.00,
                        userid: 0
                    };
                    this.orderItem.payfrom = '1';
                }
            },
            onClear () {
                this.member = null;
                this.account = {
                    createtime: '',
                    id: 0,
                    money: 0.00,
                    totalConsume: 0.00,
                    userid: 0
                };
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
