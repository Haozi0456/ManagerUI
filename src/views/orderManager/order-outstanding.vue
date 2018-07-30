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
                        <!--<Input v-model="searchcCategory" placeholder="请输入类别搜搜..." style="width: 200px; margin-left: 6px" />-->
                        <!--<Select v-model="formItem.partsId" filterable clearable  @on-change="typeChange" placeholder="请选择或检索类型..." style="width: 200px; margin-left: 6px" >-->
                        <!--<Option v-for="item in partsList" :value="item.id" :key="item.id">{{ item.partsName }}</Option>-->
                        <!--</Select>-->
                        <!--<Input v-model="searchcCategory" placeholder="请输入类别搜搜..." style="width: 200px; margin-left: 10px" />-->
                        <!--<span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>-->
                        <!--<Button @click="handleCancel" type="ghost" >取消</Button>-->
                        <!--<Input v-model="searchConName" @on-change="handleSearch" icon="search"-->
                        <!--placeholder="请输入姓名搜搜..." style="width: 200px"/>-->
                        <!--<Input v-model="searchConTel" @on-change="handleSearch" icon="search"-->
                        <!--placeholder="请输入手机号搜搜..." style="width: 200px"/>-->
                        <!--<Input v-model="searchCarNo" @on-change="handleSearch" icon="search" placeholder="请输入车牌号搜搜..."-->
                        <!--style="width: 200px"/>-->
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">

                        <Col :md="24" :lg="24">
                            <can-edit-table refs="table1" @on-delete="handleDel" v-model="consumeData" :columns-list="consumeColumns" max-height="280"></can-edit-table>
                        </Col>
                        <!--<Col :md="24" :lg="24" align="middle" :style="{marginTop: '8px'}">-->
                            <!--<div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;"><span-->
                                    <!--style="margin-right: 10px;">共{{ page.total }}条</span>-->
                                <!--<Page :total="page.total" show-sizer :page-size="page.pageSize"-->
                                      <!--:current="page.pageNumber" @on-change="onPageChange"-->
                                      <!--@on-page-size-change="onPageSizeChange"></Page>-->
                            <!--</div>-->

                        <!--</Col>-->
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import canEditTable from './components/canEditTable.vue';

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
                consumeColumns:[
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
                consumeData:[]
            }
        },
        methods:{
            handleDel(val, index) {
                this.$Message.success('删除了第' + (index + 1) + '行数据');

            },
        }
    }
</script>
