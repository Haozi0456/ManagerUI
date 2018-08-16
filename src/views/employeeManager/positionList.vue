<style lang="less">
    @import "../../styles/common.less";
    .table_box{
        height: auto !important;
    }

</style>

<template>
    <div>
        <Modal title="添加职位"
               v-model="modal"
               :mask-closable="false"
               :closable="false"
               class-name="vertical-center-modal">
            <Form ref="roleModel" :model="roleModel" :label-width="80">
                <FormItem label="职位名称">
                    <Input v-model="roleModel.roleName" placeholder="请职位名称..."></Input>
                </FormItem>
                <FormItem label="职位描述">
                    <Input v-model="roleModel.roleDes" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入备注信息..."></Input>
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
                        职位列表
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        添加职位
                    </a>
                    <div style="margin-top: 5px">
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
                        width: 60,
                        align: 'center'
                    },
                    {
                        key: 'roleName',
                        align: 'center',
                        title: '职位名称'
                    },
                    {
                        key: 'roleDes',
                        align: 'center',
                        title: '职位描述'
                    },
                    {
                        key: 'dataFlag',
                        align: 'center',
                        title: '状态',
                        width: 100,
                        render: function (h, params) {
                            let text = '';
                            let dataFlag = this.row.dataFlag;
                            if (dataFlag === 1) {
                                text = '启用';
                            } else {
                                text = '禁用';
                            }
                            return h('div', text);
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
                            let dataFlag = params.row.dataFlag;
                            if (dataFlag === 1) {
                                return h('div', [
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '您确定要禁用这条数据吗?',
                                            transfer: true
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.disableOrEnableRole(currentRow, index);
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
                                        }, '禁用')
                                    ])
                                ]);
                            } else if (dataFlag === -1) {
                                return h('div', [
                                    h('Poptip', {
                                        props: {
                                            confirm: true,
                                            title: '您确定要启用这条数据吗?',
                                            transfer: true
                                        },
                                        on: {
                                            'on-ok': () => {
                                                this.disableOrEnableRole(currentRow, index);
                                            }
                                        }
                                    }, [
                                        h('Button', {
                                            style: {
                                                margin: '0 5px'
                                            },
                                            props: {
                                                type: 'primary',
                                                size: 'small',
                                                placement: 'top'
                                            }
                                        }, '启用')
                                    ])
                                ]);
                            }
                        }
                    }],
                serverData: [],
                dataFlags: [{ id: 1, name: '启用'}, { id: 2, name: '弃用'}],
                roleTypes: [{ id: 1, name: '管理员'}, { id: 2, name: '员工'}],
                totalItems: 0,
                roleModel: {
                    roleName: '',
                    roleDes: '',
                    dataFlag: 1
                }
            };
        },
        methods: {
            getData () {
                // this.serverColumns = table.serverColumns;
            },
            init () {
                let data = {
                    status: 0
                };
                // 获取角色列表
                this.Http.post(config.service.getRolesByStatus, data).then((res) => {
                    if (res.data.code === 100) {
                        this.serverData = res.data.data;
                        this.totalItems = this.serverData.length;
                        this.roleModel = {
                            roleName: '',
                            roleDes: '',
                            dataFlag: 1
                        };
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            disableOrEnableRole (rowData, index) {
                if (rowData.dataFlag === 1) {
                    rowData.dataFlag = -1;
                } else if (rowData.dataFlag === -1) {
                    rowData.dataFlag = 1;
                }
                this.Http.post(config.service.disableOrEnableRole, rowData).then((res) => {
                    if (res.data.code == 100) {
                        this.init();
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
                if (this.roleModel.roleName == '') {
                    this.$Message.error('请输入职位名称!');
                    return;
                }

                this.Http.post(config.service.addRole, this.roleModel).then((res) => {
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
