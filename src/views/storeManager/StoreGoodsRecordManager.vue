<style lang="less">
    @import '../../styles/common.less';
    @import './components/styles/store.less';

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
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="navicon-round"></Icon>
                        商品出入库记录
                    </p>
                    <!--<a type="text" slot="extra" @click.prevent="modal = true">-->
                        <!--<Icon type="plus-round"></Icon>-->
                        <!--添加商品-->
                    <!--</a>-->
                    <Row>
                        <Select filterable clearable  @on-change="typeChange" placeholder="请选择出库\入库..." style="width: 150px; " >
                            <Option v-for="item in partsList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <Input v-model="searchKey"  placeholder="请输入订单号搜搜..." clearable = true style="width: 200px; margin-left: 10px" ></Input>
                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                        <!--<Button @click="handleCancel" type="ghost" >取消</Button>-->
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Col :md="24" :lg="24">
                            <Table border stripe :columns="columns" :data="data"></Table>
                        </Col>
                        <Col :md="24" :lg="24" align="middle" :style="{marginTop: '8px'}">
                            <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;"><span
                                    style="margin-right: 10px;">共{{ page.total }}条</span>
                                <Page :total="page.total" show-sizer :page-size="page.pageSize" :current="page.pageNumber" @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></Page>
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

    export default {
        name: 'store_goods_record',
        data () {
            return {
                searchConName: '',
                searchConTel: '',
                searchCarNo: '',
                columns: [
                    {
                        key: 'id',
                        width: 60,
                        sortType: 'asc',
                        align: 'center'
                    },
                    {
                        key: 'orderNo',
                        title: '订单号'
                    },
                    {
                        key: 'goodsName',
                        title: '商品名称'
                    },
                    {
                        key: 'type',
                        title: '类型',
                        width:100,
                        align: 'center',
                        render: function (h, params) {
                            let text = '';
                            let type = params.row.type;
                            let style ={};
                            if(type === 0){
                                text = '入库';
                                style ={backgroundColor:'#19BE6B',color:'#FFFFFF'}
                            }else if(type === 1){
                                text = '出库';
                                style ={backgroundColor:'#2D8CF0',color:'#FFFFFF'}
                            }
                            return h('div',{style:style}, text);
                        }
                    },
                    {
                        key: 'price',
                        title: '进价\\出价',
                        align: 'center',
                        width: 120,
                        render: function (h, params) {
                            let price = parseFloat(params.row.price).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'number',
                        title: '数量',
                        align: 'center',
                        width: 100
                    },
                    {
                        key: 'operator',
                        title: '经办人',
                        align: 'center',
                        width: 120
                    },
                    {
                        key: 'createTime',
                        title: '日期',
                        align: 'center',
                        width: 150
                    },
                    {
                        key: 'remark',
                        title: '备注'
                    }
                ],
                data: [],
                partsList: [{id:0,name:'入库'},{id:1,name:'出库'}],
                isLoading: false,
                chooseType: -1,
                searchKey: '',
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    total: 10
                }
            };
        },
        methods: {
            init () {
                let data = {
                    page:this.page,
                    code:this.chooseType,
                    key:this.searchKey
                };

                this.Http.postJson(config.service.getRecordListByParams, data).then((res) => {
                    if (res.data.code === 100) {
                        this.data = res.data.data.rows;
                        this.page.total = res.data.data.total;
                        this.$Message.success({
                            content: res.data.msg,
                            duration: 2
                        });
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            onPageChange (pageNumber) {
                this.page.pageNumber = pageNumber;
                this.init();
            },
            onPageSizeChange (pageSize) {
                this.page.pageNumber = 1;
                this.page.pageSize = pageSize;
                this.init();
            },
            handleSearch () {
               this.page.pageNumber = 1;
               this.init();
            },
            handleCancel () {
                this.searchKey = '';
                this.page.pageNumber = 1;
                this.init();
            },
            typeChange (partsId) {
                this.chooseType = partsId;
                if(this.chooseType === '' || this.chooseType === undefined){
                    this.chooseType = -1;
                }
                this.init();
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
