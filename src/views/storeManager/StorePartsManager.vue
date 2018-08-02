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
                        商品类型列表
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        添加分类
                    </a>
                    <Modal
                            title="添加分类"
                            v-model="modal"
                            :mask-closable="false"
                            :closable="false"
                            class-name="vertical-center-modal">
                        <Form ref="formItem" :model="formItem" :label-width="80" >
                            <FormItem label="类型名称">
                                <Input v-model="formItem.partsName" placeholder="请输入配件类型名称..."></Input>
                            </FormItem>
                        </Form>
                        <div slot="footer">
                            <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                            <Button type="primary" :loading="isLoading" @click="onOK">添加</Button>
                        </div>
                    </Modal>

                    <Row>
                        <Input v-model="searchName" @on-change="handleSearch" icon="search"
                               placeholder="请输入类型名称搜搜..." style="width: 200px"/>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table border stripe :columns="columns" :data="data" height="540"></Table>
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
        name: 'store_parts',
        data() {
            return {
                searchName: '',
                columns: [
                    {
                        type:'index',
                        align:'center',
                        width:60
                    },
                    {
                        key: 'partsName',
                        title: '类别名称'
                    },
                    {
                        key: 'createTime',
                        width:200,
                        title: '创建时间'
                    },
                    {
                        title: '操作',
                        key: 'show_more',
                        width:120,
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
                isLoading: false,
                formItem: {
                    partsName: ''
                }
            };
        },
        methods: {
            init() {
                this.Http.post(config.service.getStoreParts, "").then((res) => {
                    if (res.data.code == 100) {
                        this.data = this.initTable = res.data.data;
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
