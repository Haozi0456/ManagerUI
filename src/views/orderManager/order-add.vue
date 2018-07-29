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
                        <Col span="24" style="padding-right:10px">
                            <Select
                                    v-model="model"
                                    filterable
                                    remote
                                    clearable
                                    placeholder="请输入会员手机号码..."
                                    style="width: 300px"
                                    :remote-method="remoteMethod"
                                    :loading="loading">
                                <Option v-for="(option, index) in options1" :value="option.value" :key="index">
                                    {{option.label}}
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
                                            <p >普通会员</p>
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
                                <Row class-name="made-child-con-middle" type="flex" align="middle" :style="{marginBottom: '5px'}">
                                    <div v-if="user.phone!=''">
                                        <p style="text-align: left;">手机号码:</p>
                                        <b class="member-card-user-infor-name">{{user.phone}}</b>
                                    </div>
                                    <div v-else>
                                        <p style="text-align: left;">手机号码:</p>
                                        <b class="member-card-user-infor-name">无</b>
                                    </div>
                                </Row>
                                <Row class-name="made-child-con-middle" type="flex" align="middle" :style="{marginBottom: '5px'}">
                                    <div v-if="account.money!=''">
                                        <p style="text-align: left">账户余额:</p>
                                        <b class="member-card-user-infor-name">{{account.money.toFixed(2)}}</b>
                                    </div>
                                    <div v-else>
                                        <p style="text-align: left;">账户余额:</p>
                                        <b class="member-card-user-infor-name" >0.00</b>
                                    </div>
                                </Row>
                            </Col>

                        </Col>
                    <!--</Row>-->
                    <!--<div class="line-gray" :style="{marginBottom: '5px'}"></div>-->
                    <!--<Row>-->
                        <Col :md="12" :lg="6" :xs="12">
                            <Col span="24" :md="12" :lg="12" :xs="12">
                                <Row class-name="made-child-con-middle" type="flex" align="middle" :style="{marginBottom: '5px'}">
                                    <div v-if="user.carmake!=''">
                                        <p style="text-align: left">车辆品牌:</p>
                                        <b class="member-card-user-infor-name">{{user.carmake}}</b>
                                    </div>
                                    <div v-else>
                                        <p style="text-align: left;">车辆品牌:</p>
                                        <b class="member-card-user-infor-name" >无</b>
                                    </div>
                                </Row>
                                <Row class-name="made-child-con-middle" type="flex" align="middle" :style="{marginBottom: '5px'}">
                                    <div>
                                        <p style="text-align: left;">入会时间:</p>
                                        <b class="member-card-user-infor-name">{{user.createtime}}</b>
                                    </div>
                                </Row>
                            </Col>
                        </Col>
                        <Col :md="12" :lg="6" :xs="12">
                            <Col span="24" :md="12" :lg="12" :xs="12">
                                <Row class-name="made-child-con-middle" type="flex" align="middle" :style="{marginBottom: '5px'}">
                                    <div v-if="user.carnum!=''" >
                                        <p style="text-align: left;">车牌号码:</p>
                                        <b class="member-card-user-infor-name" style="text-align: left">{{user.carnum}}</b>
                                    </div>
                                    <div v-else>
                                        <p style="text-align: left">车牌号码:</p>
                                        <b class="member-card-user-infor-name">无</b>
                                    </div>
                                </Row>
                                <Row class-name="made-child-con-middle" type="flex" align="middle" :style="{marginBottom: '5px'}">
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
        <Row gutter="8">
            <Col span="8">
                <Card :padding="10">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        服务项目
                    </p>
                    <div class="table_box">
                        <Table border stripe :columns="serverColumns" :data="serverData" height="320"></Table>
                    </div>
                </Card>
            </Col>
            <Col span="16" >
                <Card :padding="10">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        消费列表
                    </p>
                    <div class="table_box">

                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import config from '../../libs/config';

    export default {
        name: "add-order",
        data() {
            return {
                model: '',
                loading: false,
                options: [],
                serverColumns:[
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
                serverData:[{
                    itemName:'洗车',
                    itemPrice:'32'
                }],
                count: {
                    createUser: 0,
                    visit: 0,
                    collection: 0,
                    transfer: 0
                },
                user: {
                    carmake: "本田",
                    carnum: "鄂A123455",
                    createtime: "2018-08-05",
                    lastvisittime: "",
                    name: "赵浩",
                    phone: "1343456567"
                },
                account: {
                    createtime: "",
                    id: 0,
                    money: 500.00,
                    totalConsume: 0.00,
                    userid: 52
                },
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
            }
        },
        methods: {
            init(){
                let data = {
                    type:'server'
                }
                // 获取配件类型
                this.Http.post(config.service.getConfigsByType, data).then((res) => {
                    if (res.data.code == 100) {
                        this.serverData = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            }
        },
        mounted(){
            this.init();
        }
    }
</script>
