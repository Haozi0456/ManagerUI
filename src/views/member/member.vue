<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

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
                        会员列表
                    </p>
                    <a type="text" slot="extra" @click.prevent="modal = true">
                        <Icon type="plus-round"></Icon>
                        添加会员
                    </a>
                    <Modal
                            title="添加会员"
                            v-model="modal"
                            :mask-closable="false"
                            ok-text="添加"
                            cancel-text="取消"
                            :closable="false"
                            @on-ok="onOK"
                            @on-cancel="onCancel"
                            :loading="true"
                            class-name="vertical-center-modal">
                        <Form :model="memberItem" :label-width="80">
                            <FormItem label="姓名">
                                <Input v-model="memberItem.name" placeholder="请输入姓名..."></Input>
                            </FormItem>
                            <FormItem label="手机号码">
                                <Input v-model="memberItem.phone" placeholder="请输入手机号码..."></Input>
                            </FormItem>
                            <FormItem label="车牌号码">
                                <Input v-model="memberItem.carnum" placeholder="请输入车牌号码..."></Input>
                            </FormItem>
                            <FormItem label="汽车品牌">
                                <Input v-model="memberItem.carmake" placeholder="请输入汽车品牌..."></Input>
                            </FormItem>
                            <FormItem label="账户操作">
                                <Select v-model="accountItem.type" value="1" placeholder="请选择...">
                                    <Option value="1">充值</Option>
                                    <Option value="2">录入</Option>
                                    <Option value="3">提现</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="金额">
                                <InputNumber
                                        :max="5000"
                                        :min="0"
                                        :step="5"
                                        v-model="accountItem.money"></InputNumber>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="accountItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注信息..."></Input>
                            </FormItem>
                        </Form>
                    </Modal>

                    <Row>
                        <Input v-model="searchConName" @on-change="handleSearch" icon="search"
                               placeholder="请输入姓名搜搜..." style="width: 200px"/>
                        <Input v-model="searchConTel" @on-change="handleSearch" icon="search"
                               placeholder="请输入手机号搜搜..." style="width: 200px"/>
                        <Input v-model="searchCarNo" @on-change="handleSearch" icon="search" placeholder="请输入车牌号搜搜..."
                               style="width: 200px"/>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table stripe :columns="columns" :data="data"></Table>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>

    import config from '../../libs/config';

    export default {
        name: 'member',
        data() {
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
                        key: 'name',
                        title: '姓名'
                    },
                    {
                        key: 'phone',
                        title: '电话号码'
                    },
                    {
                        key: 'carnum',
                        title: '车牌号'
                    },
                    {
                        title: '查看详情',
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'text',
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
                memberItem: {
                    name: '',
                    phone: '',
                    carnum: '鄂A',
                    carmake: ''
                },
                accountItem:{
                    money: 100,
                    type: '1',
                    remark: ''
                }
            };
        },
        methods: {
            init() {
                this.Http.post(config.service.getAllMembers, "").then((res) => {
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
                    name: this.searchConName,
                    phone: this.searchConTel,
                    carnum: this.searchCarNo
                });
            },
            onOK() {
                var data= {
                    user:this.memberItem,
                    account:this.accountItem
                }

                this.Http.post(config.service.addMember, data).then((res) => {
                    if (res.data.code == 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        });
                        this.modal = false;
                        //添加数据
                        this.data.push(res.data.data)

                    } else {
                        this.modal = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });

                    }
                });

            },
            onCancel() {
                this.$Message.info('取消添加!');
            }
        },
        mounted() {
            this.init();

        }
    };
</script>


