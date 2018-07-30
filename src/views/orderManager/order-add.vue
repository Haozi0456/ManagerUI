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
                                <Option v-for="(option, index) in options" :value="option" :key="index">
                                    {{option.phone}}
                                </Option>
                            </Select>

                            <Button type="primary" icon="search" style="margin: 0 5px;">查找会员</Button>
                            <Button type="primary" icon="search" style="margin: 0 5px;">消费记录</Button>
                            <Button type="primary" icon="search" style="margin: 0 5px;">会员续费</Button>
                        </Col>
                    </Row>
                    <div class="divide_line"></div>
                    <Row type="flex" class="member-user-infor">
                        <Col :md="12" :lg="6" :xs="12">
                            <Col span="24" align="middle">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <div style="display: flex;">
                                        <div>
                                            <img class="avator-img" src="../../images/ic_member.png"/>
                                        </div>
                                        <div style="text-align: center; vertical-align: center">
                                            <b class="member-card-user-infor-name" style="text-align: center">{{user.name}}</b>
                                            <p>普通会员</p>
                                        </div>
                                    </div>

                                </Row>
                            </Col>
                            <!--<Col span="12" style="padding-left:6px; margin-top: 10px" align="middle">-->
                            <!--&lt;!&ndash;&lt;!&ndash;<Row class-name="made-child-con-middle" type="flex" align="middle">&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;<div>&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;<b class="member-card-user-infor-name" style="text-align: center">{{user.name}}随身带</b>&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;<p >普通会员</p>&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;</div>&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;</Row>&ndash;&gt;&ndash;&gt;-->
                            <!--</Col>-->
                        </Col>
                        <Col :md="12" :lg="6" :xs="12">
                            <Col span="12" align="middle">
                                <Row class-name="made-child-con-middle" type="flex" align="middle"
                                     :style="{marginBottom: '5px'}">
                                    <div v-if="user.phone!=''">
                                        <p style="text-align: left;">手机号码:</p>
                                        <b class="member-card-user-infor-name">{{user.phone}}</b>
                                    </div>
                                    <div v-else>
                                        <p style="text-align: left;">手机号码:</p>
                                        <b class="member-card-user-infor-name">无</b>
                                    </div>
                                </Row>
                                <Row class-name="made-child-con-middle" type="flex" align="middle"
                                     :style="{marginBottom: '5px'}">
                                    <div v-if="account.money!=''">
                                        <p style="text-align: left">账户余额:</p>
                                        <b class="member-card-user-infor-name">{{account.money.toFixed(2)}}</b>
                                    </div>
                                    <div v-else>
                                        <p style="text-align: left;">账户余额:</p>
                                        <b class="member-card-user-infor-name">0.00</b>
                                    </div>
                                </Row>
                            </Col>

                        </Col>
                        <!--</Row>-->
                        <!--<div class="line-gray" :style="{marginBottom: '5px'}"></div>-->
                        <!--<Row>-->
                        <Col :md="12" :lg="6" :xs="12">
                            <Col span="24" :md="12" :lg="12" :xs="12">
                                <Row class-name="made-child-con-middle" type="flex" align="middle"
                                     :style="{marginBottom: '5px'}">
                                    <div v-if="user.carmake!=''">
                                        <p style="text-align: left">车辆品牌:</p>
                                        <b class="member-card-user-infor-name">{{user.carmake}}</b>
                                    </div>
                                    <div v-else>
                                        <p style="text-align: left;">车辆品牌:</p>
                                        <b class="member-card-user-infor-name">无</b>
                                    </div>
                                </Row>
                                <Row class-name="made-child-con-middle" type="flex" align="middle"
                                     :style="{marginBottom: '5px'}">
                                    <div>
                                        <p style="text-align: left;">入会时间:</p>
                                        <b class="member-card-user-infor-name">{{user.createtime}}</b>
                                    </div>
                                </Row>
                            </Col>
                        </Col>
                        <Col :md="12" :lg="6" :xs="12">
                            <Col span="24" :md="12" :lg="12" :xs="12">
                                <Row class-name="made-child-con-middle" type="flex" align="middle"
                                     :style="{marginBottom: '5px'}">
                                    <div v-if="user.carnum!=''">
                                        <p style="text-align: left;">车牌号码:</p>
                                        <b class="member-card-user-infor-name"
                                           style="text-align: left">{{user.carnum}}</b>
                                    </div>
                                    <div v-else>
                                        <p style="text-align: left">车牌号码:</p>
                                        <b class="member-card-user-infor-name">无</b>
                                    </div>
                                </Row>
                                <Row class-name="made-child-con-middle" type="flex" align="middle"
                                     :style="{marginBottom: '5px'}">
                                    <div>
                                        <p style="text-align: left;">总消费金额:</p>
                                        <b class="member-card-user-infor-name">{{account.totalConsume.toFixed(2)}}</b>
                                    </div>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Row :gutter="8">
            <Col span="8">
                <Card :padding="10">
                    <!--<p slot="title" class="card-title-custom">-->
                    <!--<Icon type="map"></Icon>-->
                    <!---->
                    <!--</p>-->
                    <div>
                        <p class="card-title-custom">
                            <Icon type="map"></Icon>
                            <RadioGroup v-model="serverType" type="button" @on-change="onTypeChange">
                                <Radio label="服务项目"></Radio>
                                <Radio label="商品列表"></Radio>
                            </RadioGroup>
                        </p>
                        <div class="divide_line"></div>
                        <Row>
                            <Input v-model="searchName" @on-change="handleSearch" icon="search"
                                   placeholder="请输入名称搜搜..." style="width: 200px; margin-bottom: 8px"/>
                        </Row>
                        <Row>
                            <div class="table_box">
                                <Table border stripe :columns="serverColumns" :data="serverData" height="280"
                                       @on-row-dblclick="addConsumeItem"></Table>
                            </div>
                        </Row>
                    </div>
                </Card>
            </Col>
            <Col span="16">
                <Card :padding="10">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        消费清单
                    </p>
                    <div class="table_box1">
                        <!--<Table border stripe :columns="consumeColumns" :data="consumeData" height="320" ></Table>-->
                        <can-edit-table refs="table1" @on-delete="handleDel" v-model="consumeData"
                                        :columns-list="consumeColumns" max-height="280"></can-edit-table>
                    </div>
                    <Row>
                        <Col :md="24" :lg="24" align="right" :style="{marginTop: '8px'}">
                            <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;">

                                <div style="display: inline-flex; text-align:center; margin-right: 15px; align-items: baseline;">
                                    <span class="pre-lable">总计:
                                        <span class="pre-total-value">￥{{totalPrice.toFixed(2)}}</span>元
                                    </span>
                                </div>

                                <Button type="primary" :disabled="isEnablePreview">打印预览</Button>

                                <Button type="primary" :disabled="isEnablePreview" style="margin-left: 10px">挂单带结
                                </Button>

                                <Button type="primary" :disabled="isEnablePreview" style="margin-left: 10px"
                                        @click="toShowPayModal">结账
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal
                title="支付"
                v-model="isPayShow"
                :mask-closable="false"
                :closable="false"
                class-name="vertical-center-modal">
            <Form ref="orderItem" :model="orderItem" :label-width="80">
                <FormItem label="支付方式">
                    <Select v-model="orderItem.payfrom" value="0" placeholder="请选择...">
                        <div v-if="this.user.id != null">
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
                            :min="0"
                            :step="5"
                            v-model="orderItem.money"></InputNumber>
                    <span style="margin-left: 5px">元</span>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="orderItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入备注信息..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" style="margin-right: 8px" @click="onCancel">取消</Button>
                <Button type="primary" :loading="isLoading" @click="onOK">确认收款</Button>
            </div>
        </Modal>
    </div>


