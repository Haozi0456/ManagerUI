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
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="person-stalker"></Icon>
                        维修工单
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        添加
                    </a>
                    <!--<Modal-->
                            <!--title="添加会员"-->
                            <!--v-model="modal"-->
                            <!--:mask-closable="false"-->
                            <!--:closable="false"-->
                            <!--class-name="vertical-center-modal">-->
                        <!--<Form ref="formItem" :model="formItem" :label-width="80" >-->
                            <!--<FormItem label="类型名称">-->
                                <!--<Input v-model="formItem.partsName" placeholder="请输入配件类型名称..."></Input>-->
                            <!--</FormItem>-->
                        <!--</Form>-->
                        <!--<div slot="footer">-->
                            <!--<Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>-->
                            <!--<Button type="primary" :loading="isLoading" @click="onOK">添加</Button>-->
                        <!--</div>-->
                    <!--</Modal>-->

                    <!--<Row>-->
                        <!--<Input v-model="searchName" @on-change="handleSearch" icon="search"-->
                               <!--placeholder="请输入类型名称搜搜..." style="width: 200px"/>-->
                    <!--</Row>-->
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table stripe :columns="columns" :data="data"  ></Table>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>

    import config from '../../libs/config';
    import utils from '../../libs/util';

    export default {
        name: 'workOrder',
        data() {
            return {
                searchName: '',
                columns: [
                    {
                        key: 'name',
                        title: '名称'
                    },
                    {
                        key: 'type',
                        title: '型号'
                    },
                    {
                        key: 'materialsPrice',
                        title: '耗材费'
                    },
                    {
                        key: 'workPrice',
                        title: '工时费'
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
                                        // let query = {user_id: params.row.id};
                                        // this.$router.push({
                                        //     name: 'member_details',
                                        //     query: query
                                        // });
                                    }
                                }
                            }, '详情');
                        }
                    }

                ],

                data: [],
                initTable: [],
                modal: false,
                isLoading: false,
                formItem: {
                    partsName: ''
                }
            };
        },
        methods: {
            init() {
                    this.data = [];
                // this.Http.post(config.service.getStoreParts, "").then((res) => {
                //     if (res.data.code == 100) {
                //         this.data = this.initTable = res.data.data;
                //     } else {
                //         this.$Message.error({
                //             content: res.data.msg,
                //             duration: 2
                //         });
                //     }
                // });
            },
            onOK() {
                this.isLoading = true;
                if (this.formItem.partsName == "") {
                    this.$Message.info('请输入配件类型');
                    this.isLoading = false;
                    return;
                }

                this.Http.post(config.service.addStoreParts, this.formItem).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        });
                        this.isLoading = false;
                        this.modal = false;
                        //添加数据
                        this.data.unshift(res.data.data)

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
                this.modal = false;
            }
        },
        mounted() {
            this.init();

        }
    };
</script>
