<style lang="less">
    @import '../../styles/common.less';
    @import './components/styles/order.less';
    @import './components/styles/table.less';

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
                        维修工单
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        添加项目
                    </a>
                    <Modal
                            title="添加维修项目"
                            v-model="modal"
                            :mask-closable="false"
                            :closable="false"
                            class-name="vertical-center-modal">
                        <Form ref="formItem" :model="formItem" :label-width="80">
                            <FormItem label="项目名称">
                                <Input v-model="formItem.name" placeholder="请输入配件类型名称..." icon="ios-arrow-down"
                                       @on-click="isRepairModelShow = true"></Input>

                            </FormItem>
                            <FormItem label="配件类型">
                                <Select v-model="formItem.partsId" label-in-value filterable placeholder="请选择或检索类型..."
                                        @on-change="typeChange">
                                    <Option v-for="item in partsList" :value="item.id" :key="item.id">{{ item.partsName}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="配件型号">
                                <Input v-model="formItem.type" placeholder="请在配件类型里选择" readonly></Input>
                            </FormItem>
                            <FormItem label="数量">
                                <InputNumber
                                        :max="maxPartsCount"
                                        :min="1"
                                        :step="1"
                                        v-model="formItem.count"></InputNumber>
                            </FormItem>
                        </Form>
                        <div slot="footer">
                            <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                            <Button type="primary" :loading="isLoading" @click="onOK">添加</Button>
                        </div>
                    </Modal>

                    <Modal title="维修项目选择"
                           v-model="isRepairModelShow"
                           :mask-closable="false"
                           :closable="false"
                           class-name="vertical-center-modal">
                        <RadioGroup v-model="repairName" vertical>
                            <Radio label="保养"></Radio>
                            <Radio label="更换空气格"></Radio>
                            <Radio label="更换空调格"></Radio>
                            <Radio label="清洗节气门,喷油嘴"></Radio>
                            <Radio label="更换刹车油"></Radio>
                            <Radio label="更换刹车片"></Radio>
                            <Radio label="更换助力转向油"></Radio>
                            <Radio label="更换轮胎"></Radio>
                            <Radio label="更换火花塞"></Radio>
                            <Radio label="更换电瓶"></Radio>
                            <Radio label="更换雨刮片"></Radio>
                            <Radio label="更换变速箱油"></Radio>
                        </RadioGroup>
                        <div slot="footer">
                            <Button type="ghost" style="margin-left: 8px" @click="isRepairModelShow = false">取消</Button>
                            <Button type="primary" @click="onRepairItemChoose">确定</Button>
                        </div>
                    </Modal>

                    <Modal :title="choosePartsTypeLabel"
                           v-model="isPartsItemModelShow"
                           :mask-closable="false"
                           :closable="false"
                           width="800"
                           class-name="vertical-center-modal">
                        <Row class="margin-top-10 searchable-table-con1">
                            <Col :md="24" :lg="24">
                                <Table border stripe highlight-row :columns="itemColumns" :data="itemData"
                                       @on-current-change="onItemSelected"></Table>
                            </Col>
                            <Col :md="24" :lg="24" align="middle" :style="{marginTop: '8px'}">
                                <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;"><span
                                        style="margin-right: 10px;">共{{ page.total }}条</span>
                                    <Page :total="page.total" show-sizer :page-size="page.pageSize"
                                          :current="page.pageNumber" @on-change="onPageChange"
                                          @on-page-size-change="onPageSizeChange"></Page>
                                </div>

                            </Col>
                        </Row>
                        <div slot="footer">
                            <Button type="ghost" style="margin-left: 8px" @click="onPartItemCancel">取消</Button>
                            <Button type="primary" @click="onPartsItemChoose">添加</Button>
                        </div>
                    </Modal>

                    <Modal :width="900" title="打印预览" v-model="showCurrentTableData">
                        <Row>
                            <Col :md="24" :lg="24" align="middle" :style="{marginTop: '8px'}">
                                <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;">
                                    <span style="margin-right: 10px; font-size:x-large; font-weight: bolder;">费用结算单</span>
                                </div>
                            </Col>
                            <Col :md="24" :lg="24" align="middle" >
                                <div style="display: inline-flex; float: right; text-align:right; vertical-align: bottom ">
                                    <span style="margin-right: 10px; font-weight: 400; font-size: small; vertical-align: bottom;">结算日期:
                                        <span class="pre-date">{{createDate}}</span>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row class="margin-top-10 searchable-table-con1">
                            <can-edit-table refs="table5" v-model="data"
                                            :columns-list="showCurrentColumns"></can-edit-table>
                        </Row>
                        <Row>
                            <Col :md="24" :lg="24" align="right" :style="{marginTop: '8px'}">
                                <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;">
                                    <span class="pre-lable">总计:
                                        <span class="pre-total-value">{{totalPrice}}</span>元
                                    </span>
                                </div>

                            </Col>
                        </Row>

                    </Modal>

                    <Row class="margin-top-10">
                        <Col :md="24" :lg="24" align="middle" :style="{marginTop: '8px'}">
                            <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;">
                                <span style="margin-right: 10px; font-size:x-large; font-weight: bolder;">费用结算单</span>
                            </div>

                        </Col>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <can-edit-table refs="table1" @on-delete="handleDel" v-model="data" :columns-list="columns"></can-edit-table>
                    </Row>
                    <Row>
                        <Col :md="24" :lg="24" align="right" :style="{marginTop: '8px'}">
                            <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;">
                                <Button type="primary" @click="getCurrentData" :disabled="isEnablePreview">打印预览</Button>

                                <Button type="primary" :disabled="isEnablePreview" style="margin-left: 10px">打印</Button>

                                <Button type="primary" :disabled="isEnablePreview" @click="addRecord" style="margin-left: 10px">提交</Button>
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
    import tableData from './components/data/table_data.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'workOrder',
        components: {
            canEditTable
        },
        data() {
            return {
                searchName: '',
                columns: [],
                itemColumns: [],
                itemData: [],
                showCurrentColumns: [],
                data: [],
                dateItem: {
                    itemName: '',
                    itemType: '',
                    itemId: 0,
                    itemCount: 1,
                    itemPrice: 0.00,
                    itemWorkPrice: 0.00,
                    itemTotalPrice: 0.00
                },
                partsList: [],
                maxPartsCount:9,
                modal: false,
                isRepairModelShow: false,
                isPartsItemModelShow: false,
                showCurrentTableData: false,
                isEnablePreview: true,
                choosePartsTypeId: '',
                choosePartsTypeLabel: '',
                repairName: '',
                isLoading: false,
                partsItem: null,
                totalPrice: 0.00,
                createDate:'',
                formItem: {
                    name: '',
                    partsId: '',
                    count: 1,
                    type: ''
                },
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    total: 10
                }
            };
        },
        methods: {
            getData() {
                this.columns = tableData.table1Columns;
                this.itemColumns = tableData.table2Columns;
                this.showCurrentColumns = tableData.showCurrentColumns;
                this.createDate = new Date().format('yyyy-MM-dd')
            },
            init() {

                // 获取配件类型
                this.Http.post(config.service.getStoreParts, '').then((res) => {
                    if (res.data.code == 100) {
                        this.partsList = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });

            },
            onOK() {
                this.isLoading = true;
                if (this.formItem.name == "") {
                    this.$Message.error("请输入项目名称");
                    this.isLoading = false;
                    return;
                }

                if (this.partsItem == null) {
                    this.$Message.error("请选择配件类型");
                    this.isLoading = false;
                    return;
                }


                let dateItem = {
                    itemName: this.formItem.name,
                    itemType: this.partsItem.category + "(" + this.partsItem.type + ")",
                    itemId: this.partsItem.id,
                    itemCount: this.formItem.count,
                    itemPrice: this.partsItem.outPrice.toFixed(2),
                    itemWorkPrice: this.partsItem.workPrice.toFixed(2),
                    itemTotalPrice: (this.formItem.count * this.partsItem.outPrice + this.partsItem.workPrice).toFixed(2)
                }

                this.data.push(dateItem);
                this.isLoading = false;
                this.modal = false;

                if (this.data.length > 0) {
                    this.isEnablePreview = false;
                }

                this.formItem.name = '';
                this.formItem.count = 1;
                this.formItem.partsId = '';
                this.formItem.type = '';
                this.partsItem = null;

                // if (this.formItem.partsName == "") {
                //     this.$Message.info('请输入配件类型');
                //     this.isLoading = false;
                //     return;
                // }
                //

            },
            addRecord(){
                if(this.data.length == 0){
                    this.$Message.info('请添加维修项目');
                    return;
                }
                let userName = Cookies.get("user");
                let parameters = {
                    items:this.data,
                    operator:userName
                }
                this.Http.postJson(config.service.addRepairRecord,parameters).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: '添加成功!',
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
            onCancel() {
                this.$Message.info('取消添加!');
                this.modal = false;
            },
            handleDel(val, index) {
                this.$Message.success('删除了第' + (index + 1) + '行数据');
                if (this.data.length == 0) {
                    this.isEnablePreview = true;
                }
            },
            getCurrentData() {
                this.showCurrentTableData = true;
                var totalMoney = 0.00;
                for (let i = 0; i < this.data.length; i++) {
                    let item = this.data[i];
                    totalMoney = totalMoney + parseFloat(item.itemTotalPrice);
                }
                this.totalPrice = totalMoney.toFixed(2);
            },
            onPartItemCancel() {
                this.isPartsItemModelShow = false;
                this.formItem.partsId = '';
            },
            onRepairItemChoose() {
                this.formItem.name = this.repairName;
                this.partsItem = null;
                this.isRepairModelShow = false;
            },
            onPartsItemChoose() {
                // this.formItem.name = this.repairName;
                if (this.partsItem != null) {
                    this.formItem.type = this.partsItem.type;
                    this.maxPartsCount = this.partsItem.stockCount;
                    this.isPartsItemModelShow = false;
                } else {
                    this.$Message.info('请选择配件后点击添加');
                }
            },
            onItemSelected(item) {
                this.partsItem = item;
            },
            typeChange(item) {
                this.choosePartsTypeLabel = item.label + " 配件清单";
                this.choosePartsTypeId = item.value;
                if (this.choosePartsTypeId != null && this.choosePartsTypeId != '') {
                    this.page.pageNumber = 1;
                    this.getPartItemsByPartId();
                    this.isPartsItemModelShow = true;
                } else {
                    this.onPageChange(1);
                }
            },
            onPageChange(pageNumber) {
                this.page.pageNumber = pageNumber;
                this.getPartItemsByPartId();
            },
            onPageSizeChange(pageSize) {
                this.page.pageNumber = 1;
                this.page.pageSize = pageSize;
                this.getPartItemsByPartId();
            },
            getPartItemsByPartId() {
                if (this.choosePartsTypeId != '') {
                    var data = {
                        pageNumber: this.page.pageNumber,
                        pageSize: this.page.pageSize,
                        partsId: this.choosePartsTypeId
                    }
                    this.Http.post(config.service.getGoodsListByPartsId, data).then((res) => {
                        if (res.data.code == 100) {
                            this.itemData = res.data.data.rows;
                            this.page.total = res.data.data.total;
                        } else {
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            });
                        }
                    });
                }
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            this.init();
        }
    };
</script>
