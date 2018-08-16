<style lang="less">
    @import '../../styles/common.less';

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
                        收支列表
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        添加收支
                    </a>
                    <Modal
                            title="添加收支"
                            v-model="modal"
                            :mask-closable="false"
                            :closable="false"
                            class-name="vertical-center-modal">
                        <Form ref="inOut" :model="inOut" :label-width="80" >
                            <FormItem label="收支名称">
                                <Input v-model="inOut.des" placeholder="请输入收支名称..." style="width: 200px;"></Input>
                            </FormItem>
                            <FormItem label="类型">
                                <Select v-model="inOut.type" placeholder="请选择收支类型..." style="width: 200px;">
                                    <Option v-for="item in types" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="金额">
                                <InputNumber
                                        :min="0"
                                        :step="5"
                                        v-model="inOut.money"></InputNumber><label style="margin-left: 5px">元</label>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="inOut.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注信息..."></Input>
                            </FormItem>
                        </Form>
                        <div slot="footer">
                            <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                            <Button type="primary" :loading="isLoading" @click="onOK">添加</Button>
                        </div>
                    </Modal>

                    <Row>
                        <Select v-model="inOutType"  placeholder="请选择收支类型..." @on-change="onTypeChoose" style="width: 200px; margin-left: 5px">
                            <Option v-for="item in selectTypes" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <!--<Input v-model="searchName" placeholder="请输姓名搜搜..." style="width: 200px;" />-->
                        <!--<span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>-->
                        <!--<Button @click="handleCancel" type="ghost" >取消</Button>-->
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Col :md="24" :lg="24">
                            <Table border stripe :columns="columns" :data="data"></Table>
                        </Col>
                        <Col :md="24" :lg="24" align="middle" :style="{marginTop: '8px'}">
                            <div style="display: inline-flex; text-align:center; margin:0; align-items: baseline;"><span
                                    style="margin-right: 10px;">共{{ page.total}}条</span>
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
        name: 'inOut-list',
        data () {
            return {
                columns: [
                    {
                        width: 60,
                        type: 'index',
                        sortType: 'asc',
                        align: 'center'
                    },
                    {
                        key: 'des',
                        title: '收支名称'
                    },
                    {
                        key: 'type',
                        title: '收支类型',
                        align: 'center',
                        width: 100,
                        render: function (h, params) {
                            let text = '';
                            if (params.row.type === 1) {
                                text = '收入';
                            } else {
                                text = '支出';
                            }
                            return h('div', text);
                        }
                    },
                    {
                        key: 'money',
                        title: '金额',
                        align: 'center',
                        render: function (h, params) {
                            let price = '￥' + parseFloat(params.row.money).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'createTime',
                        title: '时间',
                        align: 'center'
                    },
                    {
                        key: 'operator',
                        title: '经办人',
                        align: 'center'
                    },
                    {
                        key: 'remark',
                        title: '备注',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'show_more',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            let currentRow = params.row;
                            let index = params.index;
                            return h('div', [

                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         margin: '4px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //
                                //         }
                                //     }
                                // }, '编辑'),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '您确定要删除这条数据吗?',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.toDelete(currentRow, index);
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        style: {
                                            margin: '4px'
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
                inOutType: 0,
                selectTypes: [{id: 0, name: '全部'}, {id: 1, name: '收入'}, {id: 2, name: '支出'}],
                types: [{id: 1, name: '收入'}, {id: 2, name: '支出'}],
                modal: false,
                isLoading: false,
                inOut: {
                    id: 0,
                    type: 0,
                    money: 0.00,
                    des: '',
                    remark: '',
                    operator: ''
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
                let data = {
                    page: this.page,
                    code: this.inOutType // 全部收支
                };
                // 获取收支列表
                this.Http.postJson(config.service.getInOutByType, data).then((res) => {
                    if (res.data.code === 100) {
                        this.data = res.data.data.rows;
                        this.page.total = res.data.data.total;
                        this.isLoading = false;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            toDelete (dataRow, index) {
                let data = {
                    id: dataRow.id
                };
                // 删除收支
                this.Http.post(config.service.deleteInOutById, data).then((res) => {
                    if (res.data.code === 100) {
                        this.$Message.success({
                            content: res.data.msg,
                            duration: 2
                        });
                        this.init();
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
                if (this.inOut.des === '') {
                    this.$Message.info('请输入收支名称');
                    this.isLoading = false;
                    return;
                }

                if (this.inOut.money === 0) {
                    this.$Message.info('请输入金额');
                    this.isLoading = false;
                    return;
                }

                this.Http.post(config.service.addInOut, this.inOut).then((res) => {
                    if (res.data.code === 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        });
                        this.isLoading = false;
                        this.modal = false;
                        this.inOut = {
                            id: 0,
                            type: 1,
                            money: 0.00,
                            des: '',
                            remark: '',
                            operator: ''
                        };
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
                this.init();
            },
            onPageSizeChange (pageSize) {
                this.page.pageNumber = 1;
                this.page.pageSize = pageSize;
                this.init();
            },
            onCancel () {
                this.$Message.info('取消添加!');
                this.modal = false;
                this.isLoading = false;
            },
            onTypeChoose (type) {
                if (type != null && type != '') {
                    this.inOutType = type;
                    this.page.pageNumber = 1;
                    let data = {
                        page: this.page,
                        code: this.inOutType // 全部收支
                    };
                    // 获取收支列表
                    this.Http.postJson(config.service.getInOutByType, data).then((res) => {
                        if (res.data.code === 100) {
                            this.data = res.data.data.rows;
                            this.page.total = res.data.data.total;
                            this.isLoading = false;
                        } else {
                            this.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            });
                        }
                    });
                } else {
                    this.inOutType = 0;
                    this.onPageChange(1);
                }
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
