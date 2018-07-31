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
                            return h('ol', {style: {type: 1,listStyle:'blue'}}, itemList.map(function (item) {
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
                                            this.show(params.index)
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
                    pageVo: this.page,
                    status: 0
                };
                this.Http.post(config.service.getOrderList, data).then((res) => {
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
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: "sdfsf"
                })
            }
        },
        mounted() {
            this.init();

        }
    }
</script>