</template>

<script>
    import config from '../../libs/config';
    import canEditTable from './components/canEditTable.vue';
    import Cookies from 'js-cookie';

    export default {
        name: "add-order",
        components: {
            canEditTable
        },
        data() {
            return {
                model: '',
                isPayShow: false,
                loading: false,
                isLoading: false,
                options: [],
                searchName: '',
                serverType:'',
                serverColumns: [
                    {
                        key: 'itemKey',
                        title: '服务项目'
                    },
                    {
                        key: 'itemValue',
                        title: '单价',
                        render: function (h, params) {
                            let price = parseInt(params.row.itemValue).toFixed(2);
                            return h('div', price);
                            /*这里的this.row能够获取当前行的数据*/
                        }
                    }
                ],
                consumeColumns: [
                    {
                        key: 'itemKey',
                        title: '名称'
                    },
                    {
                        key: 'itemValue',
                        title: '单价',
                        render: function (h, params) {
                            let price = parseInt(params.row.itemValue).toFixed(2);
                            return h('div', price);
                            /*这里的this.row能够获取当前行的数据*/
                        }
                    },
                    {
                        key: 'count',
                        title: '数量'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 120,
                        key: 'handle',
                        handle: ['delete']
                    }
                ],
                consumeData: [],
                serverData: [],
                initServerData: [],
                totalPrice: 0.00,
                isEnablePreview: true,
                count: {
                    createUser: 0,
                    visit: 0,
                    collection: 0,
                    transfer: 0
                },
                user: {
                    carnum: "",
                    createtime: "",
                    lastvisittime: "",
                    name: "",
                    phone: ""
                },
                account: {
                    createtime: "",
                    id: 0,
                    money: 0.00,
                    totalConsume: 0.00,
                    userid: 0
                },
                orderItem: {
                    payfrom: 0,
                    money: this.totalPrice,
                    remark: ""
                },
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
            }
        },
        methods: {
            init() {
                let data = {
                    type: 'server'
                }
                // 获取配件类型
                this.Http.post(config.service.getConfigsByType, data).then((res) => {
                    if (res.data.code == 100) {
                        this.serverData = this.initServerData = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            onTypeChange(data){ //类型切换

            },
            addConsumeItem(data) { // 添加消费条目
                let item = data;
                item.count = 1;
                this.consumeData.push(item);
                if (this.consumeData.length > 0) {
                    this.isEnablePreview = false;
                    var totalConsumeData = 0.00;
                    for (let i = 0; i < this.consumeData.length; i++) {
                        totalConsumeData += parseInt(this.consumeData[i].itemValue);
                    }
                    this.totalPrice = totalConsumeData;
                }
            },
            handleDel(val, index) {
                this.$Message.success('删除了第' + (index + 1) + '行数据');
                if (this.consumeData.length == 0) {
                    this.isEnablePreview = true;
                    this.totalPrice = 0.00;
                } else {
                    var totalConsumeData = 0.00;
                    for (let i = 0; i < this.consumeData.length; i++) {
                        totalConsumeData += parseInt(this.consumeData[i].itemValue);
                    }
                    this.totalPrice = totalConsumeData;
                }
            },
            search(data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            handleSearch() {
                this.serverData = this.initServerData;
                this.serverData = this.search(this.serverData, {
                    itemKey: this.searchName,
                });
            },
            toShowPayModal() {
                this.orderItem.money = this.totalPrice;
                this.isPayShow = true;
            },
            onOK() {
                this.isLoading = true;
                if (this.user != null) {
                    this.orderItem.userid = this.user.id;
                }
                let consumeItems = '';
                for (var i = 0; i < this.consumeData.length; i++) {
                    if (i == this.consumeData.length - 1) {
                        consumeItems += this.consumeData[i].itemKey;
                    } else {
                        consumeItems += this.consumeData[i].itemKey + "；";
                    }

                }
                this.orderItem.items = consumeItems;
                this.orderItem.status = 1;
                let user = Cookies.get('user');
                this.orderItem.operator = user;
                this.Http.post(config.service.addOrder, this.orderItem).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        })
                        this.isLoading = false;
                        this.isPayShow = false;
                    } else {
                        this.isLoading = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });

                    }
                });
            },
            onCancel() {
                this.$Message.info('取消添加!');
                this.isPayShow = false;
                this.isLoading = false;
            },
            remoteMethod(query) {
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
            chooseUser(data) {
                this.user = data;
                if (this.user != null && this.user != '') {
                    let data = {
                        userId: this.user.id
                    };
                    //获取账户信息
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
                        createtime: "",
                        id: 0,
                        money: 0.00,
                        totalConsume: 0.00,
                        userid: 0
                    }
                }
            },
            onClear() {
                this.user = null;
                this.account = {
                    createtime: "",
                    id: 0,
                    money: 0.00,
                    totalConsume: 0.00,
                    userid: 0
                }
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
