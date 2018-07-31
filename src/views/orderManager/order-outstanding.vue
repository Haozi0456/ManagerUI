<style lang="less">
    @import '../../styles/common.less';
    @import './components/styles/order.less';

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>

<template>
    <div>
        <Row :gutter="10" class="margin-top-8">
            <Col :md="24" :lg="24" :style="{marginBottom: '8px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        挂单记录
                    </p>
                    <a type="text" slot="extra" @click.prevent="isShow = true">
                        <Icon type="plus-round"></Icon>
                        添加订单
                    </a>
                    <Row>
                        <Col span="12">
                            <DatePicker type="month" placeholder="请选择月份查询" @on-change="dateChange"
                                        style="width: 200px"></DatePicker>
                        </Col>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">

                        <Col :md="24" :lg="24">
                            <can-edit-table refs="table1" v-model="data" :columns-list="columns"
                                            max-height="480"></can-edit-table>
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
                <div v-if="orderItem.member != undefined">
                    <FormItem label="会员号" prop="phone">
                        <Input v-model="orderItem.member.phone" readonly></Input>
                    </FormItem>
                </div>
                <div v-else>
                    <FormItem label="会员号">
                        <Input value="散客" readonly></Input>
                    </FormItem>
                </div>
                <FormItem label="支付方式">
                    <Select v-model="orderItem.payfrom"  placeholder="请选择...">
                        <div v-if="orderItem.member != undefined">
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
                            readonly
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
                <Button type="primary" :loading="isLoading" @click="toPay">确认收款</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
    import canEditTable from './components/canEditTable.vue';
    import config from '../../libs/config';

    export default {
        name: "order-outstanding",
        components: {
            canEditTable
        },
        data() {
            return {
                model: '',
                loading: false,
                isLoading:false,
                isPayShow:false,
                options: [],
                searchName: '',
                columns: [
                    {
                        key: 'orderno',
                        title: '编号'
                    },
                    {
                        key: 'member',
                        title: '会员号',
                        render: function (h, params) {
                            let text='';
                            let member = this.row.member;
                            if(member == undefined){
                                text = "散客";
                            }else{
                                text = member.phone;
                            }
                            return h('div', text);
                        }

                    },
                    {
                        key: 'items',
                        title: '服务项目',
                        render: function (h, params) {
                            let itemList = this.row.items;
                            return h('ol', {style: {type: 1,listStyleType:'decimal'}}, itemList.map(function (item) {
                                return h('li', {style: {type: 1}}, item.item)
                            }));
                        }

                    },
                    {
                        key: 'money',
                        title: '金额(元)',
                        render: function (h, params) {
                            let price = parseFloat(params.row.money).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'createtime',
                        title: '消费时间'
                    },
                    {
                        key: 'operator',
                        title: '经办人'
                    },
                    {
                        key: 'remark',
                        title: '备注'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showPay(params)
                                        }
                                    }
                                }, '支付'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '详情'),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '您确定要删除这条数据吗?',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': () => {

                                        }
                                    }
                                }, [
                                    h('Button', {
                                        style: {
                                            margin: '0 5px'
                                        },
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            placement: 'top'
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                data: [],
                orderItem: {
                    payfrom: '0',
                    money: 0.00,
                    remark: ""
                },
                page: {
                    pageNumber: 1,
                    pageSize: 100,
                    total: 0
                }
            }
        },
        methods: {
            init() {
                let data = {
                    page:this.page,
                    code:0
                };
                this.Http.postJson(config.service.getOrderList, data).then((res) => {
                    if (res.data.code == 100) {
                        this.data = res.data.data.rows;
                        this.page.total = res.data.data.total;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            handleDel(val, index) {
                this.$Message.success('删除了第' + (index + 1) + '行数据');

            },

            showPay (params) {
                this.orderItem = params.row;
                if(this.orderItem.member == undefined){
                    this.orderItem.payfrom = '1';
                }else{
                    this.orderItem.payfrom = '0';
                }
                this.isPayShow = true;
            },
            onCancel() {
                this.$Message.info('取消!');
                this.isPayShow = false;
                this.isLoading = false;
            },
            toPay(){
                // 获取服务列表
                this.Http.postJson(config.service.toPayEntryOrders, this.orderItem).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: res.data.msg,
                            duration: 2
                        });
                        this.isPayShow = false;
                        this.isLoading = false;
                        this.init();
                        // this.orderItem = null;

                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            }


        },
        mounted() {
            this.init();

        }
    }
</script>
