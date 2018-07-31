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
                        <Icon type="person-stalker"></Icon>
                        库存列表
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        入库
                    </a>
                    <Modal
                            title="入库"
                            v-model="modal"
                            :mask-closable="false"
                            :closable="false"
                            class-name="vertical-center-modal">
                        <Form ref="formItem" :model="formItem" :label-width="80" >
                            <FormItem label="配件类型">
                                <Select v-model="formItem.partsId" filterable placeholder="请选择或检索类型...">
                                    <Option v-for="item in partsList" :value="item.id" :key="item.id">{{ item.partsName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="配件型号" >
                                <Input v-model="formItem.type" placeholder="请输入配件型号..."></Input>
                            </FormItem>
                            <FormItem label="进货价格">
                                <InputNumber
                                        :max="5000"
                                        :min="0"
                                        :step="5"
                                        v-model="formItem.inPrice"></InputNumber><label style="margin-left: 5px">元</label>
                            </FormItem>
                            <FormItem label="销售价格">
                                <InputNumber
                                        :max="5000"
                                        :min="0"
                                        :step="5"
                                        v-model="formItem.outPrice"></InputNumber><label style="margin-left: 5px">元</label>
                            </FormItem>
                            <FormItem label="入库数量">
                                <InputNumber
                                        :max="5000"
                                        :min="0"
                                        :step="1"
                                        v-model="formItem.stockCount"></InputNumber><label style="margin-left: 5px">个</label>
                            </FormItem>

                            <FormItem label="备注">
                                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注信息..."></Input>
                            </FormItem>
                        </Form>
                        <div slot="footer">
                            <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                            <Button type="primary" :loading="isLoading" @click="onOK">添加</Button>
                        </div>
                    </Modal>

                    <Row>
                        <!--<Input v-model="searchcCategory" placeholder="请输入类别搜搜..." style="width: 200px; margin-left: 6px" />-->
                        <Select filterable clearable  @on-change="typeChange" placeholder="请选择或检索类型..." style="width: 200px; margin-left: 6px" >
                            <Option v-for="item in partsList" :value="item.id" :key="item.id">{{ item.partsName }}</Option>
                        </Select>
                        <Input v-model="searchcCategory" placeholder="请输入类别搜搜..." style="width: 200px; margin-left: 10px" />
                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                        <Button @click="handleCancel" type="ghost" >取消</Button>
                        <!--<Input v-model="searchConName" @on-change="handleSearch" icon="search"-->
                               <!--placeholder="请输入姓名搜搜..." style="width: 200px"/>-->
                        <!--<Input v-model="searchConTel" @on-change="handleSearch" icon="search"-->
                               <!--placeholder="请输入手机号搜搜..." style="width: 200px"/>-->
                        <!--<Input v-model="searchCarNo" @on-change="handleSearch" icon="search" placeholder="请输入车牌号搜搜..."-->
                               <!--style="width: 200px"/>-->
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Col :md="24" :lg="24">
                            <Table stripe :columns="columns" :data="data"></Table>
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
    import utils from '../../libs/util';
    import Cookies from 'js-cookie';

    export default {
        name: 'store_goods',
        data () {
            return {
                searchConName: '',
                searchConTel: '',
                searchCarNo: '',
                columns: [
                    {
                        key: 'id',
                        title: '编号'
                    },
                    {
                        key: 'category',
                        title: '类别'
                    },
                    {
                        key: 'type',
                        title: '名称'
                    },
                    {
                        key: 'inPrice',
                        title: '进货价(元)'
                    },
                    {
                        key: 'outPrice',
                        title: '销售价(元)'
                    },
                    {
                        key: 'workPrice',
                        title: '工时费(元)'
                    },
                    {
                        key: 'stockCount',
                        title: '库存(个)'
                    },
                    {
                        key: 'operator',
                        title: '经办人'
                    },
                    {
                        title: '查看详情',
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let query = {user_id: params.row.id};
                                        this.$router.push({
                                            name: 'member_details',
                                            query: query
                                        });
                                    }
                                }
                            }, '详情');
                        }
                    }

                ],
                data: [],
                initTable: [],
                modal: false,
                partsType: '',
                partsList: [],
                isLoading: false,
                choosePartsTypeId:'',
                searchcCategory: '',
                formItem: {
                    partsId: '',
                    type: '',
                    inPrice: 100,
                    outPrice: 100,
                    workPrice: 100,
                    stockCount: 1,
                    remark: ''
                },
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    total: 10
                }
            };
        },
        methods: {
            init () {
                // 获取配件类型
                this.Http.post(config.service.getStoreParts, '').then((res) => {
                    if (res.data.code == 100) {
                        this.partsList = this.initTable = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });

                let data = {
                    pageNumber:this.page.pageNumber,
                    pageSize:this.page.pageSize,
                };

                this.Http.post(config.service.getGoodsList, data).then((res) => {
                    if (res.data.code == 100) {
                        this.data = this.initTable = res.data.data.rows;
                        this.page.total = res.data.data.total;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            onOK () {
                this.isLoading = true;
                if (this.formItem.partsId == '') {
                    this.$Message.info('请选择配件类型');
                    this.isLoading = false;
                    return;
                }

                if (this.formItem.type == '') {
                    this.$Message.info('请输入配件型号');
                    this.isLoading = false;
                    return;
                }
                let user = Cookies.get('user');
                this.formItem.operator = user;
                this.formItem.sellCount = 0;
                // let data = {
                //     goods:this.formItem
                // };
                this.Http.post(config.service.addStoreGoods, this.formItem).then((res) => {
                    if (res.data.code === 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        });
                        this.isLoading = false;
                        this.modal = false;
                        // 添加数据
                        this.onPageChange(1);
                    } else {
                        this.isLoading = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            onPageChange (pageNumber) {
                this.page.pageNumber = pageNumber;
                if(this.choosePartsTypeId == ''){
                    this.Http.post(config.service.getGoodsList, this.page).then((res) => {
                        if (res.data.code == 100) {
                            this.data = this.initTable = res.data.data.rows;
                            this.page.total = res.data.data.total;
                        } else {
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            });
                        }
                    });
                }else{
                    var data ={
                        pageNumber:this.page.pageNumber,
                        pageSize:this.page.pageSize,
                        partsId:this.choosePartsTypeId
                    }
                    this.Http.post(config.service.getGoodsListByPartsId, data).then((res) => {
                        if (res.data.code == 100) {
                            this.data = this.initTable = res.data.data.rows;
                            this.page.total = res.data.data.total;
                        } else {
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            });
                        }
                    });
                }

            },
            onPageSizeChange (pageSize) {
                this.page.pageNumber = 1;
                this.page.pageSize = pageSize;
                if(this.choosePartsTypeId == ''){
                    this.Http.post(config.service.getGoodsList, this.page).then((res) => {
                        if (res.data.code === 100) {
                            this.data = this.initTable = res.data.data.rows;
                            this.page.total = res.data.data.total;
                        } else {
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            });
                        }
                    });
                }else{
                    var data ={
                        pageNumber:this.page.pageNumber,
                        pageSize:this.page.pageSize,
                        partsId:this.choosePartsTypeId
                    }
                    this.Http.post(config.service.getGoodsListByPartsId, data).then((res) => {
                        if (res.data.code == 100) {
                            this.data = this.initTable = res.data.data.rows;
                            this.page.total = res.data.data.total;
                        } else {
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            });
                        }
                    });
                }

            },
            onCancel () {
                this.$Message.info('取消添加!');
                this.modal = false;
            },
            handleSearch () {
                this.data = this.initTable;
                this.data = this.search(this.data, {name: this.searchConName});
            },
            handleCancel () {
                this.data = this.initTable;
            },
            typeChange(partsId){
                this.choosePartsTypeId = partsId;
                if(partsId != null && partsId != ''){
                    this.page.pageNumber = 1;
                    var data ={
                        pageNumber:this.page.pageNumber,
                        pageSize:this.page.pageSize,
                        partsId:partsId
                    }
                    this.Http.post(config.service.getGoodsListByPartsId, data).then((res) => {
                        if (res.data.code == 100) {
                            this.data = this.initTable = res.data.data.rows;
                            this.page.total = res.data.data.total;
                        } else {
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            });
                        }
                    });
                }else{
                    this.onPageChange(1);
                }
            }


        },
        mounted () {
            this.init();
        }
    };
</script>
