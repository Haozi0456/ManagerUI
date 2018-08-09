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
                <Card :padding="8">
                    <p slot="title">
                        <Icon type="person-stalker"></Icon>
                        员工列表
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        添加员工
                    </a>
                    <Modal
                            title="添加员工"
                            v-model="modal"
                            :mask-closable="false"
                            :closable="false"
                            class-name="vertical-center-modal">
                        <Form ref="manager" :model="manager" :label-width="80" >
                            <FormItem label="员工姓名">
                                <Input v-model="manager.name" placeholder="请输入员工姓名..." style="width: 200px;"></Input>
                            </FormItem>
                            <FormItem label="手机号码">
                                <Input v-model="manager.account" placeholder="请输入手机号..." style="width: 200px;"></Input><span style="margin-left: 5px; color:#9ea7b4; ">* 手机号作为登录账号</span>
                            </FormItem>
                            <FormItem label="职位类型">
                                <Select v-model="manager.roleType" filterable placeholder="请选择职位类型..." style="width: 200px;">
                                    <Option v-for="item in roleTypes" :value="item.id" :key="item.id">{{ item.roleName }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="入职时间">
                                <!--<DatePicker :v-model="manager.entryTime" type="datetime" placeholder="请选择入职时间..." style="width: 200px"></DatePicker>-->
                                <DatePicker placeholder="请选择入职时间..." type="datetime" format="yyyy-MM-dd HH:mm:ss"  @on-change="onDataChoose" style="width: 200px"></DatePicker>
                            </FormItem>
                            <FormItem label="岗位状态">
                                <Select v-model="manager.dataFlag" filterable placeholder="请选择岗位状态" style="width: 120px;">
                                    <Option v-for="item in dataFlags" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="薪资">
                                <InputNumber
                                        :min="0"
                                        :step="5"
                                        v-model="manager.salary"></InputNumber><label style="margin-left: 5px">元</label>
                            </FormItem>

                        </Form>
                        <div slot="footer">
                            <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                            <Button type="primary" :loading="isLoading" @click="onOK">添加</Button>
                        </div>
                    </Modal>

                    <Row>
                        <Col :md="24" :lg="24" style="padding: 0px 5px;">
                            <Input v-model="searchName" placeholder="请输姓名搜搜..." style="width: 200px;" />
                            <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                            <Button @click="handleCancel" type="ghost" >取消</Button>
                        </Col>
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
    import utils from '../../libs/util';
    import Cookies from 'js-cookie';

    export default {
        name: 'store_goods',
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
                        key: 'name',
                        title: '姓名'
                    },
                    {
                        key: 'account',
                        title: '账号(手机号)'
                    },
                    {
                        key: 'role',
                        title: '职位',
                        align: 'center'
                    },
                    {
                        key: 'salary',
                        title: '薪资',
                        align: 'center',
                        render: function (h, params) {
                            let price = '￥' + parseFloat(params.row.salary).toFixed(2);
                            return h('div', price);
                        }
                    },
                    {
                        key: 'dataFlag',
                        title: '状态',
                        align: 'center',
                        render: function (h, params) {
                            let text = '';
                            if (params.row.dataFlag == 1) {
                                text = '在职';
                            } else {
                                text = '离职';
                            }
                            return h('div', text);
                        }
                    },
                    {
                        key: 'entryTime',
                        title: '入职时间',
                        width: 120,
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

                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '4px'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '编辑'),
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
                roleTypes: [],
                dataFlags: [{ id: 1, name: '在职'}, { id: -1, name: '离职'}],
                modal: false,
                isLoading: false,
                searchName: '',
                manager: {
                    id: 0,
                    name: '',
                    account: '',
                    roleType: 0,
                    salary: 2000,
                    password: '',
                    createTime: '',
                    entryTime: '',
                    dataFlag: 1,
                    lastVisitTime: ''
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
                // let positionData = {
                //     type: 'role'
                // };
                // // 获取职位列表
                // this.Http.post(config.service.getConfigsByType, positionData).then((res) => {
                //     if (res.data.code == 100) {
                //         this.roleTypes = res.data.data;
                //     } else {
                //         this.$Message.error({
                //             content: res.data.msg,
                //             duration: 2
                //         });
                //     }
                // });

                let roleType = {
                    status: 1
                };
                // 获取角色列表
                this.Http.post(config.service.getRolesByStatus, roleType).then((res) => {
                    if (res.data.code === 100) {
                        this.roleTypes = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });

                let data = {
                    page: this.page,
                    code: 0 // 全部员工
                };
                // 获取员工列表
                this.Http.postJson(config.service.getManagerListByType, data).then((res) => {
                    if (res.data.code == 100) {
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
            toDelete (data, index) {

            },
            onDataChoose (data) {
                if (data == '') {
                    this.manager.entryTime = new Date().format('yyyy-MM-dd HH:mm:ss');
                } else {
                    this.manager.entryTime = data;
                }
            },
            onOK () {
                this.isLoading = true;
                if (this.manager.name == '') {
                    this.$Message.info('请输入员工姓名');
                    this.isLoading = false;
                    return;
                }

                if (this.manager.account == '') {
                    this.$Message.info('请输入手机号码');
                    this.isLoading = false;
                    return;
                }

                if (this.manager.roleType == 0) {
                    this.$Message.info('请输入职位类型');
                    this.isLoading = false;
                    return;
                }

                this.Http.post(config.service.addManager, this.manager).then((res) => {
                    if (res.data.code === 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        });
                        this.isLoading = false;
                        this.modal = false;
                        this.manager = {
                            id: 0,
                            name: '',
                            account: '',
                            roleType: 0,
                            salary: 2000,
                            password: '',
                            createTime: '',
                            entryTime: '',
                            dataFlag: 1,
                            lastVisitTime: ''
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
            },
            handleSearch () {
                this.data = this.initTable;
                this.data = this.search(this.data, {name: this.searchConName});
            },
            handleCancel () {

            },
            typeChange (partsId) {
                this.choosePartsTypeId = partsId;
                if (partsId != null && partsId != '') {
                    this.page.pageNumber = 1;
                    var data = {
                        pageNumber: this.page.pageNumber,
                        pageSize: this.page.pageSize,
                        partsId: partsId
                    };
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
                } else {
                    this.onPageChange(1);
                }
            }

        },
        mounted () {
            this.init();
        }
    };
</script>
