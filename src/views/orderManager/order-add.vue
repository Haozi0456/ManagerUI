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
                                <Option v-for="(option, index) in options" :value="option" :key="index"> {{option.phone}}</Option>
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
                                            <b class="member-card-user-infor-name" style="text-align: center">{{member.name}}</b>
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
                                    <div v-if="member.phone!=''">
                                        <p style="text-align: left;">手机号码:</p>
                                        <b class="member-card-user-infor-name">{{member.phone}}</b>
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
                                    <div v-if="member.carmake!=''">
                                        <p style="text-align: left">车辆品牌:</p>
                                        <b class="member-card-user-infor-name">{{member.carmake}}</b>
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
                                        <b class="member-card-user-infor-name">{{member.createtime}}</b>
                                    </div>
                                </Row>
                            </Col>
                        </Col>
                        <Col :md="12" :lg="6" :xs="12">
                            <Col span="24" :md="12" :lg="12" :xs="12">
                                <Row class-name="made-child-con-middle" type="flex" align="middle"
                                     :style="{marginBottom: '5px'}">
                                    <div v-if="member.carnum!=''">
                                        <p style="text-align: left;">车牌号码:</p>
                                        <b class="member-card-user-infor-name"
                                           style="text-align: left">{{member.carnum}}</b>
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
                    <div style="margin-top: 10px">
                        <Tabs type="card">
                            <TabPane label="服务项目">
                                <Row>
                                    <Input v-model="searchName" @on-change="handleSearch" icon="search"
                                           placeholder="请输入服务项目搜搜..." style="width: 200px; margin-bottom: 10px"/>
                                </Row>
                                <Row>
                                    <div class="table_box">
                                        <Table border stripe :columns="serverColumns" :data="serverData"
                                               height="280"
                                               @on-row-dblclick="addConsumeItem"></Table>
                                    </div>
                                </Row>
                            </TabPane>
                            <TabPane label="商品列表">
                                <Row>
                                    <Input v-model="searchName" @on-change="handleSearch" icon="search"
                                           placeholder="请输入商品名称搜搜..." style="width: 200px; margin-bottom: 8px"/>
                                </Row>
                                <Row>
                                    <div class="table_box">
                                        <Table border stripe :columns="goodsColumns" :data="goodsData"
                                               height="280"
                                               @on-row-dblclick="addGoodsConsumeItem"></Table>
                                    </div>
                                </Row>
                            </TabPane>
                            <TabPane label="标签三">标签三的内容</TabPane>
                        </Tabs>

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
                        <can-edit-table refs="table1"
                                        @on-delete="handleDel"
                                        v-model="consumeData"
                                        @on-cell-change="handleCellChange"
                                        :editIncell="true"
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

                                <Button type="primary"  :disabled="isEnablePreview" @click="toPreview">打印预览</Button>

                                <Button type="primary" :disabled="isEnablePreview" style="margin-left: 10px" @click="onOK(0)">挂单带结</Button>

                                <Button type="primary" :disabled="isEnablePreview" style="margin-left: 10px"  @click="toShowPayModal">结账</Button>
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
                <Button type="primary" :loading="isLoading" @click="onOK(1)">确认收款</Button>
            </div>
        </Modal>

        <Modal :width="900" title="打印预览" v-model="isPreview">
            <Row>
                <Col :md="24" :lg="24" align="middle" :style="{marginTop: '8px'}">
                    <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;">
                        <span style="margin-right: 10px; font-size:x-large; font-weight: bolder;"> 消费清单</span>
                    </div>
                </Col>
                <Col :md="24" :lg="24" align="middle">
                    <div style="display: inline-flex; float: right; text-align:right; vertical-align: bottom ">
                                    <span style="margin-right: 10px; font-weight: 400; font-size: small; vertical-align: bottom;">结算日期:
                                        <span class="pre-date">{{createDate}}</span>
                                    </span>
                    </div>
                </Col>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <can-edit-table refs="table5" v-model="consumeData"
                                :columns-list="previewColumns"></can-edit-table>
            </Row>
            <Row>
                <Col :md="24" :lg="24" align="right" :style="{marginTop: '8px'}">
                    <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;">
                                    <span class="pre-lable">总计:
                                        <span class="pre-total-value">{{totalPrice.toFixed(2)}}</span>元
                                    </span>
                    </div>

                </Col>
            </Row>
            <div slot="footer">
                <Button type="ghost" style="margin-right: 8px" @click="">导出打印</Button>
                <Button type="primary" :loading="isLoading" @click="onCancel">关闭</Button>
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
                createDate:'',
                isPayShow: false,
                isPreview: false,
                loading: false,
                isLoading: false,
                options: [],
                searchName: '',
                serverType: '',
                serverColumns: [
                    {
                        key: 'title',
                        title: '服务名称'
                    },
                    {
                        key: 'result',
                        title: '单价(元)',
                        width: 100,
                        render: function (h, params) {
                            let price = parseFloat(params.row.result).toFixed(2);
                            return h('div', price);
                            /*这里的this.row能够获取当前行的数据*/
                        }
                    }
                ],
                goodsColumns: [
                    {
                        key: 'category',
                        title: '分类'
                    },
                    {
                        key: 'type',
                        title: '名称'
                    },
                    {
                        key: 'outPrice',
                        title: '单价(元)',
                        width: 100,
                        render: function (h, params) {
                            let price = parseFloat(params.row.outPrice).toFixed(2);
                            return h('div', price);
                            /*这里的this.row能够获取当前行的数据*/
                        }
                    },
                    {
                        key: 'stockCount',
                        width: 60,
                        title: '库存'
                    },
                ],
                consumeColumns: [
                    {
                        key: 'title',
                        title: '项目名称'
                    },
                    {
                        key: 'price',
                        title: '单价(元)',
                        render: function (h, params) {
                            let price = parseFloat(params.row.price).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'cover',
                        title: '服务费(元)',
                        editable: true,
                        render: function (h, params) {
                            let price = parseFloat(params.row.cover).toFixed(2);
                            return h('div', price);
                            /*这里的this.row能够获取当前行的数据*/
                        }
                    },
                    {
                        key: 'count',
                        title: '数量',
                        editable: true
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 120,
                        key: 'handle',
                        handle: ['delete']
                    }
                ],
                previewColumns: [
                    {
                        key: 'title',
                        title: '项目名称'
                    },
                    {
                        key: 'price',
                        title: '单价(元)',
                        width:100,
                        render: function (h, params) {
                            let price = parseFloat(params.row.price).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'cover',
                        title: '服务费(元)',
                        width:100,
                        render: function (h, params) {
                            let price = parseFloat(params.row.cover).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'count',
                        title: '数量',
                        width:80,
                        editable: true
                    }
                ],
                consumeData: [],
                serverData: [],
                goodsData: [],
                initServerData: [],
                initGoodsData: [],
                totalPrice: 0.00,
                isEnablePreview: true,
                count: {
                    createUser: 0,
                    visit: 0,
                    collection: 0,
                    transfer: 0
                },
                member: {
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
            }
        },
        methods: {
            init() {
                let data = {
                    type: 'server'
                }
                // 获取服务列表
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

                let goodsData = {
                    pageNumber: 1,
                    pageSize: 100,
                };
                //获取商品列表
                this.Http.post(config.service.getGoodsList, goodsData).then((res) => {
                    if (res.data.code == 100) {
                        this.goodsData = this.initGoodsData = res.data.data.rows;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            addConsumeItem(data) { // 添加服务消费条目
                let itemData = {
                    goodsId: -1,
                    title: data.title,
                    price: data.result,
                    cover: 0,
                    count: 1,
                    type: 0
                };

                this.consumeData.push(itemData);

                if (this.consumeData.length > 0) {
                    this.isEnablePreview = false;
                    var totalConsumeData = 0.00;
                    for (let i = 0; i < this.consumeData.length; i++) {
                        totalConsumeData += parseFloat(this.consumeData[i].price) * parseFloat(this.consumeData[i].count) + parseFloat(this.consumeData[i].cover);
                    }
                    this.totalPrice = totalConsumeData;
                }
            },
            addGoodsConsumeItem(data) { // 添加商品消费条目
                let itemData = {
                    goodsId: data.id,
                    title: data.category + "_" + data.type,
                    price: data.outPrice,
                    cover: data.workPrice,
                    count: 1,
                    type: 1
                };
                this.consumeData.push(itemData);
                if (this.consumeData.length > 0) {
                    this.isEnablePreview = false;
                    var totalConsumeData = 0.00;
                    for (let i = 0; i < this.consumeData.length; i++) {
                        totalConsumeData += parseFloat(this.consumeData[i].price) * parseFloat(this.consumeData[i].count) + parseFloat(this.consumeData[i].cover);
                    }
                    this.totalPrice = totalConsumeData;
                }
            },
            handleDel(val, index) {
                if (this.consumeData.length == 0) {
                    this.isEnablePreview = true;
                    this.totalPrice = 0.00;
                } else {
                    var totalConsumeData = 0.00;
                    for (let i = 0; i < this.consumeData.length; i++) {
                        totalConsumeData += parseFloat(this.consumeData[i].price) * parseFloat(this.consumeData[i].count) + parseFloat(this.consumeData[i].cover);
                    }
                    this.totalPrice = totalConsumeData;
                }
            },
            handleCellChange(val, index, key) { //
                for (let i = 0; i < val.length; i++) {
                    let res = val[i];
                    res.count = parseInt(res.count);
                    if (key == 'count') {
                        if (isNaN(res.count)) {
                            this.consumeData[index].count = 1;
                            this.$Message.error('请输入数字!');
                        }
                    }
                }
                if (this.consumeData.length > 0) {
                    this.isEnablePreview = false;
                    var totalConsumeData = 0.00;
                    for (let i = 0; i < this.consumeData.length; i++) {
                        totalConsumeData += parseFloat(this.consumeData[i].price) * parseFloat(this.consumeData[i].count) + parseFloat(this.consumeData[i].cover);
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
            onOK(status) { //结算
                this.isLoading = true;

                let orderItems = [];
                for (let i = 0; i < this.consumeData.length; i++) {
                    let temp = this.consumeData[i]
                    let itemData = {
                        item: temp.title,
                        goodsId: temp.goodsId,
                        goodsCount: temp.count,
                        cost: (parseFloat(temp.price) * parseFloat(temp.count) + parseFloat(temp.cover)),
                        type: temp.type
                    };
                    orderItems.push(itemData);
                }

                if (this.member != null) {
                    this.orderItem.userid = this.member.id;
                }
                this.orderItem.status = status;
                let user = Cookies.get('user');
                this.orderItem.operator = user;
                this.orderItem.money = this.totalPrice;

                let data = {
                    order: this.orderItem,
                    items: orderItems
                }

                this.Http.postJson(config.service.addOrder, data).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: res.data.msg,
                            duration: 2
                        })
                        this.consumeData = [];
                        this.totalPrice = 0.00;
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
                this.$Message.info('取消!');
                this.isPayShow = false;
                this.isLoading = false;
                this.isPreview = false;
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
                this.member = data;
                if (this.member != null && this.member != '') {
                    let data = {
                        userId: this.member.id
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
                this.member = null;
                this.account = {
                    createtime: "",
                    id: 0,
                    money: 0.00,
                    totalConsume: 0.00,
                    userid: 0
                }
            },
            toPreview(){
                this.createDate = new Date().format('yyyy-MM-dd');
                this.isPreview = true;
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
