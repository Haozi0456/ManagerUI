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
                        历史订单记录
                    </p>
                    <a type="text" slot="extra" @click.prevent="isShow = true">
                        <Icon type="plus-round"></Icon>
                        添加订单
                    </a>
                    <Row>
                        <Col span="12">
                            <DatePicker type="month" placeholder="请选择月份查询" @on-change="dateChange" style="width: 200px"></DatePicker>
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
                    <Select v-model="orderItem.payfrom" value="1" placeholder="请选择...">
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


    </div>
</template>

<script>

    import config from '../../libs/config';
    import Cookies from 'js-cookie';

    export default {
        name: 'store_parts',
        data() {
            return {
                searchName: '',
                columns: [
                    {
                        key: 'orderno',
                        title: '编号'
                    },
                    {
                        key: 'items',
                        title: '服务项目'
                        // ,
                        // render: function (h, params) {
                        //     let text =''
                        //     var str = this.row.items+"";
                        //     let itemsArr = str.split(";");
                        //     // for (let i = 0; i < itemsArr.length; i++) {
                        //     //     text += itemsArr[i]+" \n "
                        //     // }
                        //
                        //
                        //     return h('ol',{style:{ type:1}}, itemsArr.map(function (item) {
                        //         return h('li',{style:{ type:1}},item)
                        //     }));
                        //
                        //     // return h('div', text);
                        //     /*这里的this.row能够获取当前行的数据*/
                        // }

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
                                text = "账户余额"
                            } else if (this.row.payfrom == 1) {
                                text = "支付宝"
                            } else if (this.row.payfrom == 2) {
                                text = "微信"
                            } else if (this.row.payfrom == 3) {
                                text = "现金"
                            } else {
                                text = "其它"
                            }
                            return h('div', text)
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
                    }

                ],
                data: [],
                initTable: [],
                modal: false,
                isLoading: false,
                isShow: false,
                isRechargeShow: false,
                chooseMonth:'',
                orderItem: {
                    userid: this.userId,
                    type: '1',
                    payfrom: '1',
                    money: 25,
                    remark: ""
                },
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        methods: {
            init() {
                this.Http.post(config.service.getOrderList, this.page).then((res) => {
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
                this.data = this.initTable;
                this.data = this.search(this.data, {
                    partsName: this.searchName
                });
            },
            onOK() {
                this.isLoading = true;
                let user = Cookies.get('user');
                this.orderItem.operator = user;
                this.Http.post(config.service.addOrder, this.orderItem).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        })
                        this.isLoading = false;
                        this.isShow = false;
                        //添加数据
                        // this.data.unshift(res.data.data)
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
            onCancel() {
                this.$Message.info('取消添加!');
                this.isShow = false;
                this.isLoading = false;
            },
            onPageChange(pageNo){

                if(this.chooseMonth == ''){
                    this.page.pageNumber = pageNo;
                    this.Http.post(config.service.getOrderList, this.page).then((res) => {
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
                    this.page.pageNumber = pageNo;
                    let data = {
                        pageNumber:pageNo,
                        pageSize:this.page.pageSize,
                        month:this.chooseMonth
                    }
                    this.Http.post(config.service.getOrderListByMonth, data).then((res) => {
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
            onPageSizeChange(pageSize){
                if(this.chooseMonth == ''){
                    this.page.pageNumber = 1;
                    this.page.pageSize = pageSize;
                    this.Http.post(config.service.getOrderList, this.page).then((res) => {
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
                    this.page.pageNumber = 1;
                    this.page.pageSize = pageSize;
                    let data = {
                        pageVO:this.page,
                        month:this.chooseMonth
                    }

                    this.Http.post(config.service.getOrderListByMonth, data).then((res) => {
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
            dateChange(dateValue) {
                this.chooseMonth = dateValue;
                if(dateValue != ''){
                    this.page.pageNumber = 1;
                    let data = {
                        pageNumber:this.page.pageNumber,
                        pageSize:this.page.pageSize,
                        month:dateValue
                    }
                    this.Http.post(config.service.getOrderListByMonth, data).then((res) => {
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
        mounted() {
            this.init();

        }
    };
</script>
