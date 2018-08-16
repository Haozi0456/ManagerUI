<style lang="less">
    @import "./styles/config.less";
    @import "../../styles/common.less";


</style>

<template>
    <div>
        <Modal title="添加服务项目"
               v-model="modal"
               :mask-closable="false"
               :closable="false"
               class-name="vertical-center-modal">
            <Form ref="configModel" :model="configModel" :label-width="80">
                <FormItem label="服务名称">
                    <Input v-model="configModel.title" placeholder="请服务项目名称..."></Input>
                </FormItem>
                <FormItem label="服务价格">
                    <InputNumber
                            :max="5000"
                            :min="0"
                            :step="5"
                            v-model="configModel.result"></InputNumber>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                <Button type="primary" :loading="isLoading" @click="onSubmint('configModel')">
                    <span v-if="!isLoading">添加</span>
                    <span v-else>提交中...</span>
                </Button>
            </div>
        </Modal>

        <Row :gutter="8">
            <Col span="24">
                <Card :padding="10">
                    <p slot="title">
                        <Icon type="navicon-round"></Icon>
                        服务列表
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        添加服务
                    </a>
                    <div style="margin-top: 10px">
                        <Row>
                            <div class="table_box">
                                <Table stripe border :columns="serverColumns" :data="serverData" :height="tableHeight"></Table>
                            </div>
                            <div style="padding: 5px; font-weight: 400;">共{{totalItems}}条</div>
                        </Row>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import config from '../../libs/config';
    import canEditTable from '../custom-component/canEditTable.vue';
    import Cookies from 'js-cookie';

    export default {
        name: 'serverConfig',
        components: {
            canEditTable
        },
        data () {
            return {
                tableHeight: 480,
                modal: false,
                isLoading: false,
                serverColumns: [
                    {
                        type: 'index',
                        width: 80,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        key: 'title',
                        title: '服务项目'
                    },
                    {
                        key: 'result',
                        title: '单价(元)',
                        render: function (h, params) {
                            let price = parseFloat(params.row.result).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 160,
                        key: 'handle',
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
                                //         marginRight: '8px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.show(params.index)
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
                    }],
                serverData: [],
                totalItems: 0,
                configModel: {
                    type: 'server',
                    title: '',
                    result: 20
                }
            };
        },
        methods: {
            getData () {
                // this.serverColumns = table.serverColumns;
            },
            init () {
                let data = {
                    type: 'server'
                };
                // 获取服务列表
                this.Http.post(config.service.getConfigsByType, data).then((res) => {
                    if (res.data.code == 100) {
                        this.serverData = res.data.data;
                        this.totalItems = this.serverData.length;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            toDelete (row, index) {
                // 删除
                let data = {
                    id: row.id
                };
                this.Http.post(config.service.deleteConfigById, data).then((res) => {
                    if (res.data.code == 100) {
                        this.serverData.splice(index, 1);
                        this.totalItems = this.serverData.length;
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
            onSubmint () {
                if (this.configModel.title == '') {
                    this.$Message.error('请输入服务名称!');
                    return;
                }

                this.Http.post(config.service.addConfig, this.configModel).then((res) => {
                    if (res.data.code == 100) {
                        this.init();
                        this.modal = false;
                        this.isLoading = false;
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
            onCancel () {
                this.modal = false;
                this.isLoading = false;
            }
        },
        created () {
            this.getData();
        },
        mounted () {
            this.init();
        }
    };
</script>
